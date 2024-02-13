module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  roots: ['<rootDir>/test'],
  'ts-jest': {
    tsConfig: 'tsconfig.jest.json',
  },
  testPathIgnorePatterns: ['<rootDir>/(?:.+?)/dist/'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
};
