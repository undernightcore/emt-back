import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class AdminsController {
  public async activateUser({ request, response, auth, bouncer, params }: HttpContextContract) {
    await auth.authenticate()
    await bouncer.with('GlobalPolicy').authorize('isAdmin')
    const user = await User.findOrFail(params.id)
    const newStatus = request.input('activate', true)
    user.activated = newStatus
    await user.save()
    return response.ok({
      message: newStatus ? `¡Has activado a ${user.name}!` : `¡Has desactivado a ${user.name}!`,
    })
  }

  public async addTickets({ request, response, auth, bouncer, params }: HttpContextContract) {
    await auth.authenticate()
    await bouncer.with('GlobalPolicy').authorize('isAdmin')
    const amount = request.input('amount', 1)
    const user = await User.findOrFail(params.id)
    const newTickets = Array(amount).fill({
      expiresAt: DateTime.now().plus({ month: 6 }).toJSDate(),
    })
    await user.related('tickets').createMany(newTickets)
    return response.created({
      message: `Se han creado ${params.amount ?? 1} tickets para ${user.name}`,
    })
  }

  public async listUsers({ request, response, auth, bouncer }: HttpContextContract) {
    await auth.authenticate()
    await bouncer.with('GlobalPolicy').authorize('isAdmin')
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const search = request.input('search', '')
    const activated = request.input('activated', false)
    const users = await User.query()
      .where('activated', activated)
      .andWhereILike('name', `%${search}%`)
      .paginate(page, perPage)
    return response.ok(users)
  }
}
