import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.unique({
        table: 'users',
        column: 'email',
      }),
      rules.email(),
    ]),
    name: schema.string([rules.required()]),
    birthday: schema.date({ format: 'yyyy-MM-dd' }),
    //birthday: schema.date(),
    password: schema.string([rules.required(), rules.minLength(6)]),
  })

  public messages: CustomMessages = {
    'name.required': 'É necessário preencher o nome',
    'name.string': 'É necessário preencher o nome com uma string',
  }
}
