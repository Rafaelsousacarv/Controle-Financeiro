# Sistema de Controle Financeiro API RESTful


## Visão Geral

Este é um projeto de API REST que oferece funcionalidades para gerenciar transações financeiras e categorias relacionadas. Ele permite que os usuários se cadastrem, façam login e realizem operações como adicionar, listar, atualizar e excluir transações financeiras, bem como listar categorias e obter um extrato financeiro.

## Recursos 
- Registro de usuário
- Autenticação de usuário
- Operações de transações financeiras:
   - Adicionar uma nova transação
   - Listar todas as transações do usuário
   - Atualizar uma transação existente
   - Excluir uma transação
   - Obter detalhes de uma transação específica
- Listagem de categorias
- Obtenção de extrato financeiro (total de entrada e saída)

##  Tecnologias Utilizadas
- Node.js
- Express.js
- PostgreSQL
- Bcrypt para criptografia de senhas
- JSON Web Tokens (JWT) para autenticação
- Nodemon para desenvolvimento

## Como Usar
#### Pré-requisitos
- Certifique-se de ter o Node.js instalado na sua máquina.
- Configure um banco de dados PostgreSQL e atualize as informações de configuração no arquivo de configuração do banco de dados, se necessário.
#### Instalação
1. Clone o repositório:
```bash
git clone git@github.com:Rafaelsousacarv/Controle-Financeiro.git
```

2. Navegue até a pasta do projeto:
```bash
cd Controle-Financeiro
```
3. Instale as dependências:
```bash
npm install
```

4. Atualize o arquivo dadosSensiveisExemplo.js para dadosSensiveis.js com as informações de acesso do seu banco de dados.

5. Inicialize o servidor de desenvolvimento:
```bash
npm run dev
```

### Uso
- Certifique-se de que o servidor está em execução.
- Use ferramentas como o Postman ou faça solicitações HTTP para a API nos endpoints correspondentes.
- Consulte a documentação da API para obter detalhes sobre como usar cada recurso.

## Endpoints da API

### Autenticação de Usuário

- **POST /usuario**: Cria um novo usuário no sistema.
- **POST /login**: Realiza o login do usuário com base nas credenciais fornecidas.

### Gerenciamento de Usuários

- **GET /usuario**: Obtém detalhes do usuário autenticado.
- **PUT /usuario**: Atualiza os detalhes do usuário autenticado.

### Transações Financeiras

- **GET /transacao**: Lista todas as transações do usuário autenticado.
- **GET /transacao/extrato**: Obtém o extrato financeiro do usuário autenticado.
- **GET /transacao/:id**: Obtém detalhes de uma transação específica.
- **POST /transacao**: Adiciona uma nova transação.
- **PUT /transacao/:id**: Atualiza uma transação existente.
- **DELETE /transacao/:id**: Exclui uma transação.

### Categorias Financeiras

- **GET /categoria**: Lista todas as categorias financeiras disponíveis.

### Middlewares

- **Middleware de Autenticação**: Verifica se o usuário está autenticado antes de acessar os endpoints protegidos.
- **Middlewares de Validação**: Realiza a validação dos dados de entrada para garantir que estão corretos antes de processá-los.
