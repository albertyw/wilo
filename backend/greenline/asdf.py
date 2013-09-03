import csv
import MySQLdb


db = MySQLdb.connect(host="localhost",user="greenline",passwd="PVTKhyd3UZTAPsmE",db="greenline")

reader = csv.reader(open('babcockinbound.txt', 'rb'), )
for row in reader:
    departure = row[2]
    hour = departure[0:2]
    minute = departure[3:5]
    departure = int(hour)*60+int(minute)
    query = "INSERT INTO times (departure) VALUES('"+str(departure)+"');"

    try:
        db.query(query)
        print query
    except MySQLdb.IntegrityError:
        continue

#greenline.query("SELECT * FROM times")
#print greenline.fetch()
#print greenline.fetch()

