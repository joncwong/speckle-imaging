from astropy.io import fits
import fits_util
import sys


class FitsReader:

    def __init__(self, fits_files, headers):
        self.fits_files = fits_files
        self.headers = headers


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

if __name__ == "__":
    # main()
    get_args()
