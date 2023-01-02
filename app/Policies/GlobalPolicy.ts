import Bouncer, { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class GlobalPolicy extends BasePolicy {
  public async isActivated(user: User) {
    return user.activated || user.admin
      ? true
      : Bouncer.deny('Tu usuario aún no ha sido activado, lo siento.', 403)
  }

  public async isAdmin(user: User) {
    return user.admin ? true : Bouncer.deny('Pero que haces?! Que no eres admin!', 403)
  }
}
