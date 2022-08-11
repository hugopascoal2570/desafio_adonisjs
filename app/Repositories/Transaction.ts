import { DateTime } from 'luxon'
import UserModel from '../Models/User'
import xl from 'excel4node'
import HistoricModel from 'App/Models/Historic'
import User from '../Models/User'
import Database from '@ioc:Adonis/Lucid/Database'
import RequiredIdValidator from 'App/Validators/RequiredIdValidator'

export default class Transaction {
  public async depositValue(request, auth) {
    const total = request.only(['value'])
    const value = await UserModel.find(auth.user.id)

    if (value) {
      const totalBefore = value.amount
      value.amount += total.value
      value.merge(value)
      await value.save()
      const totalAfter = value.amount

      const historic = await HistoricModel.create({
        type: 'C',
        total_after: totalAfter,
        total_before: totalBefore,
        userId: auth.user!.id,
      })
    }
    return value
  }

  public async debitValue(request, auth, response) {
    const total = request.only(['value'])
    const value = await UserModel.find(auth.user.id)

    if (value) {
      if (value.amount < total.value) {
        return response.status(204)
      } else {
        const totalBefore = value.amount
        value.amount -= total.value
        value.merge(value)
        await value.save()
        const totalAfter = value.amount

        const historic = await HistoricModel.create({
          type: 'D',
          total_after: totalAfter,
          total_before: totalBefore,
          userId: auth.user!.id,
        })
        return value
      }
    } else {
      return response.status(404)
    }
  }

  public async refundValue(request, auth, response) {
    const total = request.only(['value'])
    const value = await UserModel.find(auth.user.id)

    if (value) {
      if (value.amount < total.value) {
        return response.status(204)
      } else {
        const totalBefore = value.amount
        value.amount += total.value
        value.merge(value)
        await value.save()
        const totalAfter = value.amount

        const historic = await HistoricModel.create({
          type: 'R',
          total_after: totalAfter,
          total_before: totalBefore,
          userId: auth.user!.id,
        })
        return value
      }
    } else {
      return response.status(404)
    }
  }

  public async showAllValues(request, response) {
    const id = request.only(['id'])
    await request.validate(RequiredIdValidator)
    const showAllValuesById = await UserModel.query().where('id', id).preload('historic').first()

    if (showAllValuesById) {
      return showAllValuesById
    } else {
      return response.status(404)
    }
  }

  public async storeInitialBalance(request, auth) {
    const { value } = request.all()
    const initialBalance = await UserModel.find(auth.user.id)

    if (initialBalance) {
      if (initialBalance.amount === 0) {
        initialBalance.merge({
          balance_initial: value,
          amount: value,
        })
      } else {
        initialBalance.merge({
          balance_initial: value,
        })
      }
      return await initialBalance.save()
    }
  }

  public async deleteHistoricById(request, response) {
    const { id } = request.only(['id'])
    if (!id) {
      return response.send('insira um id de histórico')
    }
    const deleteHistoric = await HistoricModel.query().where('id', id).first()

    if (deleteHistoric) {
      deleteHistoric.delete()
      return response.status(204)
    } else {
      return response.status(404)
    }
  }

  public async getHistoric(response) {
    const data = await HistoricModel.query().preload('user')

    if (data) {
      return data
    } else {
      return response.status(404)
    }
  }

  public async countHistoricUser(auth, response) {
    const data = await UserModel.query()
      .where('id', auth.user.id)
      .select('amount')
      .select('balance_initial')

    if (data) {
      return data
    } else {
      return response.status(404)
    }
  }

  public async exportHistorics(request, auth, response) {
    const xl = require('excel4node')
    const wb = new xl.Workbook()
    const ws = wb.addWorksheet('Worksheet Name')
    let data: any
    let type = ''
    let historics = new Array()

    let filter = request.all()

    if (filter.all) {
      //all
      data = await HistoricModel.query().where('user_id', auth.user.id).preload('user')
    } else if (filter.days) {
      //days
      let previous = new Date()
      let actual = new Date()
      previous.setDate(actual.getDate() - filter.days)
      data = await HistoricModel.query()
        .where('user_id', auth.user.id)
        .where('created_at', '>', previous)
        .preload('user')
    } else if (filter && filter.monthYear) {
      //monthYear
      let values = filter.monthYear.split('/')
      let month = values[0]
      let year = values[1]
      let search: any = year + '-' + month
      data = await HistoricModel.query()
        .where('user_id', auth.user.id)
        .where((builder) => {
          builder.where('created_at', 'like', `%${search}%`)
        })
        .preload('user')
    }
    //create csv
    if (data && data.length === 0) {
      return response.status(404).send('Nenhuma movimentação para exibir.')
    } else {
      const headingColumnNames = [
        'Nome do Usuário',
        'tipo da transação',
        'data da operação',
        'saldo inicial',
        'saldo final',
        'saldo atual',
        'email do usuário',
      ]

      for (let i in data) {
        if (data[i].type === 'C') {
          type = 'Crédito'
        } else if (data[i].type === 'D') {
          type = 'Débito'
        } else if (data[i].type === 'R') {
          type = 'Estorno'
        }

        historics[i] = {
          'Nome de Usuário': `${data[i].user.name}`,
          'Tipo de Operação': `${type}`,
          'Data Operação': `${data[i].createdAt}`,
          'Saldo Inicial': `R$: ${data[i].total_before}`,
          'Saldo Final': `R$: ${data[i].total_after}`,
          'Saldo Atual': `R$: ${data[i].user.amount}`,
          'Email': `${data[i].user.email}`,
        }
      }
      let headingColumnIndex = 1
      headingColumnNames.forEach((heading) => {
        ws.cell(1, headingColumnIndex++).string(heading)
      })

      let rowIndex = 2
      historics.forEach((record) => {
        let columnIndex = 1
        Object.keys(record).forEach((columnName) => {
          ws.cell(rowIndex, columnIndex++).string(record[columnName])
        })
        rowIndex++
      })

      wb.write('ArquivoExcel.csv')
    }
  }
}
