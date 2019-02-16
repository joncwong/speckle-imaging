# Scripts for Speckle Imaging Project

### olist-to-csv (Python Script)
- Used to convert an .olist file into its corresponding .csv file. 
- Olist files contain 10 columns, with multiple rows, and comments. The goal is to extract all 10 columns into entries within a csv row, as well as take the coordinates of a row, and enter in additional information from querying SIMBAD (objects received from a coordinate search and what radius was used).
- To Do:
-- Make a connection to the database and automatically insert into DB server (but what if .csv file turns out ugly)? Possibly just make another script to upload all .csv files into DB?
-- Create tests to ensure that the script is working as intended 99% of the time.
-- Give the capability of converting multiple files at once. 
