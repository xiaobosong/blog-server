// src/modules/article/article.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Article } from './article.entity';
@ApiTags('文章管理')
@Controller('api/article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get('list')
  async getMore(@Query() data) {
    const list = await this.articleService.getList(data);
    return {
      list: list[0],
      total: list[1],
      currentPage: data.currentPage || 1,
      pageSize: data.pageSize || 10,
    };
  }

  @Get('info')
  getOne(@Query() id: string) {
    return '文章详情';
  }

  @Post('create')
  create(@Body() data: Article) {
    return this.articleService.createArticle(data);
  }

  @Post('edit')
  update(@Body() data: Article) {
    return this.articleService.updateItem(data);
  }

  @Post('remove')
  delete(@Body('id') id: number) {
    return this.articleService.deleteItem(id);
  }
}
