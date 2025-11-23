import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:9090/graphql',
  documents: ['packages/gql/**/*.{graphql,ts,tsx}'],
  verbose: true,
  generates: {
    './packages/gql/generated/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'graphql'
      },
    }
  },
  ignoreNoDocuments: true
};

export default config;
