import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'member' })
export class MemberEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false }) // typeORM
  name: string;

  // class-validate
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Column({ type: 'varchar', length: 255, nullable: false }) // typeORM
  username: string;

  @Exclude() // serialize
  // class-validate
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Column({ type: 'text', nullable: false }) // typeORM
  password: string;
}
