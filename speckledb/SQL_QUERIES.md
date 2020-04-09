# SpeckleDB Pre-prepared SQL Statements

### Setting up SpeckleDB



### Queries

Query all metdata rows in the database:
```SQL
SELECT * FROM metadata;
```

Query all olist files in the database:
```SQL
SELECT * FROM olist;
```

Query for star metadata by h_id:
```SQL
SELECT * FROM metadata WHERE h_id = '<H_ID>';
```

Query for star metadata by coordinates (ra and dec):
```SQL
SELECT * FROM metadata WHERE right_asc = '<RIGHT_ASC>' and dec = '<DEC>';
```

Query for star metadata by coordinates (ra and dec):
```SQL
SELECT * FROM metadata WHERE right_asc = '<RIGHT_ASC>' and dec = '<DEC>';
```

Query for star metadata by coordinates (ra and dec) and include their original olist files
```SQL
SELECT m.h_id, m.fits_file, m.time, m.blue_gain, m.red_gain, m.right_asc, m.dec, 
m.epoch, m.mag, m.program_id, m.objects, m.search_radius, olist.name, olist.file
FROM metadata AS m
INNER JOIN olist ON m.olist_id = olist.olist_id
WHERE m.right_asc = '<RIGHT_ASC>' AND m.dec= '<DEC>';
```

Query for star metadata by h_id and include their original olist files:
```SQL
SELECT m.h_id, m.fits_file, m.time, m.blue_gain, m.red_gain, m.right_asc, m.dec, 
m.epoch, m.mag, m.program_id, m.objects, m.search_radius, olist.name, olist.file
FROM metadata AS m
INNER JOIN olist ON m.olist_id = olist.olist_id
WHERE m.h_id = '<H_ID>';
```

Query for star metadata by star_id (Simbad identifier):
```SQL
SELECT m.* FROM metadata m
INNER JOIN 
(SELECT json_str FROM
	(SELECT
		objects,
		JSON_KEYS(objects) AS json_keys,
		CONVERT(objects, CHAR) AS json_str
	FROM `metadata`) AS j
WHERE 
	j.json_str LIKE "%KOI-98\":%") AS j
ON m.objects = CONVERT(j.json_str, JSON);
```

### Maintenance/TODOs
Before running any modifying queries, make sure to start a transaction with:
```SQL 
START TRANSACTION;
```
Commit/finalize your changes with:
```SQL 
COMMIT;
```
If something unexpected happens and a rollback is needed, rollback your changes:
```SQL 
ROLLBACK;
```
