import { EntityRepository, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Tag } from './models/tags.entity';
import { CreateTagsDto } from './dto/create-tags.dto';
import { IMessage } from '../types/type';

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

  async getTagsByMovieId(movieId: number): Promise<Tag[]> {
    const found = await this.createQueryBuilder('tags')
      .where('tags.movieId = :movieId', { movieId })
      .getMany();

    if (!found)
      throw new NotFoundException(`id: ${movieId}のタグは存在しません`);

    try {
      return found;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteTag(id: number): Promise<IMessage> {
    const result = await this.delete({ id });

    if (result.affected === 0)
      throw new NotFoundException(`id: ${id}のタグは存在しません`);

    try {
      return { message: 'タグを削除しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteTagByMovieId(movieId: number): Promise<IMessage> {
    const targetIndex = await this.getTagsByMovieId(movieId);

    if (targetIndex.length > 0) {
      targetIndex.map(async (index) => await this.delete({ id: index.id }));
      return { message: 'タグを削除しました' };
    }
  }
}
