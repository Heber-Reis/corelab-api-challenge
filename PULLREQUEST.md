# Ferramentas

Para o backend foi utilizado o webpack e o framework express e para armazenamento de dados foi utilizado o MongoDB com o ODM mongoose

# Modules

A pasta modules está dividida em 3 arquivos sendo um de controller onde estão todas as rotas e receb os dados da requsição chamando as respectivas funções e enviando a resposta, a outra pasta é a service onde estão as funções responsáveis por realizar os processamentos e as query no banco de dados e a pasta model onde contém o modelo de dados salvo no MongoDB

# Pasta utils

Contém o arquivo com o middleware do mongoose, responsável por criar a conexão com o banco de dados
A URI do banco de dados está salvo como variável de ambiente