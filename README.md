# API RESTful - Clínica Veterinária 🐾

Esta é uma API RESTful desenvolvida em **Node.js** com **Express**, utilizando **PostgreSQL** como banco de dados e **Sequelize** como ORM. A documentação da API foi construída com **Swagger UI**.

---

## 🔧 Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Sequelize
- Swagger UI
- Nodemon
- Dotenv
- Cors
- Docker & Docker Compose
- CI/CD (GitHub Actions)

---

## 📁 Estrutura de Pastas

```
├── config/             # Configuração do banco de dados
├── controllers/        # Lógica dos controladores
├── models/             # Modelos Sequelize
├── routes/             # Rotas da aplicação
├── docs/               # Documentação da API (SwaggerConfig.js)
├── .env                # Variáveis de ambiente
├── server.js           # Arquivo principal da aplicação
├── Dockerfile          # Dockerfile da aplicação
├── docker-compose.yml  # Orquestração dos containers
├── .github/workflows/  # Pipelines CI/CD (GitHub Actions)
└── README.md           # Este arquivo
```

---

## ⚙️ Configuração do Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/lazaaro01/clinica-veterinaria-api.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:
   ```env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=123455
   DB_NAME=clinica_veterinaria
   DB_PORT=5432
   ```

4. Rode as migrações (se necessário):
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

---

## 🐳 Executando com Docker

1. Certifique-se de ter o **Docker** e o **Docker Compose** instalados.
2. Para subir a aplicação e o banco de dados, execute:
   ```bash
   docker-compose up --build
   ```
3. O serviço estará disponível em [http://localhost:3000](http://localhost:3000).

---

## 🚀 Pipeline CI/CD

Este projeto utiliza **GitHub Actions** para automação de testes e deploy. O workflow está localizado em `.github/workflows/`.  
A pipeline executa:
- Instalação das dependências
- Execução dos testes automatizados
- Build da aplicação Docker

---

## 🧪 Testando a API

Após rodar o projeto, acesse a documentação interativa:

👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 📌 Endpoints Principais

- `GET /animais` - Lista todos os animais
- `POST /animal` - Cadastra um novo animal
- `GET /clientes` - Lista todos os clientes
- `POST /clientes` - Cadastra um novo cliente
- `GET /consultas` - Lista todas as consultas
- `POST /consultas` - Cadastra uma nova consulta

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para utilizar e modificar conforme necessário.

---

Desenvolvido com 💙 por Lázaro Vasconcelos