from astropy.io import fits
import fits_util
import sys
import csv


class FitsReader:
    '''
        FitsReader provides configurable ways to converting fits headers into csv files
    '''

    def __init__(self, fits_files, headers, output_file):
        self.fits_files = fits_files
        self.headers = headers

    def convert_next(self):
        with open(next(self.fits_files)) as fits_csv:
            fits_csv_writer = csv.writer(fits_csv, delimiter='|')
            curr_row = []
            for header in self.headers:
                pass
            fits_csv_writer.writerow(curr_row)

    def convert_all(self):
        pass


def get_args():
    '''
        Return list of passed in arguments. Expects fits files or directories containing fits files
    '''
    args = sys.argv[1:]
    return args


def main():
    path_list = get_args()
    fits_files = fits_util.aggregate_fits_files(path_list)
    headers = ['UTC', 'EPOCH', 'RA', 'DEC', 'EMGAIN', 'FILTER', 'OBSID', 'COMMENT']
    fitsReader = FitsReader(fits_files, headers, 'fitstest.csv')

if __name__ == "__":
    main()