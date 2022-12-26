import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Ticket extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public userId: number

  @belongsTo(() => User)
  public owner: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: false, autoUpdate: false })
  public activatedAt: DateTime | null
}
