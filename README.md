# Tydzień 8 - REST VPC

Projekt REST API CRUD wykorzystujący RDS do przechowywania danych

## Używane polecenia
```
aws dynamodb list-tables --region eu-central-1
sls deploy -s prod
sls remove -s prod
sls deploy -s test -v
sls info
sls remove -s test -v
npm i promise-mysql
npm i
sls invoke -f createSchema
npm i -g artillery
artillery quick --count 60 -n 100 https://vigsya55zl.execute-api.eu-central-1.amazonaws.com/dev/products/1
# quick - szybki test
# count - ilość wirtualnych użytkowników
# n - liczba zapytań per użytkownik
# url do naszego API GW
```