import dotenv from 'dotenv'
dotenv.config()
const config = {
    jwt_SECRET : process.env.jwt_SECRET,
    jwt_EXPIRY : process.env.jwt_EXPIRY|| "30d",
}
export default config