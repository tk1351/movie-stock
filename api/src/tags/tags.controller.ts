import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './models/tags.entity';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  getTags(): Promise<Tag[]> {
    return this.tagsService.getTags();
  }
}
