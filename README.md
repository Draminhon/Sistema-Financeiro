# Sistema Financeiro

Aplicação web para gerenciamento financeiro de pessoas e transações (receitas e despesas), composta por um frontend em React com TypeScript e uma API backend em ASP.NET Core.

## Funcionalidades

- Cadastro e exclusão de pessoas
- Registro de transações (receitas e despesas) vinculadas a pessoas cadastradas
- Regra de negócio: bloqueio de cadastro de receitas para menores de 18 anos
- Consulta de totais por pessoa com ordenação e paginação
- Resumo geral com receitas totais, despesas e saldo líquido

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes do Node)
- .NET SDK (versão 9.0 ou 10.0)

---

## Como Rodar o Projeto

### 1. Backend (API ASP.NET Core)

O código da API backend está armazenado na branch `backend`.

1. Clone o repositório e acesse a branch `backend`:

```bash
git clone https://github.com/Draminhon/Sistema-Financeiro.git
cd Sistema-Financeiro
git checkout backend
```

2. Restaure as dependências do projeto:

```bash
dotnet restore
```

3. Execute a aplicação backend:

```bash
dotnet run
```

A API estará em execução nos endereços:
- HTTPS: `https://localhost:7081`
- HTTP: `http://localhost:5116`

---

### 2. Frontend (React + TypeScript)

1. Em uma nova janela de terminal, navegue até a pasta da aplicação frontend:

```bash
cd controle_financeiro
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra o navegador no endereço informado pelo Vite (geralmente `http://localhost:5173`).

---

## Endpoints da API

### Pessoas (`/person`)

- `POST /person`: Cadastra uma pessoa. Corpo: `{ "name": "Nome", "age": 25 }`
- `GET /person`: Lista todas as pessoas.
- `DELETE /person/{id}`: Remove uma pessoa pelo ID.

### Transações (`/transaction`)

- `POST /transaction`: Cadastra uma transação. Corpo: `{ "type": "receita", "description": "Descrição", "value": 100.0, "personId": 1 }`
- `GET /transaction`: Lista todas as transações.

*Nota: A API impede o cadastro de receitas para pessoas com menos de 18 anos.*

---

## Scripts Disponíveis (Frontend)

- `npm run dev`: Inicia a aplicação em modo de desenvolvimento.
- `npm run build`: Compila a aplicação para produção.
- `npm run preview`: Visualiza a compilação localmente.

---

## Tecnologias Utilizadas

### Frontend
- React 19
- TypeScript
- Vite
- CSS

### Backend
- .NET 10 (ASP.NET Core Web API)
- Entity Framework Core (SQLite)
- SQLite (`financeiro.db`)


