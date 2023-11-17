# QUIKDEV - TESTE ICARO
Esse projeto é um estudo de caso simples, onde basicamente vai envolver a criação dos seguintes recursos:
- Registro de Usuários
- Autenticação de Usuários
- Criação de Posts
- Criação de Comentários em um Post
- Relatórios

---

### PRÉ-REQUISITOS DE SISTEMA OPERACIONAL
Para executar tanto o `frontend` quanto a `api` (backend), será necessário os seguintes softwares:
- git
- Docker
- docker-compose
- Node.js

---

### PRÉ-REQUISITOS PARA EXECUÇÃO - API
Para executar a API será necessário ter instalado o `Docker` + `docker-compose` em seu sistema operacional.

---

### PRÉ-REQUISITOS PARA EXECUÇÃO - FRONTEND
Para executar o frontend, basta ter um servidor web simples. Será necessário ter o `node.js` instalado em seu computador e, 
também, o `http-server`. Para instalar o `http-server` basta digitar o seguinte comando (após ter o node.js instalado):
você poderá executar o frontend da seguinte forma:
```bash
npm install -g http-server
```

---

### PASSO-A-PASSO PARA EXECUTAR O PROJETO
Abaixo, vou listar todos os comandos necessários para executar o projeto em qualquer computador com `Docker`, `docker-compose`, `git` e `node.js` instalados:.
```bash
cd ~/Seu-diretorio-de-projetos

# Abaixo, escolha uma das opções de clonagem para o projeto

# clonando o projeto com https
git clone https://github.com/icarojobs/quikdev-teste.git # para https

# clonando o projeto com ssh
git clone git@github.com:icarojobs/quikdev-teste.git # para ssh

# Iniciando o backend + banco de dados + simulador de emails
cd quikdev-teste/api
docker-compose up -d # Aguarde alguns segundos, até o terminal estar liberado para digitar.

# Iniciando o frontend
cd ../frontend
bun install
bun run build
cd dist
http-server

# Caso queira executar todos esses comandos de uma vez, navegue até o diretório '/frontend' e digite:
bun install && bun run build && cd dist && http-server
```

---

### ACESSANDO SIMULADOR DE EMAILS
Para simular o envio de emails, utilizamos o `mailpit`. Para acessá-lo, basta abrir o browser no seguinte endereço:
```bash
http://127.0.0.1:8025
```

---

### EXECUTANDO A API EM MODO DEBUG
Durante o desenvolvimento é recomendado executar a API em modo de desenvolvimento para detectar erros e bugs. 
Para isso, basta executar da seguinte forma:
```bash
docker-compose stop  # primeiro, pare todos os containers da API
docker-compose up    # execute em modo debug
```

### ACESSANDO O CONTAINER APP
```bash
cd api
docker exec -it app sh  # os containers devem estar 'up', se não estiver, execute o seguinte comando antes: docker-compose up -d
```