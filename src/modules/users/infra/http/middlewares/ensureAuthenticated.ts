import { Request, Response, NextFunction } from 'express'
import { authConfig } from '@config/auth'

import AppError from '@shared/errors/AppError'
import { verify } from 'jsonwebtoken'

interface JwtPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT Token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  const decoded = verify(token, authConfig.jwt.secret)

  const { sub } = decoded as JwtPayload

  request.user = {
    id: sub,
  }
  return next()
}
