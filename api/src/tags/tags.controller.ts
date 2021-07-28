import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './models/tags.entity';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getTags(): Promise<Tag[]> {
    return this.tagsService.getTags();
  }

  @Get('/movie/:movieId')
  getTagsByMovieId(
    @Param('movieId', ParseIntPipe) movieId: number,
  ): Promise<Tag[]> {
    return this.tagsService.getTagsByMovieId(movieId);
  }
}
