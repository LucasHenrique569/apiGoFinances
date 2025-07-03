# API GoFinances

Este projeto visa criar uma API para integrar uma aplicação Web e um aplicativo Mobile sobre controle de transações de entrada e saída.

## Sobre

A ideia desta API é permitir que usuários cadastrem e visualizem informações sobre suas transações financeiras, tanto na aplicação Web como no aplicativo Mobile.

## Funcionalidades

- Cadastro de transações de entrada e saída
- Listagem de transações de entrada e saída
- Listagem do total arrecadado com transações de entrada, filtradas pelo mês atual
- Listagem do total arrecadado com transações de saída, filtradas pelo mês atual
- Listagem da data de uma transação de entrada mais recente, filtrada pelo mês atual
- Listagem da data de uma transação de saída mais recente, filtrada pelo mês atual
- Resumo por categoria do valor total arrecado com transações de entrada, filtradas por um mês e um ano passados por parâmetro

## Tecnologias

- Node.js
- PostgresSQL

## Instalação

1. Clone o repositório:
- git clone https://github.com/LucasHenrique569/apiGoFinances.git

2. Instale as dependências:
- cd apiGoFinances
- npm i

3. Configure as variáveis de ambiente com base no arquivo ".env.example"

4. Crie a tabela no SGBD PostgresSQL usando o arquivo "script_criacao_banco"

5. Inicie o servidor:
- node app.js

Feito por [Lucas Henrique](https://github.com/LucasHenrique569) ✌

