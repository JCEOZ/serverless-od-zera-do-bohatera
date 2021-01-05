# Tydzień 7 - REST DynamoDB

Projekt REST API CRUD wykorzystujący DynamoDB do przechowywania danych

## Używane polecenia
```
sls create -t aws-nodejs -n tydzien07-rest-dynamodb
sed -i '/^[[:blank:]]*#/d;s/#.*//' serverless.yml
npm init
npm i -D eslint eslint-config-airbnb-base
```

## npm
- instalacja modułów
  ```
  npm i nazwa_modułu
  ```
  - **-D** tryb developerski (moduły będą używane przy developmencie ale nie zostaną wysłane do AWS)