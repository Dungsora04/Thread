import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // The cookie cannot be accessed by client-side scripts
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: "strict", // The cookie is sent only to the same site as the request (CSRF protection)
  });

  return token;
};

export default generateTokenAndSetCookie;
