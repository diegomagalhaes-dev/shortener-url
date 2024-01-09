import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/FakeCacheProviders'
import FakeUrlsRepository from '../repositories/fakes/FakeUrlsRepository'
import GenerateShortenedUrlService from './GenerateShortenedUrlService'
import Url from '../infra/typeorm/entities/Url'
import FindShortenedUrlService from './FindShortenedUrlService'

const fakeUserID = 'fake-user-id'

let fakeUrlsRepository: FakeUrlsRepository
let fakeCacheProvider: FakeCacheProvider
let generateUrl: GenerateShortenedUrlService
let findUrl: FindShortenedUrlService

describe('FindShortenedUrl', () => {
  beforeEach(() => {
    fakeUrlsRepository = new FakeUrlsRepository()
    generateUrl = new GenerateShortenedUrlService(
      fakeUrlsRepository,
      fakeCacheProvider,
    )
    findUrl = new FindShortenedUrlService(fakeUrlsRepository)
  })

  it('should be able to find a url that belongs to a user based on the url id and the user id', async () => {
    const url = (await generateUrl.execute({
      original_url: 'https://www.google.com',
      user_id: fakeUserID,
    })) as Url

    const foundUrl = await findUrl.execute({
      shorted_url_id: url.id,
      user_id: fakeUserID,
    })

    expect(foundUrl).toEqual(url)
  })
})
