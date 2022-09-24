source ../migrations.env
# mandates
mongoexport --host=$HOST --port=$PORT --username=$USER --password=$PASSWORD --forceTableScan --db $DB --collection mandate --type json --out ../exports/Mandates.json
