import { container } from 'tsyringe'

import '../../modules/users/providers'

import './providers'

import IUsersRepository from '../../modules/users/repositories/IUsersRepository'
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository'

import IUrlRepository from '../../modules/urls/repositories/IUrlsRepository'
import UrlsRepository from '../../modules/urls/infra/typeorm/repositories/UrlsRepository'

container.registerSingleton<IUrlRepository>('UrlRepository', UrlsRepository)

container.registerSingleton<IUsersRepository>('UserRepository', UsersRepository)
