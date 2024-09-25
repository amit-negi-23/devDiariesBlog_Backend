import jwt from "jsonwebtoken";
import {
  apiResponseSuccess,
  apiResponseErr,
} from "../middlewares/apiResponse.js";

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    // console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];

    // console.log(token);
    if (!token) {
      return res
        .status(401)
        .send(
          apiResponseErr(
            null,
            false,
            401,
            "Token not found"
          )
        );
    }

    const result = verifyAccessToken(token);
    // console.log(result);
    if (!result.success) {
      return res
        .status(403)
        .send(
          apiResponseErr(null, false, 403, "You are not authorized - Unauthorized Access")
        );
    }

    req.user = result.data;
  } catch (error) {
    return res
      .status(400)
      .send(apiResponseErr(null, false, 400, error.message));
  }
  next();
};

function verifyAccessToken(token) {
  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    const decoded = jwt.verify(token, secretKey);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export { authenticateToken };
