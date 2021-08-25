import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AuthRepository } from '../../src//auth/auth.repository';

describe('AuthRepository', () => {
  let authRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthRepository],
    }).compile();

    authRepository = module.get<AuthRepository>(AuthRepository);
  });

  describe('getAuthUser', () => {
    it('getAuthUserが成功すると、 id, name, roleを返す', async () => {
      const user = { id: 1, name: 'user', role: 'user' };
      authRepository.findOne = jest.fn().mockResolvedValue(user);
      expect(authRepository.findOne).not.toHaveBeenCalled();

      const sub = '12345';
      const result = await authRepository.getAuthUser(sub);
      expect(authRepository.findOne).toHaveBeenCalled();
      expect(result).toEqual(user);
    });

    it('userが見つからない場合は、NotFoundを返す', async () => {
      authRepository.findOne = jest.fn().mockRejectedValue({ code: '404' });
      const sub = '12345';
      await expect(authRepository.getAuthUser(sub)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
