# QUIKDEV - TESTE ICARO
Esse projeto é um estudo de caso simples, onde basicamente vai envolver a criação de alguns recursos:
- Registro de Usuários
- Autenticação de Usuários
- Criação de Posts
- Criação de Comentários em um Post
- Relatórios



### PRÉ-REQUISITOS DE SISTEMA OPERACIONAL
Para executar tanto o `frontend` quanto a `api` (backend), será necessário os seguintes softwares:
- git
- Docker
- docker-compose
- Node.js
- npm
- bun
**Atenção:** Todo comando `bun` pode ser substituído por `npm` caso preferir.

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

### PASSO-A-PASSO PARA EXECUTAR O PROJETO COMPLETO (FRONTEND + API)
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
cp .env.example .env
docker-compose up -d # Aguarde alguns segundos, até o terminal estar liberado para digitar.
sleep 7 && docker-compose exec -T app bun run migrate # Popula todas as tabelas do banco de dados. Explico o sleep na seção 'SOLUÇÃO DE PROBLEMAS'

# Iniciando o frontend
cd ../frontend
bun install
bun run build  # Aqui pode ser trocado por 'bun run dev' caso não queira compilar.
cd dist
http-server

# Caso queira executar todos esses comandos de uma vez, navegue até o diretório '/frontend' e digite:
bun install && bun run build && cd dist && http-server
```

---

### ACESSANDO O SIMULADOR DE EMAILS
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

### CONECTANDO AO BANCO DE DADOS
Caso queira conectar utilizando um cliente MySQL, basta informar os dados contidos no arquivo `.env.example` ou `.env`:
```dotenv
DB_HOST=127.0.0.1 # Na aplicação, a conexão é pelo serviço, ou seja, host=mysql
DB_PORT=3306
DB_USERNAME=sail
DB_PASSWORD=password
DB_DATABASE=quikdev_teste
```

---

### TESTE DE BACKEND
No diretório `/api/docs` deixei uma collection para testar os endpoints da API. Não tem todos, pois eu ia adicionando 
conforme ia criando cada endpoint.

---



---

### SOLUÇÃO DE PROBLEMAS
**Erro `Error: Cannot find module 'lodash'` ou `Error: Cannot find module 'inflection'` (ou algo do tipo) ao executar as migrations:**
- Esse erro é ocasionado em casos que tentamos executar o comando de migração, logo que o terminal é liberado. Utilizamos um sleep 7 pra dar tempo de todos os containers estarem 100% carregados.
- Se ainda com o `sleep 7` ocorrer o erro. Aguarde mais uns 10 seguntos e tente executar o comando `docker-compose exec -T app bun run migrate` novamente (sem sleep)

---

### CONSIDERAÇÕES GERAIS
**Consideração 01:** O teste não foi 100% entregue, pois foquei em fazer uma arquitetura de fácil ambientação para 
outros desenvolvedores (vite, docker, mailpit, etc.) e código de fácil manutenção. Do ponto que parei, agora ia fazer os 
CRUDS dentro do `/dashboard`, utilizando os componentes do `flowbite-react` e, por fim, ia refatorar e melhorar o visual como um todo.

**Consideração 02:** Como o `Node + React` não é minha stack principal de desenvolvimento, tive que pesquisar o que tem de 
melhor utilizando essas tecnologias para projetos fullstack. Só não consegui implementar o React-Query (não consegui 
resolver o ao utilizar a query, faltou tempo de estudo).

**Consideração 03:** Em um projeto com `Node.js` no backend eu jamais utilizaria o `nodemon` para a `produção`, 
pelo simples fato de ele não conseguir fazer o reload completo em error graves. Então, já deixei pronto o `pm2` no 
container caso o projeto vá para a produção.

**Consideração 04:** Eu precisei instalar `mysql2` porque o gerenciador de migrations (sequelize) utiliza esse driver. 
Por fim, decidi utilizar esse driver por toda a aplicação ao invés do driver `mysql` por vários motivos:
- O driver `mysql2` possui suporte a `prepared statements`, `ssl` e `compressão nativa em Javascript` (além de ter uma performance melhor que o driver anterior).
- O driver `mysql2` utiliza bem menos dependências que o `mysql`.
- O driver `mysql2` não possui vulnerabilidades, enquanto o driver `mysql` possui 3 moderadas: Unsafe Options, Remote Memory Exposure, SQL Injection.

**Consideração 05:** Durante o desenvolvimento eu testei várias ferramentas para estilização visual, como `styled-components`, 
`raw-css`, `tailwindcss`, `flowbite-react` e concluí que daria pra fazer o projeto inteiro apenas com `flowbite-react + tailwind css`.

**Consideração 06:** Pensando em um projeto com versionamento profissional, foi criado a tag `v1.0.0-alpha` com seu devido `Release`.

**Consideração final:** Apesar de eu não ter entregado o projeto completo, eu realmente estou satisfeito com a arquitetura 
que foi montada. Caso não dê certo essa vaga, continuarei os estudos nesse projeto para uma oportunidade futura.
