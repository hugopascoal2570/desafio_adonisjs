import Route from '@ioc:Adonis/Core/Route'
import TransactionsController from 'App/Controllers/Http/TransactionsController'

Route.get('/', async () => {
  return { hello: 'home' }
})

Route.post('/login', 'AuthController.login')
Route.post('/register', 'AuthController.register')

Route.group(() => {
  Route.post('/logout', 'AuthController.logout')

  // Criar um endpoint para listagem desses usuários, ordernados por ordem de cadastro decrescente (mais novo para mais antigo);
  Route.get('/users', 'AuthController.findByusers')

  // Criar um endpoint para listar um único usuário através do seu id;
  Route.post('/user/:id', 'AuthController.findUserById')

  // No endpoint que exclui um usuário, adicionar a funcionalidade que agora não será mais possível excluir um usuário que tenha qualquer tipo de movimentação ou saldo;
  Route.delete('/user/delete/:id', 'AuthController.DeleteUserById')

  // Adicionar dentro do usuário um campo para saldo inicial, e criar um endpoint para alterar esse valor
  Route.post('/value/initial_balance/:value', 'TransactionsController.createInitialBalance')

  // Criar um endpoint ou endpoint`s onde é possível associar uma operação de débito, crédito ou estorno para o usuário;
  Route.post('/deposit/:value', 'TransactionsController.deposit')
  Route.post('/debit/:value', 'TransactionsController.debit')
  Route.post('/refund/:value', 'TransactionsController.refund')

  // Criar um endpoint onde seja possível excluir uma movimentação relacionada a um usuário;
  Route.delete('/value/delete/:id', 'TransactionsController.deleteHistoric')

  //rotas de export
  Route.post('/export/', 'TransactionsController.export')

  // Criar um endpoint com a soma de todas as movimentações (débito, crédito e estorno) mais o saldo inicial do usuário;
  Route.post('/count/historic', 'TransactionsController.countHistoric')

  // Criar um endpoint onde seja possível visualizar toda a movimentação (páginada) do usuários mais as suas informações pessoais;
  Route.post('/historic/', 'TransactionsController.historicAll')

  //Criar um endpoint com a soma de todas as movimentações (débito, crédito e estorno) mais o saldo inicial do usuário pelo seu id
  Route.post('/historic/:id', 'TransactionsController.showValues')
}).middleware('auth')
