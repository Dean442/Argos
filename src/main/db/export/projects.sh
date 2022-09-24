source ../migrations.env
# projects
mongoexport --host=$HOST --port=$PORT --username=$USER --password=$PASSWORD --forceTableScan --db $DB --collection project --type json --out ../exports/Projects.json

