import { Test } from '@nestjs/testing';
import { UsersService } from '../../src/users/users.service';
import { UsersRepository } from '../../src/users/users.repository';

const mockUsers = [
  {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'test',
    email: 'test@example.com',
    sub: 'test',
    picture: 'test',
    role: 'user',
    movies: [],
  },
];

const mockCreateUserDto = {
  name: 'test',
  email: 'test@example.com',
  sub: 'test',
  picture: 'test',
};

const mockUsersRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createUser: jest.fn(),
});

describe('UsersService', () => {
  let usersService;
  let usersRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useFactory: mockUsersRepository },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('getUsers', () => {
    it('全てのuserをrepositoryから取得する', async () => {
      usersRepository.find = jest.fn().mockResolvedValue(mockUsers);

      const result = await usersService.getUsers();
      expect(usersRepository.find).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('getUser', () => {
    it('subが一致するuserをrepositoryから取得する', async () => {
      usersRepository.findOne = jest.fn().mockResolvedValue(mockUsers[0]);

      const result = await usersService.getUser({ sub: 'test' });
      expect(usersRepository.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockUsers[0]);
    });
  });

  describe('createUser', () => {
    it('user登録が成功するとmessageを返す', async () => {
      usersRepository.createUser.mockResolvedValue('someUser');
      expect(usersRepository.createUser).not.toHaveBeenCalled();

      const result = await usersService.createUser(mockCreateUserDto);
      expect(result).toEqual('someUser');

      const { name, email, sub, picture } = mockCreateUserDto;
      expect(usersRepository.createUser).toHaveBeenCalledWith({
        name,
        email,
        sub,
        picture,
      });
    });
  });
});
