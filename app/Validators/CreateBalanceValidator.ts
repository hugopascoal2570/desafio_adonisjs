import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateBalanceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    value: schema.number([rules.required()]),
  })

  public messages: CustomMessages = {
    'value.required': 'É necessário informar um valor para a operação funcionar.',
  }
}
