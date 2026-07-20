# Sistema Financeiro

Aplicação web em React e TypeScript para gerenciamento financeiro de pessoas e transações (receitas e despesas).

## Funcionalidades

- Cadastro e exclusão de pessoas
- Registro de transações (receitas e despesas) vinculadas a pessoas cadastradas
- Regra de negócio para bloqueio de receitas para menores de 18 anos
- Consulta de totais por pessoa com ordenação e paginação
- Resumo geral com receitas totais, despesas e saldo líquido

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes do Node)
- API Backend (ASP.NET Core) rodando localmente em `https://localhost:7081`

## Como rodar o projeto

1. Clone este repositório para a sua máquina:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

2. Acesse a pasta do projeto:

```bash
cd y
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Abra o navegador e acesse o endereço informado pelo Vite no terminal (geralmente `http://localhost:5173`).

## Scripts Disponíveis

- `npm run dev`: inicia a aplicação em modo de desenvolvimento
- `npm run build`: compila a aplicação para produção
- `npm run preview`: visualiza a versão de compilação localmente

## Tecnologias Utilizadas

- React 19
- TypeScript
- Vite
- CSS
