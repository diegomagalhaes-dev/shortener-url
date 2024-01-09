import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/FakeCacheProviders'
import FakeUrlsRepository from '../repositories/fakes/FakeUrlsRepository'
import GenerateShortenedUrlService from './GenerateShortenedUrlService'

import ListUserUrlsService from './ListUserUrlsService'
import Url from '../infra/typeorm/entities/Url'

const fakeUserID = 'fake-user-id'

let fakeUrlsRepository: FakeUrlsRepository
let fakeCacheProvider: FakeCacheProvider
let generateUrl: GenerateShortenedUrlService
let listUrls: ListUserUrlsService

describe('ListUserUrls', () => {
  beforeEach(() => {
    fakeUrlsRepository = new FakeUrlsRepository()
    fakeCacheProvider = new FakeCacheProvider()
    generateUrl = new GenerateShortenedUrlService(
      fakeUrlsRepository,
      fakeCacheProvider,
    )
    listUrls = new ListUserUrlsService(fakeUrlsRepository)
  })

  it('should be able to list all urls related to a user', async () => {
    const url1 = (await generateUrl.execute({
      original_url: 'https://www.google.com',
      user_id: fakeUserID,
    })) as Url

    const url2 = (await generateUrl.execute({
      original_url: 'https://www.google.com',
      user_id: fakeUserID,
    })) as Url

    const urls = await listUrls.execute({ user_id: fakeUserID })

    expect(urls).toEqual([url1, url2])
  })
})
