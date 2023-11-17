# QUIKDEV - TESTE ICARO
Esse projeto é um estudo de caso simples, onde basicamente vai envolver a criação dos seguintes recursos:
- Registro de Usuários
- Autenticação de Usuários
- Criação de Posts
- Criação de Comentários em um Post
- Relatórios

### PRÉ-REQUISITOS PARA EXECUÇÃO - API
Para executar a API será necessário ter instalado o `Docker` + `docker-compose` em seu sistema operacional.

### PRÉ-REQUISITOS PARA EXECUÇÃO - FRONTEND
Para executar o frontend, basta ter um servidor web simples. Caso tenha o `node.js` instalado em seu computador, 
você poderá executar o frontend da seguinte forma:
```bash
# Instale o http-server caso não tenha instalado ainda
npm install -g http-server

cd frontend/dist
http-server
```

### ACESSANDO O CONTAINER APP
```bash
docker exec -it app bash
```