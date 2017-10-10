import usersModel from '../users/model'
import sessionsSerializer from './serializer'

const SessionsController = {
  create(req, res) {
    const {email, password} = req.body

    const user = usersModel.findByEmail(email)

    usersModel.verify(user,password).then(isValid => {
      if(isValid) {
        res
          .header('Authorization', `Bearer ${usersModel.genToken(user)}`)
          .status(201)
          .json({user: sessionsSerializer.for('create', user)})
      } else {
        res
          .status(401)
          .json({
            user: {
              errors: ['Invalid credentials.']
            }
          })
      }
    })
  }
}

export default SessionsController
