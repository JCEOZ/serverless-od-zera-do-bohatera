# Tydzień 5 - Zadanie domowe
Funkcja wywołująca [Star Wars API](https://swapi.dev/) z użyciem biblioteki [axios](https://github.com/axios/axios)

## Używane polecenia
```
sls create -t aws-nodejs -n tydzien5-hw
npm init
npm install axios
sls deploy
sls invoke -f swapi -d '{"characterId": 3}'
sls logs -f swapi
sls remove
```
