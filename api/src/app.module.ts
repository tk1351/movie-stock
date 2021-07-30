import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmConfigService } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { CrewsModule } from './crews/crews.module';
import { TagsModule } from './tags/tags.module';
import { CountriesModule } from './countries/countries.module';
import { StudiosModule } from './studios/studios.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
    CrewsModule,
    TagsModule,
    CountriesModule,
    StudiosModule,
  ],
})
export class AppModule {}
