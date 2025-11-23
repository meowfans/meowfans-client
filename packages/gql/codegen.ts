import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:9090/graphql',
  documents: ['./api/**/*.ts', './generated/**/*.ts'],
  verbose: true,
  generates: {
    './generated/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'graphql'
      }
    }
  },
  ignoreNoDocuments: true
};

export default config;
