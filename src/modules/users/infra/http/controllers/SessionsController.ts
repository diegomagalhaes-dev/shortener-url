import { Request, Response } from 'express'
import { container } from 'tsyringe'
import AuthenticateUserService from '../../../services/AuthenticateUserService'

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUser = container.resolve(AuthenticateUserService)

    const { user: _user, token } = await authenticateUser.execute({
      email,
      password,
    })

    const user = { ..._user, password: undefined }

    return response.json({ user, token })
  }
}
