import { Request, Response, NextFunction } from 'express'

import { verify } from 'jsonwebtoken'
import { authConfig } from '../../../../../config/auth'

interface JwtPayload {
  iat: number
  exp: number
  sub: string
}

export default function determinePersistence(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization

  if (authHeader) {
    const [, token] = authHeader.split(' ')

    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as JwtPayload

    request.user = {
      id: sub,
    }
  }

  return next()
}
