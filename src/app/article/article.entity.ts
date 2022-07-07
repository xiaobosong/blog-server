import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';
@Entity('article')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '姓名' })
  @Column({ nullable: false, comment: '文章名字' })
  title: string;

  @ApiProperty({ description: '文章内容' })
  @Column({ nullable: false, comment: '文章内容' })
  content: string;

  @ApiProperty({ description: '浏览量' })
  @Column({ nullable: false, comment: '是否是管理员' })
  browse_count: number;

  @ApiProperty({ description: '备注' })
  @Column({ default: null, comment: '备注' })
  remark: string;

  @Column({
    type: 'timestamp',
    default: () => 'current_timestamp',
    comment: '创建时间',
  })
  created_time: Timestamp;

  // @Column({
  //   type: 'timestamp',
  //   onUpdate: 'current_timestamp',
  //   default: () => 'current_timestamp',
  //   comment: '更新时间',
  // })
  // updated_time: Timestamp;
}
