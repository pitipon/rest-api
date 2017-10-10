console.log(process.env.SECRET_KEY)
export default {
  port: process.env.port || 80,
  /*secretKey: process.env.SECRET_KEY*/
  secretKey: 'cat'
}
