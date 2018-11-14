
# coding: utf-8

# In[1]:


file_name = 'dec15raw.olist'
with open(file_name) as file:
    data = file.read()


# In[3]:


import re
new_data = []
split_by_line = data.split('\n')
for line in split_by_line:
    if line != "":
        if str(line)[0] == "H":
            comment = False
            #Split line between actual content and comments
            if "#" in line:
                line_split = line.split("#")
                line = line_split[0]
                comment = line_split[1]
                print("comment: " + comment)
            #Replace "HR 1231" with "HR_1231"
            if str(line[:2]) == "HR":
                line = line[:2] + "_" + line[3:]
            #Strip double spaces and replace with single space
            line = ' '.join(line.split())
            #Grab only the first ten entries, separated by spaces in olist files
            line_split = line.split(" ")
            first_nine_entries = line_split[:9]
            first_nine_entries = " ".join(first_nine_entries)
            #Replace spaces in the tenth column/entry with underscores
            tenth_entry = " ".join(line_split[9:])
            tenth_entry = tenth_entry.replace(" ", "_")
            #Join first 9 entries with 10th entry, creating the essential line
            line = first_nine_entries + " " + tenth_entry
            print(line)
            #Add line and reformatted comments back into the dataset
            if not comment:
                #Once again, strip any double spaces from joining the other entries
                line = re.sub("\s\s+", " ", line)
            else:
                line = line + " " + comment
                line = re.sub("\s\s+", " ", line)
            new_data.append(line)


# In[4]:


with open("transformed4_" + file_name, 'w+') as new_file:
    for line in new_data:
        new_file.write(line + "\n")
        print("hello")

