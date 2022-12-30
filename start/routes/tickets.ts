import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'TicketsController.getList')
}).prefix('tickets')
