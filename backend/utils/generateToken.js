import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in miliseconds
    httpOnly: true, // prevents XSS attacks cross-site scripting attacks, not accessible via JavaScript
    sameSite: true, // prevents CSRF attacks cross-site request forgery attacks, only allows requests from the same origin
    secure: process.env.NODE_ENV !== "development", // cookie only sent in HTTPS in production
  });
};

export default generateTokenAndSetCookie;
