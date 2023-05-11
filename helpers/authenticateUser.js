import { sessions } from "../src/controllers/auth-session.js";

/**
 * Search through the active session and find if the sessionID exists
 * @param {string} sessionID
 * @returns {false | {
 *  sessionid: string,
 *  guid: string
 * }} response
 */
const validateSessionID = (sessionID) => {
  if (!sessionID) return false;

  console.log(sessions);
  const sessionIDFound = sessions.find(
    (session) => session.sessionID === sessionID
  );

  if (!sessionIDFound) return false;

  return sessionIDFound;
};

export default validateSessionID;
