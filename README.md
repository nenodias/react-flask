# react-flask
Exemplo usando Flask + PyReact + React + RequireJS + 

```
pip install -r requirements
```


Para rodar é necessário o NodeJs instalado (o PyReact compila os JSX usando o NodeJs).
Além disso é preciso do bower para instalar as dependências da pasta static.

```

cd app/static
npm install
npm install -g requirejs (talvez com sudo)
r.js -convert node_modules/events node_modules/events (para converter a biblioteca events para o formato do requirejs)

```

```
python run.py
```
