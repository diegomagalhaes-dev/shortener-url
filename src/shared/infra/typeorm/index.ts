import 'dotenv/config'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  synchronize: true,
  entities: ['{src,dist}/modules/**/infra/typeorm/entities/*.{ts,js}'],
  migrations: ['{src,dist}/shared/infra/typeorm/migrations/*.{ts,js}'],
})
