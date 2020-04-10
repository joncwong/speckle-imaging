# Scripts for Speckle Imaging Project

### olist-to-csv.py
- Used to convert an .olist file into its corresponding .csv file.
- Olist files contain 10 columns, with multiple rows, and comments. The goal is to extract all 10 columns into entries within a csv row, as well as take the coordinates of a row, and enter in additional information from querying SIMBAD (objects received from a coordinate search and what radius was used)

### ~~fits-header-to-csv.py~~
**Development on this script/CLI halted. Somewhat functional at this point.**

Description: Outputs a .csv file based on a .fits file's header
- Developed on Python 3.7
- Running the script will open up a file dialogue prompt for the user to choose which fits file they want to convert into a .csv file
- Currently, it is undecided whether we want the data to be manually imported after the script runs or for it to be inserted/imported at runtime
- This script assumes the following file input naming convention:
    - Example file name: **N20190610A0415b.fits**
	- **N**20190610A0415b.fits
		 - N = North, S = South
	- N**20190610**A0415b.fits
		 - UTC time
	- N20190610**A**0415b.fits
		 - A = Alopeke, Z = Zorro
	- N20190610A**0415**b.fits
		 - 0 - 9999, repesenting the fits file taken during an observing run (resetted each run)
	- N20190610A0415**b**.fits
		 - Which channel the fits file is from (red or blue)
