import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudiosRepository } from './studios.repository';

@Injectable()
export class StudiosService {
  constructor(
    @InjectRepository(StudiosRepository)
    private studiosRepository: StudiosRepository,
  ) {}
}
