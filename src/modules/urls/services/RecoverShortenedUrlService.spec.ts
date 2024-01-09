import { nanoid } from 'nanoid'
import FakeCacheProvider from '../../../shared/container/providers/CacheProvider/fakes/FakeCacheProviders'
import FakeUrlsRepository from '../repositories/fakes/FakeUrlsRepository'
import GenerateShortenedUrlService from './GenerateShortenedUrlService'
import Url from '../infra/typeorm/entities/Url'
import RecoverShortenedUrlService from './RecoverShortenedUrlSerivce'

const host = process.env.APP_URL ?? 'http://localhost:3333'

const fakeUserID = 'fake-user-id'
const fakeId = nanoid(6)
const mockedUrl = `${host}/${fakeId}`

let fakeUrlsRepository: FakeUrlsRepository
let fakeCacheProvider: FakeCacheProvider
let generateUrl: GenerateShortenedUrlService
let recoverUrl: RecoverShortenedUrlService

describe('RecoverShortenedUrl', () => {
  beforeEach(() => {
    fakeUrlsRepository = new FakeUrlsRepository()
    fakeCacheProvider = new FakeCacheProvider()
    generateUrl = new GenerateShortenedUrlService(
      fakeUrlsRepository,
      fakeCacheProvider,
    )
    recoverUrl = new RecoverShortenedUrlService(
      fakeUrlsRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to recover a shortened url from cache by its shorted_url_id', async () => {
    await fakeCacheProvider.save(fakeId, mockedUrl)
    const recoveredUrl = await recoverUrl.execute({ shorted_url_id: fakeId })

    expect(recoveredUrl).toEqual(mockedUrl)
  })

  it('should be able to recover a shortened url from long term database by its shorted_url_id', async () => {
    const url = (await generateUrl.execute({
      original_url: 'https://www.google.com',
      user_id: fakeUserID,
    })) as Url

    const recoveredUrl = await fakeUrlsRepository.findById(url.id)

    expect(recoveredUrl).toEqual(url)
  })
})
