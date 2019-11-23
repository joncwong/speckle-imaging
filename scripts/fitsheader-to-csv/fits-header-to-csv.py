from astropy.io import fits
import argparse
import fits_util
import sys
import csv
import os


class FitsReader:
    '''
        FitsReader provides configurable ways to converting fits headers into csv files
    '''

    def __init__(self, fits_files, headers, output_file):
        self.fits_files = fits_files
        self.headers = headers
        self.output_file = output_file

    def convert_next(self):
        with open(self.output_file, 'w+') as fits_csv:
            fits_csv_writer = csv.writer(fits_csv, delimiter='|')
            curr_fits_file = next(self.fits_files)

            with fits.open(curr_fits_file) as fits_file:
                fits_header = fits_file[0].header
                curr_row = []
                for header in self.headers:
                    print(fits_header[header])
                    # curr_row.append
                
            # fits_csv_writer.writerow(curr_row)

    def convert_all(self):
        print('////')
        with open(self.output_file, 'w+') as fits_csv:
            print('///////////')
            fits_csv_writer = csv.writer(fits_csv, delimiter='|')
            for curr_fits in self.fits_files:
                print(curr_fits)
                with fits.open(curr_fits) as fits_file:
                    print('////')
                    fits_header = fits_file[0].header
                    curr_row = []
                    for header in self.headers:
                        print(fits_header[header])


def get_args():
    '''
        Return list of passed in arguments. Expects fits files or directories containing fits files
    '''
    args = sys.argv[1]
    return args


def main():
    parser = argparse.ArgumentParser(description='Convert FITS headers into CSV files')
    parser.add_argument('--dir', action='store_const', const='fits_dir',
                        help='Directory that contains FITS files for conversion')
    parser.add_argument('--csv', action='store_const', dest='constant_value',
                        const='value-to-store',
                        help='Destination CSV file')
    parser.add_argument('--headers', action='store_const', dest='constant_value',
                        const='value-to-store',
                        help='Headers to extract in specified order')
    path_list = get_args()
    fits_files = fits_util.aggregate_fits_files(path_list)
    headers = ['UTC', 'EPOCH', 'RA', 'DEC', 'EMGAIN', 'FILTER', 'OBSID', 'COMMENT']
    fitsReader = FitsReader(fits_files, headers, 'fitstest.csv')
    parser.parse_args()
    # fitsReader.convert_all()

if __name__ == "__main__":
    main()