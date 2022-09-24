source ../migrations.env
# import Mandates
mongoimport --host=$HOST --port=$PORT --username=$USER --password=$PASSWORD --db $DB --collection mandate --file ../exports/Mandates.json