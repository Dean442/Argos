source ../migrations.env
# employees.sh
mongoexport --host=$HOST --port=$PORT --username=$USER --password=$PASSWORD --forceTableScan --db $DB --collection employee --type json --out ../exports/Employees.json


