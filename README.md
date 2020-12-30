# Tydzień 5 - Przekazanie stanu i cold start
Przykład przekazania stanu między wywołaniami funkcji oraz logowanie informacji czy mieliśmy do czynienia z cold/warm start

## Używane polecenia
```
sls create -t aws-nodejs -n state
sls deploy
sls invoke -f state
sls remove
```
