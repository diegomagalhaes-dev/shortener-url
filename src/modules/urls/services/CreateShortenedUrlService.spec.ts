import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/FakeCacheProviders'
import FakeUrlsRepository from '../repositories/fakes/FakeUrlsRepository'
import GenerateShortenedUrlService from './GenerateShortenedUrlService'
import Url from '../infra/typeorm/entities/Url'

const host = process.env.APP_URL ?? 'http://localhost:3333'

const fakeUserID = 'fake-user-id'

let fakeUrlsRepository: FakeUrlsRepository
let fakeCacheProvider: FakeCacheProvider
let generateUrl: GenerateShortenedUrlService

describe('CreateShortedUrl', () => {
  beforeEach(() => {
    fakeUrlsRepository = new FakeUrlsRepository()
    fakeCacheProvider = new FakeCacheProvider()
    generateUrl = new GenerateShortenedUrlService(
      fakeUrlsRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to create a new shortened url for a authenticated user and save it to long term database', async () => {
    const url = (await generateUrl.execute({
      original_url: 'https://www.google.com',
      user_id: fakeUserID,
    })) as Url

    const recoveredUrl = await fakeUrlsRepository.findById(url.id)

    expect(recoveredUrl).toEqual(url)
  })

  it('should be able to create a new shortened url for a non authenticated user and save it to cache', async () => {
    const shorted_url = (await generateUrl.execute({
      original_url: 'https://www.google.com',
    })) as string

    const shorted_url_id = shorted_url.replace(`${host}/`, '')
    const recoveredUrl =
      await fakeCacheProvider.recover<Partial<Url>>(shorted_url_id)

    expect(recoveredUrl?.shortened_url).toEqual(shorted_url)
  })
})
