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
docker-compose up -d

# Iniciando o frontend
cd ../frontend
bun install
bun run build
cd dist
http-server
```

---

### ACESSANDO SIMULADOR DE EMAILS
Para simular o envio de emails, utilizamos o `mailpit`. Para acessá-lo, basta abrir o browser no seguinte endereço:
```bash
http://127.0.0.1:8025
```

---

### ACESSANDO O CONTAINER APP
```bash
docker exec -it app bash
```