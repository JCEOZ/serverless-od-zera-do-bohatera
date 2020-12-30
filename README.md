# Serverless - od zera do bohatera
Repozytorium dla kursu [Serverless - od zera do bohatera](https://akademia.serverlesspolska.pl/szkolenie-serverless/)

## Nawigacja
- [Środowisko na potrzeby kursu](#środowisko-na-potrzeby-kursu)
    - [Maszyna wirtualna](#maszyna-wirtualna)
      - [Konfiguracja VirtualBox](#konfiguracja-virtualbox)
        - [Tworzenie maszyny wirtualnej](#tworzenie-maszyny-wirtualnej)
        - [Ustawienia maszyny wirtualnej](#ustawienia-maszyny-wirtualnej)
        - [Konfiguracja skrótu dla maszyny wirtualnej](#konfiguracja-skrótu-dla-maszyny-wirtualnej)
        - [Instalacja Guest Additions](#instalacja-guest-additions)
  - [Wykorzystywane narzędzia](#wykorzystywane-narzędzia)
    - [VirtualBox](#virtualbox)
      - [Skróty](#skróty)
    - [Guake](#guake)
      - [Instalacja](#instalacja)
      - [Konfiguracja](#konfiguracja)
      - [Skróty](#skróty-1)
    - [nvm](#nvm)
      - [Instalacja](#instalacja-1)
      - [Polecenia](#polecenia)
    - [Node.js](#nodejs)
      - [Instalacja](#instalacja-2)
      - [Polecenia](#polecenia-1)
    - [npm](#npm)
      - [Polecenie](#polecenie)
    - [Serverless Framework](#serverless-framework)
      - [Instalacja](#instalacja-3)
      - [Polecenia](#polecenia-2)
    - [Visual Studio Code](#visual-studio-code)
      - [Instalacja VSCode](#instalacja-vscode)
      - [instalacja pluginów](#instalacja-pluginów)
      - [Skróty](#skróty-2)
    - [AWS CLI](#aws-cli)
      - [Instalacja](#instalacja-4)
      - [Polecenia](#polecenia-3)
  - [Opis gałęzi kodu](#opis-gałęzi-kodu)
    - [Tydzień 5](#tydzień-5)
      - [Pierwsza funkcja](#pierwsza-funkcja)
      - [Przekazanie stanu i cold start](#przekazanie-stanu-i-cold-start)
      - [Zadanie domowe](#zadanie-domowe)

## Środowisko na potrzeby kursu

### Maszyna wirtualna

#### Konfiguracja VirtualBox
- VirtualBox: **6.1**
- użyty obraz: **xubuntu 20.04 Focal Fossa LTS**

##### Tworzenie maszyny wirtualnej
- name and operating system
  - name: **serverless**
  - type: **Linux**
  - version: **Ubuntu (64bit)**
- memory size: **6144 MB**
- hard disk
  - Create a virtual disk now
  - VDI (VirtualBox Disk Image)
  - Dynamically allocated
  - disk size: **30 GB**

##### Ustawienia maszyny wirtualnej
- Settings:
  - System
    - General
      - Advanced
        - Shared Clipboard: **Bidirectional**
        - Drag'n'Drop: **Bidirectional**
    - Motherboard
      - odznaczyć Floppy w Boot Order
    - Processor
      - Processor(s): **4**
      - Execution Cap: **100%**
    - Display
      - Video Memory: **128 MB**
      - Monitor Count: **1**

##### Konfiguracja skrótu dla maszyny wirtualnej
- pobranie ID naszej maszyny wirtualnej
  - w wierszy poleceń wpisujemy: 
    ```
    VBoxManage list vms
    ```
- tworzymy nowy skrót na pulpicie i wchodzimy w jego ustawienia w zakładkę Shortcut i ustawiamy:
  - Target:
    ```
    "ścieżka do pliku VirtualBoxVM.exe" --startvm "{id maszyny}"
    ```
    - przykład
      ```
      "C:\Program Files\Oracle\VirtualBox\VirtualBoxVM.exe" --startvm "{8a9aa8ea-38bd-402f-a5a6-667a00f38be6}"
      ```
  - Start in:
    ```
    "ścieżka do folderu, gdzie mamy zainstalowany VirtualBox"
    ```
    - przykład
      ```
      "C:\Program Files\Oracle\VirtualBox"
      ```
##### Instalacja Guest Additions
- przy uruchomionej maszynie klikamy w Devices -> Insert Guest Additions CD Image
- otwieramy napęd do którego ikona utworzyła się na pulpicie
  - otwieramy konsolę w tej lokalizacji i wykonujemy polecenia:
    ```
    sudo su
    ./VBoxLinuxAdditions.run
    ```

## Wykorzystywane narzędzia

### VirtualBox
#### Skróty
- **Prawy Ctrl + F** przełączanie trybu pełnoekranowego maszyny wirtualnej
- **Prawy Ctrl + H** wywołanie okna shutdown w systemie zainstalowanym na maszynie

### Guake
#### Instalacja
- w terminalu wykonać polecenia:
  ```
  sudo apt-get install guake
  ```
#### Konfiguracja
- w aplikacji "Session and Strtup" dodać wpis który podczas startu systemu uruchomi komendę:
  ```
  /usr/bin/guake
  ```
#### Skróty
- **F12** uruchomienie terminala niezależnie od aplikacji w której jesteśmy
- **F11** przełączanie trybu pełnoekranowego terminala
- **Ctrl +/-** dostosowywanie rozmiaru czcionki terminala

### nvm
#### Instalacja
- w terminalu wykonać polecenia:
  ```
  wget -q0- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
  source ~/.profile
  ```
#### Polecenia
- versja nvm
  ```
  nvm --version
  ```
- sprawdzenie dostępnych wersji LTS node.js do zainstalowania
  ```
  nvm ls-remote --lts
  ```
- określenie, której wersji node.js chcemy używać
  ```
  nvm use 10
  ```
### Node.js
#### Instalacja
- w terminalu wykonać polecenia:
  ```
  nvm install 10
  ```
#### Polecenia
- wersja node
  ```
  node -v
  ```

### npm
#### Polecenie
- instalacja pakietu:
  ```
  npm install -g <nazwa pakietu>
  ```
  - **-g** instalacja globalna (bez tego przełącznika pakiet byłby zainstalowany w danym folderze)

### Serverless Framework
#### Instalacja
- w terminalu wykonać polecenia:
  ```
  nvm use 10
  npm install -g serverless
  ```
#### Polecenia
- można używać zamiennie serverless albo sls
- wersja
  ```
  sls -v
  ```

### Visual Studio Code
#### Instalacja VSCode
- poprzez aplikację software
#### instalacja pluginów
- lista pluginów:
  - [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)
  - [Serverless Framework Snippets](https://marketplace.visualstudio.com/items?itemName=rafwilinski.serverless-vscode-snippets)
  - [aws-cloudformation-yaml](https://marketplace.visualstudio.com/items?itemName=DanielThielking.aws-cloudformation-yaml)
  - [Jest Snippets](https://marketplace.visualstudio.com/items?itemName=andys8.jest-snippets)
  - [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
  - [Run current test](v)
  - [JavaScript Booster](https://marketplace.visualstudio.com/items?itemName=sburg.vscode-javascript-booster)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- w terminalu wykonać polecenia:
  ```
  code --install-extension xabikos.JavaScriptSnippets
  code --install-extension rafwilinski.serverless-vscode-snippets
  code --install-extension DanielThielking.aws-cloudformation-yaml
  code --install-extension andys8.jest-snippets
  code --install-extension Orta.vscode-jest
  code --install-extension asvetliakov.run-current-test
  code --install-extension sburg.vscode-javascript-booster
  code --install-extension dbaeumer.vscode-eslint
  ```
#### Skróty
- **F11** przełączanie trybu pełnoekranowego aplikacji

### AWS CLI
#### Instalacja
- w terminalu wykonać polecenia:
  ```
  sudo snap install aws-cli --classic
  ```
#### Polecenia
- konfiguracja domyślnego profilu
  ```
  aws configure
  ```
- sprawdzenie jakie konto użytkownika zostało skonfigurowane w AWS CLI
  ```
  aws sts get-caller-identity
  ```

## Opis gałęzi kodu
### Tydzień 5
#### Pierwsza funkcja
- Link do gałęzi: [Tydzień 5 - pierwsza funkcja](https://github.com/JCEOZ/serverless-od-zera-do-bohatera/tree/tydzien5-pierwsza-funkcja)
- opis: kod domyślnie wygenerowanej funkcji zaktualizowany o pobranie dwóch liczb z eventu i zwrócenie ich sumy
#### Przekazanie stanu i cold start
- Link do gałęzi: [Tydzień 5 - Przekazanie stanu i cold start](https://github.com/JCEOZ/serverless-od-zera-do-bohatera/tree/tydzien5-stan-i-coldstart)
- opis: przykład przekazania stanu między wywołaniami funkcji oraz logowanie informacji czy mieliśmy do czynienia z cold/warm start
#### Zadanie domowe
- Link do gałęzi: [Tydzień 5 - Zadanie domowe](https://github.com/JCEOZ/serverless-od-zera-do-bohatera/tree/tydzien5-zadanie-domowe)
- opis: funkcja wywołująca [Star Wars API](https://swapi.dev/) z użyciem biblioteki [axios](https://github.com/axios/axios)
