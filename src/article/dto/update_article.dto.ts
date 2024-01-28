import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create_article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
