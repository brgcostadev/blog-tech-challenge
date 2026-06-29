````md
# 🚀 Blog Tech Challenge API

API REST desenvolvida em **Node.js** com **Express** e **PostgreSQL**, criada para o **Tech Challenge** da Pós-Tech Full Stack.

O projeto segue uma arquitetura baseada em **MVC**, utiliza **Docker** para o banco de dados, **Swagger** para documentação da API e **Middlewares** para validação das requisições.

---

# 📚 Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL
- Docker
- Swagger (OpenAPI)
- Dotenv
- Nodemon

---

# 🏛️ Arquitetura

O projeto foi organizado seguindo o padrão MVC.

```text
src
│
├── controllers
│   └── postsController.js
│
├── database
│   └── connection.js
│
├── docs
│   └── swagger.js
│
├── middlewares
│   └── validarPost.js
│
├── routes
│   └── postsRoutes.js
│
└── app.js
```

---

# ⚙️ Instalação

## 1. Clone o repositório

```bash
git clone https://github.com/brgcostadev/blog-tech-challenge.git
```

Entre na pasta do projeto.

```bash
cd blog-tech-challenge
```

---

## 2. Instale as dependências

```bash
npm install
```

---

## 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo.

```bash
cp .env.example .env
```

Configure o arquivo `.env`.

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=blog_db
```

---

## 4. Inicie o PostgreSQL com Docker

```bash
docker compose up -d
```

Verifique se o container está em execução.

```bash
docker ps
```

---

## 5. Crie a tabela

Conecte ao banco.

```bash
docker exec -it blog_postgres psql -U postgres -d blog_db
```

Execute:

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    autor VARCHAR(100) NOT NULL
);
```

---

## 6. Execute a aplicação

```bash
npm run dev
```

Servidor:

```text
http://localhost:3000
```

---

# 📖 Documentação

Após iniciar a aplicação, acesse:

```text
http://localhost:3000/api-docs
```

Toda a documentação da API estará disponível através do Swagger.

---

# 🔗 Endpoints

## Buscar todos os posts

```http
GET /posts
```

---

## Buscar post por ID

```http
GET /posts/{id}
```

---

## Criar post

```http
POST /posts
```

Exemplo:

```json
{
  "titulo": "Meu primeiro post",
  "conteudo": "Conteúdo do post",
  "autor": "Bruno"
}
```

---

## Atualizar post

```http
PUT /posts/{id}
```

Exemplo:

```json
{
  "titulo": "Post atualizado",
  "conteudo": "Novo conteúdo",
  "autor": "Bruno"
}
```

---

## Excluir post

```http
DELETE /posts/{id}
```

---

# ✅ Validações

A API possui middleware para validação dos dados enviados.

Campos obrigatórios:

- titulo
- conteudo
- autor

Caso algum campo não seja enviado, a API retorna:

```http
400 Bad Request
```

Resposta:

```json
{
    "mensagem": "Campos obrigatórios não informados.",
    "camposFaltando": [
        "autor"
    ]
}
```

---

# 📌 Funcionalidades

- CRUD completo de Posts
- Integração com PostgreSQL
- SQL parametrizado
- Arquitetura MVC
- Middlewares
- Variáveis de ambiente (.env)
- Docker
- Swagger
- Tratamento de erros
- Validação de requisições

---

# 👨‍💻 Autor

Desenvolvido por **Bruno Gonçalves Costa** para o Tech Challenge da Pós-Tech Full Stack.
````
