# desafio_adonisjs
refazendo o desafio da empresa, em adonisjs


# Atenção
O projeto conta com os Seeders dos usuários

# Rotas 
| Rota |Método| Usuário precisa estar autenticado  | Requer Parametros no Body  |       Descrição     | 
| ------------------- | ------------------- | ---------------------  | -------------------------- |  -------------------|
|/register| POST  | X | Name, email, password,birthday | Rota para criação de usuário|
| /login| POST| X  | Email, password| Rota para autenticação de usuário|
| /logout| POST | ✔ | X  | Rota deslogar usuário|
| /users| GET | ✔ | X  | Rota para busca de todos os usuários|
| /user/:id| POST| ✔ | id do usuário  | Rota para busca um usuário específico através de seu ID|
| /user/delete/id| DELETE| ✔ | id do usuário  | Rota para deletar um usuário específico através de seu ID|
| /value/initial_balance/:value| POST| ✔ | id do usuário  | Rota para definir um valor inicial ao usuário|
| /deposit/:value| POST| ✔ | valor para depositar  | Rota para dar créditos um usuário específico através de seu ID|
| /debit/:value| POST| ✔ | valor para debitar saldo da conta  | Rota para retirar créditos um usuário específico através de seu ID |
| /refund/:value| POST| ✔ | valor para retornar saldo da conta  | Rota para retornar créditos um usuário específico através de seu ID |
| /historic/delete/:id| DELETE| ✔ | id do histórico  | Rota para deletar histórico do usuário através de seu ID|
| /export| POST| ✔ | tipo de verificação. tipos: all,monthYear ou Days  | Rota exportação do arquivo csv|
| /count/historic| POST ✔ | X  | Rota para mostrar todas as movimentações do usuário |
| /historic| POST| ✔ | X  | Rota para mostrar histórico do usuário |
| /historic/:id| POST| ✔ | ID do usuário  | Rota para mostrar histórico de um usuário através de seu ID|
