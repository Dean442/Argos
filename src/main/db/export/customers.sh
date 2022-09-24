source ../migrations.env
# customers
mongoexport --host=$HOST --port=$PORT --username=$USER --password=$PASSWORD --forceTableScan --db $DB --collection customer --type json --out ../exports/Customers.json
