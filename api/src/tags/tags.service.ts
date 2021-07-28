import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsRepository } from './tags.repository';
import { Tag } from './models/tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsRepository)
    private tagsRepository: TagsRepository,
  ) {}

  async getTags(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }
}
