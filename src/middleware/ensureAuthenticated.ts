import { NextFunction, Request, response, Response } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string
}

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({
      error: "Invalid token"
    })
  }

  const [, token] = authToken.split(" ")

  try {

    const { sub } = verify(token, process.env.JWT_SECRET_KEY) as IPayload
    req.user_id = sub

    return next()
  } catch (error) {
    return response.status(401).json({
      error: "Expired token!"
    })
  }
}
