import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'

import User from '../../../../users/infra/typeorm/entities/User'

@Entity('url')
class Url {
  @PrimaryColumn()
  id: string

  @Column()
  original_url: string

  @Column()
  shortened_url: string

  @Column({ default: 0 })
  access_count: number

  @Column()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date
}

export default Url
