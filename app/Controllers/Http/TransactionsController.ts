import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Repositories/Transaction'
import CreateBalanceValidator from 'App/Validators/CreateBalanceValidator'
import RequiredIdValidator from 'App/Validators/RequiredIdValidator'

const transactionRepository = new Transaction()

export default class TransactionsController {
  public async deposit({ request, auth }: HttpContextContract) {
    await request.validate(CreateBalanceValidator)
    const result = await transactionRepository.depositValue(request, auth)
    return result
  }

  public async debit({ request, auth, response }: HttpContextContract) {
    await request.validate(CreateBalanceValidator)
    const result = await transactionRepository.debitValue(request, auth, response)
    return result
  }
  public async refund({ request, auth, response }: HttpContextContract) {
    await request.validate(CreateBalanceValidator)
    const result = await transactionRepository.refundValue(request, auth, response)
    return result
  }

  public async showValues({ request, response }: HttpContextContract) {
    const result = await transactionRepository.showAllValues(request, response)
    return result
  }

  public async createInitialBalance({ request, auth }: HttpContextContract) {
    await request.validate(CreateBalanceValidator)
    const result = await transactionRepository.storeInitialBalance(request, auth)
    return result
  }
  public async deleteHistoric({ request, response }: HttpContextContract) {
    await request.validate(RequiredIdValidator)
    const result = await transactionRepository.deleteHistoricById(request, response)
    return result
  }

  public async export({ request, auth, response }: HttpContextContract) {
    const result = await transactionRepository.exportHistorics(request, auth, response)
    return result
  }

  public async historicAll({ response }: HttpContextContract) {
    const result = await transactionRepository.getHistoric(response)
    return result
  }

  public async countHistoric({ auth, response }: HttpContextContract) {
    const result = await transactionRepository.countHistoricUser(auth, response)
    return result
  }
}
