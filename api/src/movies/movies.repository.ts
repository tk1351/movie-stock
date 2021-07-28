import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import {
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Movie } from './models/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { IMessage } from '../types/type';
import { User } from '../users/models/users.entity';
import { UsersRepository } from '../users/users.repository';

@EntityRepository(Movie)
export class MoviesRepository extends Repository<Movie> {
  async getMovieById(id: number): Promise<Movie> {
    const found = await this.createQueryBuilder('movies')
      .leftJoinAndSelect('movies.user', 'user')
      .where('movies.id = :id', { id })
      .getOne();

    if (!found) throw new NotFoundException(`id: ${id}の映画は存在しません`);

    try {
      return found;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getMovieByUser(user: User): Promise<Movie[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne(user.id);
    if (!foundUser) throw new NotFoundException('userが存在しません');

    const found = await this.createQueryBuilder('movies')
      .where('movies.userId = :userId', { userId: user.id })
      .getMany();

    try {
      return found;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async registerMovie(
    createMovieDto: CreateMovieDto,
    user: User,
  ): Promise<IMessage> {
    const usersRepository = getCustomRepository(UsersRepository);

    const foundUser = await usersRepository.findOne(user.id);
    if (foundUser.role === undefined)
      throw new UnauthorizedException('権限がありません');

    const { title, release, time, country, productionCompany } = createMovieDto;

    const movie = this.create();
    movie.title = title;
    movie.release = release;
    movie.time = time;
    movie.country = country;
    movie.productionCompany = productionCompany;
    movie.user = foundUser;

    try {
      await movie.save();
      return { message: '映画の登録が完了しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async deleteMovie(id: number, user: User): Promise<IMessage> {
    const usersRepository = getCustomRepository(UsersRepository);

    const movie = await this.getMovieById(id);
    const foundUser = await usersRepository.findOne(user.id);

    if (movie.userId !== foundUser.id)
      throw new UnauthorizedException('権限がありません');

    const result = await this.delete({ id });

    if (result.affected === 0)
      throw new NotFoundException(`id: ${id}の映画は存在しません`);

    try {
      return { message: '映画を削除しました' };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
