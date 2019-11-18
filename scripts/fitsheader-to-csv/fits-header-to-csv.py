from astropy.io import fits
import sys


class FitsReader:

    def is_dir_or_fits_file(path_name):
        pass
    

    def traverse_fits_dir(dir_name):
        pass

    def prompt():
        file_name = prompt_file_name()
        fits_file = fits.open(file_name)
        print(fits_file)
        print(file_name)
        print(fits_file.info())

        for i in fits_file:
            print(i)


if __name__ == "__main__":
    fitsReader = FitsReader()
    fitsReader.prompt()
