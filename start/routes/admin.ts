import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('activate/:id', 'AdminsController.activateUser')
  Route.post('add-tickets/:id', 'AdminsController.addTickets')
  Route.get('users', 'AdminsController.listUsers')
}).prefix('admin')
