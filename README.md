# 🚀 Blog Tech Challenge API

API REST desenvolvida em **Node.js** com **Express.js** e **PostgreSQL**, criada para o **Tech Challenge** da Pós-Tech Full Stack.

O projeto segue uma arquitetura baseada em **MVC**, utiliza **Docker** para gerenciamento do banco de dados, **Swagger (OpenAPI)** para documentação da API e **Middlewares** para validação das requisições.

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

```plaintext
blog-tech-challenge
│
├── src
│   ├── controllers
│   │   └── postsController.js
│   │
│   ├── database
│   │   └── connection.js
│   │
│   ├── docs
│   │   └── swagger.js
│   │
│   ├── middlewares
│   │   └── validarPost.js
│   │
│   ├── routes
│   │   └── postsRoutes.js
│   │
│   └── app.js
│
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

---

# ⚙️ Como Executar o Projeto

## 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/blog-tech-challenge.git
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

Copie o arquivo `.env.example` para `.env`.

No Linux/macOS:

```bash
cp .env.example .env
```

No Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

Edite o arquivo `.env` com as configurações do seu banco:

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

Verifique se o container está em execução:

```bash
docker ps
```

---

## 5. Crie a tabela

Conecte ao PostgreSQL:

```bash
docker exec -it blog_postgres psql -U postgres -d blog_db
```

Execute o comando SQL:

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

Servidor disponível em:

```
http://localhost:3000
```

---

# 📖 Documentação da API

Após iniciar a aplicação, acesse:

```
http://localhost:3000/api-docs
```

A documentação completa está disponível através do Swagger.

---

# 🔗 Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/posts` | Lista todos os posts |
| GET | `/posts/{id}` | Busca um post pelo ID |
| POST | `/posts` | Cria um novo post |
| PUT | `/posts/{id}` | Atualiza um post |
| DELETE | `/posts/{id}` | Remove um post |

---

# ✅ Validações

A API utiliza um middleware para validar os dados enviados nas operações de criação e atualização.

Campos obrigatórios:

- titulo
- conteudo
- autor

Caso algum campo não seja informado, a API retorna:

**Status**

```
400 Bad Request
```

**Resposta**

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

- ✅ CRUD completo de Posts
- ✅ Integração com PostgreSQL
- ✅ SQL parametrizado
- ✅ Arquitetura MVC
- ✅ Middlewares
- ✅ Variáveis de ambiente (.env)
- ✅ Docker
- ✅ Swagger (OpenAPI)
- ✅ Tratamento de erros
- ✅ Validação de requisições

---

# 👨‍💻 Autor

**Bruno Gonçalves Costa**

Projeto desenvolvido para o **Tech Challenge** da Pós-Tech Full Stack.
