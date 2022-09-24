source ../migrations.env
# import Projects
mongoimport --host=$HOST --port=$PORT --username=$USER --password=$PASSWORD --db $DB --collection project --file ../exports/Projects.json