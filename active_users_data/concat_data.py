from os import listdir
from os.path import isfile, join
import csv
files = [ f for f in listdir("data")]

times = {}
num_rows = 0;
for f in files:
    date = f[9:-4]
    csvfile = open('data/' + f, 'rb')
    reader = csv.reader(csvfile, delimiter=',')
    times[date] = [row for row in reader]
    num_rows = len(times[date])

time_list = sorted(times.keys())
print "number of rows: %d" % num_rows

print time_list


with open("active_users_totals.csv", 'wb') as csvfile:
    labels = ["name"]+ time_list
    print labels

    writer = csv.writer(csvfile)
    writer.writerow(labels)

    for i in range(0,num_rows):
        print i
        cityname = None
        concat_row = []
        for time in time_list:
            rows = times[time]
            print rows

            row = rows[i]
            num_users = row[1]
            temp_city_name = row[0]
            if(cityname == None ):
                cityname = temp_city_name
            elif(cityname != temp_city_name):
                print "reddit names dont match: " + temp_city_name + " " + cityname
                exit()
            concat_row.append(num_users)
        final_row = [cityname] + concat_row
        print final_row    
        writer.writerow(final_row)

