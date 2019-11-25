from astropy.io import fits
from termcolor import colored
import argparse, textwrap, sys, csv, os, re
import fits_util


class FitsReader:
    '''
        FitsReader provides configurable ways to converting fits headers into csv files
    '''

    def __init__(self, fits_files, headers, output_file):
        self.fits_files = fits_files
        self.headers = headers
        self.output_file = output_file

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


def extract_headers(headers_str):
    '''
        Return a list of headers from a comma separated string of headers.

        Example: extract_headers('hello,bye,aw.l,j%c')
                 Returns ['hello', 'bye']
    '''
    header_list = headers_str.split(',')
    if len(header_list) <= 1:
        print(colored('Too few headers provided. Please try again.', 'red'))
        raise Exception('ScarceHeaderException')

    header_regex = re.compile(r'^\w+$')
    filtered_headers = list(filter(header_regex.search, header_list))

    if len(filtered_headers) != len(header_list):
        print(colored('One or more invalid headers. Please Fix.', 'red'))
        raise Exception('InvalidHeaderException')

    return filtered_headers


def main():
    parser = argparse.ArgumentParser(description='Convert FITS headers into CSV files', formatter_class=argparse.RawTextHelpFormatter)
    parser.add_argument('--dir', required=True, help=textwrap.dedent('''
                        Directory that contains FITS files for conversion.
                        Example Input: /myfits/fits/20191018.fits
                        '''))
    parser.add_argument('--csv', required=True, help=textwrap.dedent('''
                        Destination path for CSV output file. Include full file name in path.
                        Example Input: /myfits/csv/20191018fits.csv
                        '''))
    parser.add_argument('--headers', required=True, help=textwrap.dedent('''
                        FITS headers to extract in specified order; comma separated.
                        FITS headers extracted will be converted into their respective CSV column attributes.
                        Warning: Only include alphanermic and comma characters. No spaces. Requires valid headers.
                        Example: UTC,EPOCH,RA,DEC,EMGAIN,FILTER,OBSID,COMMENT
                        '''))

    args = parser.parse_args()
    path_list = args.dir
    fits_files = fits_util.aggregate_fits_files(path_list)
    headers = extract_headers(args.headers)
    print(headers)
    fitsReader = FitsReader(fits_files, headers, 'fitstest.csv')
    fitsReader.convert_all()


if __name__ == "__main__":
    main()
