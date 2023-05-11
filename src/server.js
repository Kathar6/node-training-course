import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"

//#region routes
import usersRouter from "./routes/users.js"
import authRouter from "./routes/auth.js"
import authTokenRouter from "./routes/auth-token.js"
import authSessionRouter from "./routes/auth-session.js"
//#endregion

const app = express()

app.use(express.json()) // Format JSON payloads
app.use(express.text()) // Format Plain text payloads
app.use(cookieParser()) // Format cookies
//#region routes registration
app.use("/auth", authRouter)
app.use("/account", usersRouter)
app.use("/token", authTokenRouter)
app.use("/session", authSessionRouter)
//#endregion

/**
 * Connect to MongoDB server, then, start the express server
 * @param {number} port Server port to listen
 * @returns
 */
export const bootstrap = async (port) => {
  if (!port) return false

  await mongoose.connect(process.env.MONGODB_URL)

  app.listen(port, () => {
    console.log(`Server listening in port: ${port}`)
  })
}
