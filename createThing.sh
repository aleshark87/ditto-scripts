./deletePolicy.sh
curl --location --request PUT -u ditto:ditto 'http://localhost:8080/api/2/things/com.project.thesis:greenhouse' \
--header 'Content-Type: application/json' \
--data-raw '{
    "definition": "https://raw.githubusercontent.com/aleshark87/WoTModels/main/greenhouse/greenhouse.tm.jsonld"
}'
