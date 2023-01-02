import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  private authCodes = ['E_INVALID_AUTH_PASSWORD', 'E_INVALID_AUTH_UID', 'E_INVALID_API_TOKEN']

  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    let status = error.status ?? 500
    let errors = error.messages?.errors?.map((e) => e.message) ??
      (error.message ? [error.message] : undefined) ?? ['Ha habido un error']

    if (this.authCodes.includes(error.code)) {
      status = 401
      errors = ['Las credenciales no son correctas']
    }

    if (error.code === 'E_ROW_NOT_FOUND') {
      status = 404
      errors = ['El recurso no existe']
    }

    return ctx.response.status(status).send({ errors })
  }
}
