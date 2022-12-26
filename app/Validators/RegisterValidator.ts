import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    name: schema.string({}, [rules.minLength(3)]),
    password: schema.string({}, [rules.minLength(8)]),
  })

  public messages: CustomMessages = {
    'email.required': 'Necesitamos un correo para darte de alta.',
    'email.email': 'Esto no es un correo valido, lo siento.',
    'email.unique': 'Ya tienes una cuenta con ese correo electrónico.',
    'name.required': 'Necesitamos que nos des un nombre para poder saber quien eres.',
    'name.minLength': 'Porfa danos tu nombre real.',
    'password.required': 'Danos una contraseña para poder identificarte.',
    'password.minLength': 'Tu contraseña debe tener al menos 8 carácteres.',
  }
}
