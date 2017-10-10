import userModel from './model'
import usersSerializer from './serializer'

const UsersController = {
  getAll(req, res) {
    res.json(
      {users: usersSerializer.for('getAll', userModel.findAll()) }
    )
  },

  get(req, res){
    res.json(
      { user: usersSerializer.for('get', userModel.find(req.params.id)) }
    )
  },

  create(req, res) {
    const {email,password} = req.body

    userModel.create(email,password).then(
      user => {
        res
          .header('Authorization', `Bearer ${userModel.genToken(user)}`)
          .status(201)
          .json({user: usersSerializer.for('create', user)})
      }
    )
  }
}

export default UsersController
