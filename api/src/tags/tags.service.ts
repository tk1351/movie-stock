import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsRepository } from './tags.repository';
import { Tag } from './models/tags.entity';
import { IMessage } from '../types/type';
import { CreateTagDtos } from './dto/create-tag.dtos';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsRepository)
    private tagsRepository: TagsRepository,
  ) {}

  async getTags(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async getTagsByMovieId(movieId: number): Promise<Tag[]> {
    return await this.tagsRepository.getTagsByMovieId(movieId);
  }

  async createTags(createTagDtos: CreateTagDtos[]): Promise<Tag[]> {
    const newTags = Promise.all(
      createTagDtos.map(async (createTagDto) => {
        const newTag = await this.tagsRepository.registerTag(createTagDto);
        return newTag;
      }),
    );
    return newTags;
  }

  async deleteTagByMovieId(movieId: number): Promise<IMessage> {
    return await this.tagsRepository.deleteTagByMovieId(movieId);
  }
}
