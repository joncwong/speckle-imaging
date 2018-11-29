from astroquery.simbad import Simbad
result_table = Simbad.query_object("m32")
print(result_table)

