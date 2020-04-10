from tkinter import Tk
from tkinter.filedialog import askopenfilename
from tkinter import messagebox
import re
import os
from astroquery.simbad import Simbad
from astropy import units as u
from astropy.coordinates import SkyCoord
import mysql.connector
import logging
from datetime import datetime
import warnings
from termcolor import colored


def insert_blob():
    """
        Inserts opened olist file as a blob into database.
    """
    try:
        cursor = conn.cursor()
        cursor.execute(insert_blob_query, insert_args)
        conn.commit()
        print(colored("Blob successfully inserted into olist table", "green"))
    except mysql.connector.Error as e:
        logger.critical("Blob " + "\"" + file_name + "\"" + "failed to insert." + " Time: " + str(datetime.now()))
        global num_of_errors
        num_of_errors += 1
        print("Error code:", e.errno)
        print("SQLSTATE value:", e.sqlstate)
        print("Error message:", e.msg)
        print("Error:", e)
        s = str(e)
        print("Error:", s)
        raise SystemExit
    finally:
        olist_id = cursor.lastrowid
        cursor.close()
    return olist_id 


def insert_line():
    """
        Inserts a line from the extracted .csv into the database.
    """
    try:
        cursor = conn.cursor()
        cursor.execute(insert_metadata_query, insert_metadata_args)
        conn.commit()
        print(colored("Line of metadata successfully inserted into metadata table", "green"))
    except mysql.connector.Error as e:
        logger.critical("Failed to insert metadata with args: " + str(insert_metadata_args) + " Time: " + str(datetime.now()))
        global num_of_errors
        num_of_errors += 1
        print("Error code:", e.errno)    
        print("SQLSTATE value:", e.sqlstate)
        print("Error message:", e.msg)
        print("Error:", e)
        s = str(e)
        print("Error:", s)

def query_simbad(ra, dec):
    """
        Return a dictionary of Simbad results given a coordinate set.
            Parameters: 
        ra (string): Right Ascension 
        dec (string): Declination 
        Returns:
        dict: Contains key/values with valuable SIMBAD query information
    """
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        simbad_results = {} 
        objects = {}
        customSimbad = Simbad()
        customSimbad.add_votable_fields('otype')
        coord = SkyCoord(ra + dec, unit=(u.hourangle, u.deg))
        result_len = 0
        radius = 0.00028
        while result_len == 0: 
            try:
                results = customSimbad.query_region(coord, radius=radius * u.deg)
                result_len = len(results)
                radius = radius * 2
            except:
                radius = radius * 2
                if radius == 3: 
                    results = None
                    break
                continue
            if radius == 5:
                results = None
                break
        
        for row in results:
            object_id = row['MAIN_ID'].decode('utf-8')
            object_type = row['OTYPE'].decode('utf-8')
            objects[object_id] = object_type

        simbad_results['radius'] = round(radius, 5)
        simbad_results['objects'] = objects
        return simbad_results


if __name__ == "__main__":
    valEror = False
    global num_of_errors
    num_of_errors = 0
    # Opens a dialog box for user to select .olist file to convert 
    Tk().withdraw() 
    # If neede
    file_name = askopenfilename(filetypes=[("Olist Files", "*.olist")]) 
    head, tail = os.path.split(file_name)

    with open(file_name) as file:
        data = file.read()

    # Database Configurations
    # Fill in strings with your local MySQL configurations
    conn = mysql.connector.connect(
        host="localhost",
        db="speckle-test",
        user="speckle",
        passwd="speckle"
    )
    cursor = conn.cursor()

    # Logging configuration
    logger = logging.getLogger('audit')
    handler = logging.FileHandler('olist.log')
    handler.setLevel(logging.CRITICAL)
    logger.addHandler(handler)

    # Queries
    insert_blob_query = "INSERT INTO olist (name, file) VALUES (%s, %s)"
    insert_args = (tail, data)

    # Extraction of .olist file entries into python lists
    new_data = []
    split_by_line = data.split('\n')
    olist_id = insert_blob()
    i = 1
    for line in split_by_line:
        try:
            i += 1
            if len(line.split(" ")) < 4:
                continue
            if line != "":
                if str(line)[0] == "H":
                    comment = False
                    # Split line between actual content and comments
                    if "#" in line:
                        line_split = line.split("#")
                        line = line_split[0]
                        comment = line_split[1]
                    # Replace h_id's "HR 1231" with "HR_1231"
                    if str(line[:2]) == "HR":
                        line = line[:2] + "_" + line[3:]
                    # Strip double spaces and replace with single space
                    line = ' '.join(line.split())
                    # Grab only the first ten entries, separated by spaces in olist files
                    line_split = line.split(" ")
                    first_nine_entries = line_split[:9]

                    # Sometimes, olist entry will have some missing data,
                    # append the list with empty strings so indexing doesn't become inconsistent
                    empty_columns = 9 - len(first_nine_entries)
                    for i in range(empty_columns):
                        first_nine_entries.append("")
                    offset = 0
                    if len(first_nine_entries[1]) > 5:
                        offset = 4
                    # Grab RA and Dec to retrieve SIMBAD ID to insert into column 11
                    ra = first_nine_entries[5-offset]
                    dec = first_nine_entries[6-offset]

                    first_nine_entries = "|".join(first_nine_entries)
                    # Replace spaces in the tenth column/entry with underscores
                    tenth_entry = " ".join(line_split[9-offset:])
                    tenth_entry = tenth_entry.replace(" ", "_")

                    simbad_results = query_simbad(ra, dec)
                    # Join first 9 entries with 10th entry, the simbad objects, and the simbad range creating the essential line
                    line = first_nine_entries + "|" + tenth_entry + "|" + str(simbad_results['objects']) + "|" + str(simbad_results['radius'])
                    # Add line and reformatted comments back into the dataset
                    # if not comment:
                    # Once again, strip any double spaces from joining the other entries
                    line = re.sub("\s\s+", " ", line)
                    line = line + "|" + str(olist_id)
                    new_data.append(line)
        except ValueError as e:
            valEror = True
            num_of_errors += 1
            print("Incorrect data format has been encountered")
            logger.critical("Value Error: " + str(e) + " - File: " + tail + " - Line: " + line + " - Time: " + str(datetime.now()))

    # Write .csv file with python lists
    curr_time = str(datetime.utcnow()).replace(" ", "-")
    with open(curr_time + "." + tail + ".csv", 'w+') as new_file:
        # write header
        header = "h_id|fits_file|time|blue_gain|red_gain|right_asc|dec|epoch|mag|program_id|objects|search_radius|olist_id|instrument"
        new_file.write(header + "\n")
        insert_metadata_query = ("INSERT INTO metadata "
                                "(h_id, fits_file, `time`, blue_gain, red_gain, right_asc, `dec`, epoch, mag, program_id, objects, search_radius, olist_id, instrument) " # Back ticks are needed for time and dec due to reserved keywords
                                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)")
        for line in new_data:
            offset = 0
            new_file.write(line + "\n")
            print(colored("Row successfully written to new csv file...", "green"))
            args_list = line.split('|')
            if args_list[3] == "?":
                args_list[3] = None
            if args_list[4] == "?":
                args_list[4] = None
            if len(str(args_list[1])) > 5:
                insert_metadata_args = (args_list[0], None, None, None, None, args_list[1], args_list[2], args_list[3], args_list[4], args_list[5], args_list[10], args_list[11], args_list[12], "alopeke?")
            else:
                insert_metadata_args = (args_list[0], args_list[1], args_list[2], args_list[3], args_list[4], args_list[5], args_list[6], args_list[7], args_list[8], args_list[9], args_list[10], args_list[11], args_list[12], "alopeke?")
            insert_line()
        print("Done writing file.")
        print("File written as: " + curr_time + "." + tail + ".csv")

    if valEror:
        Tk().deiconify()
        messagebox.showwarning("Warning", "A value occured, please check olist.log and manually audit the data")
        print(colored("THERE WAS AN ERROR CHECK LOGS", "red"))
    if num_of_errors > 0:
        print(colored("There were " + str(num_of_errors) + " in this batch, check olist.log and manually import the data or fork/edit the script", "red"))

    conn.close()
