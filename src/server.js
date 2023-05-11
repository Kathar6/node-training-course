import express from "express";
import cookieParser from "cookie-parser";

//#region routes
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import authTokenRouter from "./routes/auth-token.js";
import authSessionRouter from "./routes/auth-session.js";
//#endregion

const app = express();

app.use(express.json()); // Format JSON payloads
app.use(express.text()); // Format Plain text payloads
app.use(cookieParser()); // Format cookies
//#region routes registration
app.use("/auth", authRouter);
app.use("/account", usersRouter);
app.use("/token", authTokenRouter);
app.use("/session", authSessionRouter);
//#endregion

export const start = (port) => {
  if (!port) return false;
  app.listen(port, () => {
    console.log(`Server listening in port: ${port}`);
  });
};
