import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Tag } from './models/tags.entity';
import { CreateTagsDto } from './dto/create-tags.dto';

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {
  async registerTag(createTagsDto: CreateTagsDto): Promise<Tag> {
    const { text, movieId } = createTagsDto;

    const tag = this.create();
    tag.text = text;
    tag.movieId = movieId;

    try {
      await tag.save();
      return tag;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
