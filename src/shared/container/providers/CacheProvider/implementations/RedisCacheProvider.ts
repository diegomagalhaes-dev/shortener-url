import Redis, { Redis as RedisClient } from 'ioredis'
import cacheConfig from '../../../../../config/cache'
import ICacheProvider from '../models/ICacheProvider'

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient

  constructor() {
    this.client = new Redis(cacheConfig.config.redis)
  }

  public async save<T>(
    key: string,
    value: T,
    expires_in?: number,
  ): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
    if (expires_in) await this.client.expire(key, expires_in)
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key)

    if (!data) return null

    const parsedData = JSON.parse(data) as T

    return parsedData
  }
}
