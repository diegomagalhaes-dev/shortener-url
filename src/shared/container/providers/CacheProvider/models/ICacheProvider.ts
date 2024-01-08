export default interface ICacheProvider {
  save<T>(key: string, value: T, expires_in?: number): Promise<void>
  recover<T>(key: string): Promise<T | null>
}
