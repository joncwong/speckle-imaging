from tkinter import Tk
from tkinter.filedialog import askopenfilename
import csv 
import re
import os
from astroquery.simbad import Simbad
import astropy.coordinates as coord
from astropy import units as u
from astropy.coordinates import SkyCoord

# Opens a dialog box for user to select .olist file to convert 
Tk().withdraw() 
file_name = askopenfilename() 
print(file_name)


def query_simbad(ra, dec):
    """
        Return a dictionary of Simbad results given a coordinate set.
        Parameters: 
        ra (string): Right Ascension 
        dec (string): Declination 
        Returns:
        dict: Contains key/values with valuable SIMBAD query information
    """
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
            #print("num of results at " + str(radius) + " radius: " + str(result_len))
            radius = radius * 2
        except:
            print("EXCEPTION")
            radius = radius * 2
            print("RADIUS: " + str(radius))
            if radius == 3: 
                print("RADIUS IS 3")
                results = None
                break
            continue
        if radius == 5:
            print("RADIUS IS 3 V2")
            results = None
            break
    
    for row in results:
        object_id = row['MAIN_ID'].decode('utf-8')
        object_type = row['OTYPE'].decode('utf-8')
        objects[object_id] = object_type

    simbad_results['radius'] = round(radius, 5)
    simbad_results['objects'] = objects
    return simbad_results


with open(file_name) as file:
    data = file.read()

new_data = [] 
head, tail = os.path.split(file_name)
split_by_line = data.split('\n')
for line in split_by_line:
    if len(line.split(" ")) < 4:
        continue
    if line != "":
        if str(line)[0] == "H":
            comment = False
            #Split line between actual content and comments
            if "#" in line:
                line_split = line.split("#")
                line = line_split[0]
                comment = line_split[1]
                print("comment: " + comment)
            #Replace "HR 1231" with "HR_1231"
            if str(line[:2]) == "HR":
                line = line[:2] + "_" + line[3:]
            #Strip double spaces and replace with single space
            line = ' '.join(line.split())
            #Grab only the first ten entries, separated by spaces in olist files
            line_split = line.split(" ")
            first_nine_entries = line_split[:9]
            
            # Sometimes, olist entry will have some missing data, 
            # append the list with empty strings so indexing doesn't become inconsistent
            empty_columns = 9 - len(first_nine_entries)
            for i in range(empty_columns):
                first_nine_entries.append("")
                
            #Grab RA and Dec to retrieve SIMBAD ID to insert into column 11
            ra = first_nine_entries[5] 
            dec = first_nine_entries[6]

            first_nine_entries = "|".join(first_nine_entries)
            #Replace spaces in the tenth column/entry with underscores
            tenth_entry = " ".join(line_split[9:])
            tenth_entry = tenth_entry.replace(" ", "_")

            simbad_results = query_simbad(ra, dec)
            #Join first 9 entries with 10th entry, the simbad objects, and the simbad range creating the essential line
            line = first_nine_entries + "|" + tenth_entry + "|" + str(simbad_results['objects']) + "|" + str(simbad_results['radius'])
            print(line)
            #Add line and reformatted comments back into the dataset
            if not comment:
                #Once again, strip any double spaces from joining the other entries
                line = re.sub("\s\s+", " ", line)
                line = line + "|"
            else:
                line = line + "|" + comment
                line = re.sub("\s\s+", " ", line)
            new_data.append(line)
            print(line)

with open("newbatch" + tail + ".csv", 'w+') as new_file:
    #write header
    header = "star_id|fits_file|time|blue_gain|red_gain|right_asc|dec|epoch|mag|program_id|objects|search_radius|comment"
    new_file.write(header + "\n")
    for line in new_data:
        new_file.write(line + "\n")
        print("hello")
    print("Done writing file")