# desafio_adonisjs
refazendo o desafio da empresa, em adonisjs


# Atenção
O projeto conta com os Seeders dos usuários

# Rotas 
| Rota |Método| Usuário precisa estar autenticado  | Requer Parametros no Body  |       Descrição     | 
| ------------------- | ------------------- | ---------------------  | -------------------------- |  -------------------|
|/register| POST  | X | Name, email, password,birthday | Rota para criação de usuário|
| /auth| POST| X  | Email, password, device_name| Rota para autenticação de usuário|
| /api/users| GET | ✔ | X  | Rota para busca de todos os usuários|
| /api/user/id| POST| ✔ | id do usuário  | Rota para busca um usuário específico através de seu ID|
| /api/delete/id| DELETE| ✔ | id do usuário  | Rota para deletar um usuário específico através de seu ID|
| /api/deposit/value| POST| ✔ | valor para depositar  | Rota para dar créditos um usuário específico através de seu ID|
| /api/debit/value| POST| ✔ | valor para debitar saldo da conta  | Rota para retirar créditos um usuário específico através de seu ID |
| /api/refund/value| POST| ✔ | valor para retornar saldo da conta  | Rota para retornar créditos um usuário específico através de seu ID |
| /api/values/user/id| POST| ✔ | ID do usuário | Rota para retornar os valores de um usuário específico através de seu ID |
| /api/historic| GET| ✔ | X  | Rota para mostrar histórico do usuário |
| /api/delete/historic/id| DELETE| ✔ | id do histórico  | Rota para deletar histórico do usuário|
| /api/search/historic/all/| POST| ✔ | id do usuário  | Rota para exibir histórico do usuário em csv (apenas todas as requisições)|
