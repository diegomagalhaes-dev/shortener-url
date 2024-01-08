import ICacheProvider from '../models/ICacheProvider'

interface ICacheData {
  [key: string]: string
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {}

  public async save<T>(
    key: string,
    value: T,
    expires_in?: number,
  ): Promise<void> {
    this.cache[key] = JSON.stringify(value)
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.cache[key]

    if (!data) return null

    const parsedData = JSON.parse(data) as T

    return parsedData
  }
}
