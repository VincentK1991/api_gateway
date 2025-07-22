#!/bin/bash

echo "test you development using curl http://localhost:8080/api/hello"
echo " any changes you make to the source code in src/main/java will
  automatically trigger a restart of the application,
  effectively providing hot-reloading."

./mvnw spring-boot:run
