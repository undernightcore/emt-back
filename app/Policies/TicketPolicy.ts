import Bouncer, { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Ticket from 'App/Models/Ticket'

export default class TicketPolicy extends BasePolicy {
  public async isOwnTicket(user: User, ticket: Ticket) {
    return ticket.userId === user.id || Bouncer.deny('Este no es tu ticket bro...', 403)
  }
}
