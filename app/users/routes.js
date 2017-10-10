import controller from './controller'

export function setup(router) {
  //router.get('/', (req,res) => {res.send('Hello World')})

  router
    .get('/', controller.getAll)  //getAll in controller
    .get('/:id', controller.get)  //get in controller and send user's id 
    .post('/', controller.create)
}
