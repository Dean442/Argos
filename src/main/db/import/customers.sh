source ../migrations.env
# import customers
mongoimport --host=$HOST --port=$PORT --username=$USER --password=$PASSWORD --db $DB --collection customer --file ../exports/Customers.json