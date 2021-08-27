import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from '../../src/users/jwt.strategy';
import { UsersRepository } from '../../src/users/users.repository';
import { User } from '../../src/users/models/users.entity';

const mockUsersRepository = () => ({
  findOne: jest.fn(),
});

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let usersRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UsersRepository, useFactory: mockUsersRepository },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('validate', () => {
    it('JWTのpayloadを元に、userを返す', async () => {
      const user = new User();
      user.sub = '12345';

      usersRepository.findOne.mockResolvedValue(user);
      const result = await jwtStrategy.validate({ sub: '12345' });
      expect(usersRepository.findOne).toHaveBeenCalledWith({ sub: '12345' });
      expect(result).toEqual(user);
    });

    it('userが見つからない場合は、errorを返す', async () => {
      usersRepository.findOne.mockResolvedValue(null);
      expect(jwtStrategy.validate({ sub: '12334' })).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
