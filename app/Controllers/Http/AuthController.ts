import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterValidator from 'App/Validators/RegisterValidator'
import User from 'App/Models/User'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const data = await request.validate(RegisterValidator)
    const user = await User.create(data)
    return response.created({
      message: `¡Un último paso ${user.name}! Avisa a un administrador para poder utilizar tu cuenta lo antes posible.`,
    })
  }
}
