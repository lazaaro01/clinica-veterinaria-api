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

---

## 📁 Estrutura de Pastas

```
├── config/             # Configuração do banco de dados
├── controllers/        # Lógica dos controladores
├── models/             # Modelos Sequelize
├── routes/             # Rotas da aplicação
├── swagger/            # Documentação da API (swagger.json)
├── .env                # Variáveis de ambiente
├── server.js              # Arquivo principal da aplicação
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