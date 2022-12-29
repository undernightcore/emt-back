import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.minLength(8)]),
  })

  public messages: CustomMessages = {
    'email.required': 'Necesitamos un correo para iniciar sesión.',
    'email.email': 'Esto no es un correo valido, lo siento.',
    'password.required': 'Danos una contraseña para poder identificarte.',
    'password.minLength': 'Tu contraseña debe tener al menos 8 carácteres.',
  }
}
