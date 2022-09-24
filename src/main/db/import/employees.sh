source ../migrations.env
# import Employees
mongoimport --host=$HOST --port=$PORT --username=$USER --password=$PASSWORD --db $DB --collection employee --file ../exports/Employees.json