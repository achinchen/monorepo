const CONFIG = {
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/app/$1',
    'spec/(.*)$': '<rootDir>/spec/$1'
  },
  clearMocks: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/spec/utils/fileTransformer.ts'
  }
};

module.exports = {
  projects: [
    {
      ...CONFIG,
      displayName: 'client',
      testEnvironment: 'jsdom',
      testPathIgnorePatterns: ['server.test.tsx?'],
      setupFilesAfterEnv: ['<rootDir>/spec/setup/client.ts']
    },
    {
      ...CONFIG,
      displayName: 'server',
      testEnvironment: 'node',
      testRegex: [/server.test.tsx?/, '/server/**/*.test.ts?'],
      setupFilesAfterEnv: ['<rootDir>/spec/setup/server.ts']
    }
  ]
};
