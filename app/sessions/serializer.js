import serializer from '../serializer'

const SessionsSerializer = {
  ...serializer,

  create(user) {
    const {id,email,isAdmin} = user

    return {id,email,isAdmin}
  }
}

export default SessionsSerializer
