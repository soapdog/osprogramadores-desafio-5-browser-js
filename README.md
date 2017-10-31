# osprogramadores-desafio-5-browser-js
[Os Programadores] Desafio 05 em JS para o BROWSER



# Lua
Instale o [Lua](http://lua.org) e o [Luarocks](http://luarocks.org). Utilize o script `setup_lua.sh` para instalar os modulos `lua-cjson` e `penlight`. 

Rode o app com:

```
$ time lua app.lua nome-do-arquivo.json
```

# PHP

Rode o app com:

```
$ time php app.php nome-do-arquivo.json
```

# JS
Abra o arquivo `index.html` no seu navegador. Ligue as ferramentas de desenvolvimento web no seu navegador (ex CTRL+SHIFT+K no Firefox). Selecione o arquivo json desejado e observe o benchmark no console.

### Observacoes pessoais
Aqui na minha maquina, um dual xeon com 8gb de RAM, eu tenho obtido os seguintes resultados:

* JS com Firefox 56+ roda em 7.3s
* Lua 5.3 roda em 9.8s
* PHP 7.1 roda em 11.8s

Em todos os casos utilizando o arquivo com [3 milhoes de registros](https://www.uece.net/osprogramadores/d05/funcionarios-3M.json.7z) caso queira outros arquivos de testes com outros valores, pode pegar [aqui](https://github.com/qrwteyrutiyoup/op-website-hugo/blob/79bc2e6e0482e5043238d9e1d15967c8c7557542/content/desafios/d05.md)

