import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'Hugo Pascoal',
        email: 'hugo_pascoal_@hotmail.com',
        birthday: new Date('2015-01-04'),
        password: '123456',
      },
      {
        name: 'Usuário dois',
        email: 'usuario_dois@hotmail.com',
        birthday: new Date('2015-01-04'),
        password: '123456',
      },
    ])
  }
}
