import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('', 'TicketsController.getList')
  Route.get('history', 'TicketsController.getHistory')
  Route.post(':id/activate', 'TicketsController.activate')
  Route.get(':id', 'TicketsController.get')
}).prefix('tickets')
