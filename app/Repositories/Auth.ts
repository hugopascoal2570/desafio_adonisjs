import { Response } from '@adonisjs/core/build/standalone'
import Historic from 'App/Models/Historic'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class Auth {
  public async create(request, auth, response) {
    const age = request['birthday']
    const dateString = age

    const niver: any = new Date(dateString)

    const idade = Math.floor((Date.now() - niver) / 31557600000)

    if (idade < 18) {
      return response.status(401)
    } else {
      const user = await User.create(request)

      await auth.login(user)
      return user
    }
  }

  public async login(email: string, password: string, auth) {
    const token = await auth.attempt(email, password)

    return token
  }

  public async logout(auth, response) {
    await auth.logout()
    return response.status(401)
  }

  public async showUsersAll() {
    const users = await User.query().orderBy('id', 'desc')
    return users
  }

  public async showUserById(request, response) {
    const { id } = request.only(['id'])
    const user = await User.query().where('id', id)

    if (!user) {
      return response.status(404)
    } else {
      return user
    }
  }

  public async destroyUserById(request, response) {
    const { id } = request.only(['id'])
    const user = await User.query().where('id', id).first()
    const historic = await Historic.query().where('user_id', id)

    if (historic.length !== 0) {
      return response.send(
        'Usuário possúi transações em sua conta, não é possível apagar o usuário'
      )
    } else {
      if (user) {
        user.delete()
        return response.status(204)
      }
    }
  }
}
