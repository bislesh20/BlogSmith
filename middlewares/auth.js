const { validateToken } = require("../services/auth");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      req.user = null;
      res.locals.user = null;
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      res.locals.user = userPayload; // makes user available in EJS
    } catch (error) {
      console.error("Invalid or expired token:", error.message);
      req.user = null;
      res.locals.user = null;
      res.clearCookie(cookieName); // clear invalid token
    }

    return next();
  };
}

module.exports = { checkForAuthenticationCookie };
