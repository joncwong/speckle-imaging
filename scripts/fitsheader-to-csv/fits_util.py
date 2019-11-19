import os
import pathlib


def is_dir_or_fits_file(path):
    '''
        Returns whether or not a path is a fits file or a directory

        Example 1:
            is_dir_or_fits_file('/fitsfiles/') -- Returns: True

        Example 2:
            is_dir_or_fits_file('/fitsfiles/hello.fits') -- Returns: True

        Example 3:
            is_dir_or_fits_file('hello.txt') -- Returns: False
    '''
    if os.path.isdir(path):
        return True
    else:
        name, ext = os.path.splitext(path)
        if ext == "fits":
            return True
    return False


def find_all_fits_files(path):
    '''
        Recursively searches and returns a list of all the files (POSIX format)
        in a given path.
    '''
    fits_file_list = []

    for fits_file in pathlib.Path(path).glob('**/*.fits'):
        fits_file_list.append(fits_file)

    return fits_file_list
