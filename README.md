# Tydzień 7 - REST hello

## Polecenia
```
sls create -t aws-nodejs -n tydzien7-rest-hello
sed -i '/^[[:blank:]]*#/d;s/#.*//' serverless.yml
sls deploy
sudo apt install curl
sudo snap install jq
curl URL|jq
curl URL?param1=p1\&param2=p2|jq
```
## VSCode
### Skróty
  - **File -> Auto Save** włączenie auto save
  - **Ctrl + B** przełączanie okna eksploratora plików
  - **Ctrl + \\** otwarcie pliku w osobnym oknie (split)
### Pluginy
  - [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
    ```
    code --install-extension humao.rest-client
    ```