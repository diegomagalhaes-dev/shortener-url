import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/FakeCacheProviders'
import FakeUrlsRepository from '../repositories/fakes/FakeUrlsRepository'
import GenerateShortenedUrlService from './GenerateShortenedUrlService'
import Url from '../infra/typeorm/entities/Url'
import DisableUserUrlService from './DisableUserUrlService'

const host = process.env.APP_URL ?? 'http://localhost:3333'

const fakeUserID = 'fake-user-id'

let fakeUrlsRepository: FakeUrlsRepository
let fakeCacheProvider: FakeCacheProvider
let generateUrl: GenerateShortenedUrlService
let disableUrl: DisableUserUrlService

describe('DisableUserUrl', () => {
  beforeEach(() => {
    fakeUrlsRepository = new FakeUrlsRepository()
    fakeCacheProvider = new FakeCacheProvider()
    generateUrl = new GenerateShortenedUrlService(
      fakeUrlsRepository,
      fakeCacheProvider,
    )
    disableUrl = new DisableUserUrlService(fakeUrlsRepository)
  })

  it('should be able to soft delete a url from a authenticated user', async () => {
    const url = (await generateUrl.execute({
      original_url: 'https://www.google.com',
      user_id: fakeUserID,
    })) as Url

    await disableUrl.execute({ shorted_url_id: url.id })

    const recoveredUrl = await fakeUrlsRepository.findById(url.id)

    expect(recoveredUrl?.deleted_at).not.toBe(null)
  })
})
