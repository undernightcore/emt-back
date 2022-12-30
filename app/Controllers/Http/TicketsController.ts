import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'

export default class TicketsController {
  public async getList({ request, response, auth, bouncer }: HttpContextContract) {
    const user = await auth.authenticate()
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    await bouncer.with('GlobalPolicy').authorize('isActivated')
    const tickets = await user
      .related('tickets')
      .query()
      .where('expiresAt', '>', DateTime.now().toJSDate())
      .andWhere('activatedAt', '<', DateTime.now().plus({ hour: 1 }).toJSDate())
      .paginate(page, perPage)
    return response.ok(tickets)
  }
}
