# Tydzień 9 - Single Page Application

Projekt Single Page Application

## Używane polecenia
```
npm i
npm run start
sls deploy
ustawienie nazwy domeny, ręcznie w konsoli AWS w serwisie Congito -> nasz user pool -> App Integration -> Domain name
npm i aws-amplify
aws cloudformation --region eu-central-1 describe-stacks --stack-name app-cognito-dev --query "Stacks[0].Outputs"
npm run start
# Komenda na wypadek wystąpienia problemu z przekroczeniem limity watcher’ów
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
npm i axios
npm i -D jest @types/jest rewire
npm test
aws s3 cp __test__/__resources/products.csv s3://jz-import-file-dev-bucket/
npm i aws4
aws cloudformation --region eu-central-1 describe-stacks --stack-name products-dev --query "Stacks[0].Outputs"
```