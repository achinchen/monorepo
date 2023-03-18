import type { DeepMockProxy } from 'jest-mock-extended';
import { mockReset, mockDeep } from 'jest-mock-extended';
import { authenticator } from 'server/services/auth/index.server';

type Authenticator = typeof authenticator;

jest.mock('server/services/auth/index.server', () => ({
  __esModule: true,
  authenticator: mockDeep<Authenticator>()
}));

beforeEach(() => {
  mockReset(AuthServicesMock);
});

export const AuthServicesMock =
  authenticator as unknown as DeepMockProxy<Authenticator>;
