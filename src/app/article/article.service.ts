import { Injectable } from '@nestjs/common';
import { Article } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { ErrorResponse } from '../../utils/error.exception';
import { Console } from 'console';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}
  async createArticle(data: Article): Promise<Article> {
    const someData = await this.articleRepository.count({
      where: {
        title: data.title,
      },
    });
    if (someData > 0) {
      throw new ErrorResponse('文章已存在');
    }
    const params = {
      ...data,
      browse_count: 0,
    };
    const res = this.articleRepository.create(params);
    const result = this.articleRepository.save(res);
    return result;
  }
  async getList(data?: any): Promise<[Article[], number]> {
    const articleDb = this.articleRepository.createQueryBuilder('article');
    if (data.page) {
      const pageSize = data.pageSize || 10;
      const page = data.page || 1;

      if (data.title) {
        articleDb.andWhere('title Like :title', { title: `%${data.title}%` });
      }
      if (data.start_time) {
        articleDb.andWhere(
          `DATE_FORMAT(created_time, '%Y-%m-%d')BETWEEN :start AND :end`,
          {
            start: data.start_time,
            end: data.end_time,
          },
        );
      }
      return articleDb
        .orderBy('created_time', 'DESC')
        .take(pageSize)
        .skip((page - 1) * pageSize)
        .getManyAndCount();
    } else {
      return articleDb.orderBy('created_time', 'DESC').getManyAndCount();
    }
  }

  async findOne(id: number): Promise<Article> {
    const res = await this.articleRepository.findOne({
      where: { id },
    });
    if (!res) {
      throw new ErrorResponse('未找到数据');
    }
    return res;
  }

  async deleteItem(id: number): Promise<any> {
    const item = await this.findOne(id);
    const res = await this.articleRepository.remove(item);
    return res;
  }

  async updateItem(data: Article): Promise<boolean> {
    const someData = await this.articleRepository.count({
      where: {
        id: data.id,
      },
    });
    if (someData > 0) {
      return await this.articleRepository
        .update(data.id, data)
        .then((res) => res.affected > 0);
    } else {
      throw new ErrorResponse('数据不存在');
    }
  }
}
