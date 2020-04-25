# SpeckleDB

### Dumps

This directory contains all the backups of SpeckleDB in SQL dumps. The dates in which each backup was created is embedded in the file name.

As of 04/25/2020, the most up-to-date backup is: **speckle_dump_04_23_2020.sql**

# Data Format

### Tables
SpeckleDB currently contains 2 tables: **metadata** and **olist**

#### Metadata
Columns are described as follows

| Column Name | Data Type  | Description  | Example Value |
| ------------ | ------------ | ------------ | ------------ |
|  h_id | varchar(255) | Internal identification value | H702046 |
| fits_file | int(11) | Corresponding fits file number from the observing run | 57 |
| time | varchar(255) | Time of capture | 04:15 |
| blue_gain | int(11) | Blue gain | 20 |
| red_gain | int(11) | Red gain | 20 |
| right_asc | varchar(255) | Right ascension | 23:16:42.5 |
| dec | varchar(255) | Declination  | +53:12:44 |
| epoch | varchar(255) | Epoch | 2000.00 |
| mag | varchar(255) | Magnitude | 5.60 |
| program_id | text | Program ID | TANDE_SCOTT/HD219623 |
| objects | JSON | Objects found within a specific search radius of the coordinates (ra and dec) | {"HD 219623": "PM*"} |
| search_radius | varchar(255) | Search radius in degrees used to search for objects in SIMBAD, degrees are doubled by 2 until a search is valid, starting at 1 arcsecond (0.00028 degrees) | 0.00448 |
| olist_id | int(11) | Foreign key used to link an olist file in the olist table to each row in the metadata table. These values are incremented by 1 in the order in which they are inserted. Missing values in the range (1, Infinity) are due to deleted olist entries from bad ingestion runs | 21 |
| instrument | varchar(255) | Instrument used to observe target | nessi |

#### Olist
Columns are described as follows

| Column Name | Data Type  | Description  | Example Value |
| ------------ | ------------ | ------------ | ------------ |
|  olist_id | int(11) | Primary key that is linked by olist_id in metadata rows | 21 |
| name | varchar(255) | Original file name of the olist file ingested. Note: Some files occasionally share the same file name due to the naming convention used in olist files. | oct15raw.olist |
| file | blob | File contents stored in the database as binary objects | **Cannot fit** |
