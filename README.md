### Descrição:

Servidor desenvolvido em Node.JS usando Typescript e Express para desafio de processo seletivo.  

Esse servidor possui autenticação com JWT.  

Rotas:

*/users 
 *POST - Criação do usuário. Espera um email válido e uma senha de pelo menos 8 digitos. Retorna o usúario criado 

*/session 
 *POST - Faz autenticação na aplicação. Espera um email e senha de um usuário já criados. Retorna o usuário e um token JWT caso email e senha estejam corretos.

*/repos
 *POST - Criação de repositório baseado em repositórios do github. 
    Espera os seguintes parâmetros:
        *token - enviado pela requisição como bearer token
        *full_name
	    *description
	    *owner_login
	    *owner_avatar_url
 *DELETE/id -Delete um repositório. Espera o token de autenticação (apenas usuários autenticados podem excluir um repositório) e o id do repositório a ser deletado.




### Como executar o projeto:

Faça o clone do repositório com o link => https://github.com/lucaspbz/Ruptiva_challenge_server.git  

Abra seu terminal na pasta raiz do projeto e rode o comando "yarn" ou "npm install" para instalar as dependências.  

Rode o comando "yarn dev:server" ou "npm run dev:server" para iniciar o servidor.  

Siga para https://github.com/lucaspbz/Ruptiva_challenge_web para baixar e instalar a aplicação web.
