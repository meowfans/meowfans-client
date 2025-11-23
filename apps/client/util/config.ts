export const configService = {
  get NEXT_PUBLIC_AUTH_URL() {
    return process.env.NEXT_PUBLIC_AUTH_URL!;
  },
  get NEXT_PUBLIC_API_GRAPHQL_URL() {
    return process.env.NEXT_PUBLIC_API_GRAPHQL_URL!;
  },
  get NEXT_PUBLIC_APP_URL() {
    return process.env.NEXT_PUBLIC_APP_URL!;
  },
  get NEXT_PUBLIC_API_URL() {
    return process.env.NEXT_PUBLIC_API_URL!;
  },
  get NEXT_PUBLIC_ADMIN_URL() {
    return process.env.NEXT_PUBLIC_ADMIN_URL!;
  },
  get NEXT_PUBLIC_CREATOR_URL() {
    return process.env.NEXT_PUBLIC_CREATOR_URL!;
  },
  get NEXT_PUBLIC_APP_DOMAINS() {
    return process.env.NEXT_PUBLIC_APP_DOMAINS!;
  },
  get NEXT_PUBLIC_PAYPAL_CLIENT_ID() {
    return process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
  },
  get NEXT_PUBLIC_DEFAULT_CREATOR_ID() {
    return process.env.NEXT_PUBLIC_DEFAULT_CREATOR_ID!;
  },
  get NEXT_PUBLIC_NODE_ENV() {
    return process.env.NEXT_PUBLIC_NODE_ENV!;
  }
};
