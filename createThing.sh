curl -X PUT 'http://localhost:8080/api/2/things/my.test:octopus' -u 'ditto:ditto' -H 'Content-Type: application/json' -d '{
    "policyId": "my.test:policy",
    "attributes": {
        "name": "octopus",
        "type": "octopus board"
    },
    "features": {
        "temp_sensor": {
            "properties": {
                "value": 0
            }
        },
        "altitude": {
            "properties": {
                "value": 0
            }
        }
    }
}'
