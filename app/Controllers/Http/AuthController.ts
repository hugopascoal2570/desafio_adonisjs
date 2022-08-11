import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Auth from 'App/Repositories/Auth'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import RequiredIdValidator from 'App/Validators/RequiredIdValidator'
const authRepository = new Auth()

export default class AuthController {
  public async register({ auth, request, response }: HttpContextContract) {
    await request.validate(CreateUserValidator)
    const token = await authRepository.create(request.body(), auth, response)

    return token
  }

  public async login({ request, auth }: HttpContextContract) {
    const { email, password } = request.all()
    const token = await authRepository.login(email, password, auth)

    return token
  }

  public async logout({ auth, response }: HttpContextContract) {
    await authRepository.logout(auth, response)

    return response.ok('Usuário deslogado com sucesso')
  }

  public async findByusers() {
    const users = await authRepository.showUsersAll()

    return users
  }

  public async findUserById({ request, response }: HttpContextContract) {
    await request.validate(RequiredIdValidator)
    const user = await authRepository.showUserById(request, response)

    return user
  }

  public async DeleteUserById({ request, response }: HttpContextContract) {
    await request.validate(RequiredIdValidator)
    const user = await authRepository.destroyUserById(request, response)

    return user
  }
}
