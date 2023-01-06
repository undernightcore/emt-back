import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import Ticket from 'App/Models/Ticket'

export default class TicketsController {
  public async getList({ request, response, auth, bouncer }: HttpContextContract) {
    const user = await auth.authenticate()
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    await bouncer.with('GlobalPolicy').authorize('isActivated')
    const tickets = await user
      .related('tickets')
      .query()
      .where('expires_at', '>', DateTime.now().toJSDate())
      .andWhere((query) => {
        query
          .where('activated_at', '>', DateTime.now().minus({ hour: 1 }).toJSDate())
          .orWhereNull('activated_at')
      })
      .orderBy('activated_at', 'asc')
      .paginate(page, perPage)
    return response.ok(tickets)
  }

  public async getHistory({ request, response, auth, bouncer }: HttpContextContract) {
    const user = await auth.authenticate()
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    await bouncer.with('GlobalPolicy').authorize('isActivated')
    const tickets = await user
      .related('tickets')
      .query()
      .where('activated_at', '<=', DateTime.now().minus({ hour: 1 }).toJSDate())
      .orderBy('activated_at', 'desc')
      .paginate(page, perPage)
    return response.ok(tickets)
  }

  public async activate({ response, auth, bouncer, params }: HttpContextContract) {
    await auth.authenticate()
    const ticket = await Ticket.findOrFail(params.id)
    await bouncer.with('TicketPolicy').authorize('isOwnTicket', ticket)
    if (ticket.activatedAt)
      return response.status(400).send({ errors: ['Este ticket ya está activado.'] })
    if (ticket.expiresAt <= DateTime.now())
      return response.status(400).send({ errors: ['Este ticket ya ha caducado.'] })
    ticket.activatedAt = DateTime.now()
    await ticket.save()
    return response.ok({ message: 'Se ha activado tu ticket' })
  }

  public async get({ response, auth, bouncer, params }: HttpContextContract) {
    await auth.authenticate()
    const ticket = await Ticket.findOrFail(params.id)
    await bouncer.with('TicketPolicy').authorize('isOwnTicket', ticket)
    if (!ticket.activatedAt)
      return response.status(400).send({ errors: ['Este ticket no está activado.'] })
    if (
      ticket.expiresAt <= DateTime.now() ||
      ticket.activatedAt <= DateTime.now().minus({ hour: 1 })
    )
      return response.status(400).send({ errors: ['Este ticket ya ha caducado.'] })
    return response.ok(ticket)
  }
}
