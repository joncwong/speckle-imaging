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
    if os.path.isdir(path):
        _, ext = os.path.splitext(path)
        if ext == "fits":
            return True
    return False


def is_fits_or_dir(path):
    '''
        Return whether or not a path is either a fits file or a directory
    '''
    return is_fits_file(path) or os.path.isdir(path)


def aggregate_fits_files(path_list):
    '''
        Recursively searches and returns a list of all the files (POSIX format)
        in a given path.
    '''
    fits_files = []

    # Filter out any invalid or nonexistent path names
    valid_paths = filter(is_fits_or_dir, path_list)

    for fits_file in pathlib.Path(valid_paths).glob('**/*.fits'):
        fits_files.append(fits_file)

    return fits_files
