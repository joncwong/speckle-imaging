import os
import pathlib


def is_fits_file(path):
    '''
        Returns a file is a fits file.

        Example 1:
            is_fits_file('/fitsfiles/hello.fits') -- Returns: True

        Example 2:
            is_fits_file('hello.txt') -- Returns: False
    '''
    if not os.path.isdir(path):
        _, ext = os.path.splitext(path)
        if ext == ".fits":
            return True
    return False


def is_fits_or_dir(path):
    '''
        Return whether or not a path is either a fits file or a directory
    '''
    return is_fits_file(path) or os.path.isdir(path)


def aggregate_fits_files(path_arg):
    '''
        Recursively searches and returns a list of all the files (POSIX format)
        in a given path.
    '''

    fits_files = []
    dir_path = os.path.dirname(__file__)

    if is_fits_file(path_arg):
        raise Exception('Please provide a directory path, not a FITS file.')

    path = os.path.join(dir_path, path_arg)

    for fits_file in pathlib.Path(path).glob('**/*.fits'):
        fits_file_path = os.path.join(dir_path, str(fits_file))
        fits_files.append(fits_file_path)

    return fits_files