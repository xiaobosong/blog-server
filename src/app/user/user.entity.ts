import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '姓名' })
  @Column({ nullable: false, comment: '用户名字' })
  user_name: string;

  @ApiProperty({ description: '密码' })
  @Column({ nullable: false, comment: '用户密码' })
  password: string;

  @ApiProperty({ description: '是否是管理员' })
  @Column({ nullable: false, comment: '是否是管理员' })
  is_manger: number;

  @ApiProperty({ description: '备注' })
  @Column({ default: null, comment: '备注' })
  remark: string;

  @Column({
    type: 'timestamp',
    default: () => 'current_timestamp',
    comment: '创建时间',
  })
  created_time: Timestamp;

  @Column({
    type: 'timestamp',
    onUpdate: 'current_timestamp',
    default: () => 'current_timestamp',
    comment: '更新时间',
  })
  updated_time: Timestamp;
}
