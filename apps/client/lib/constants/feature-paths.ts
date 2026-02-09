export enum APP_PATHS {
  HOME = '/',
  DASHBOARD = '/dashboard',
  SUBSCRIPTIONS = '/subscriptions',
  HISTORY = '/history',
  POSTS = '/posts',
  CREATORS = '/creators',
  VAULTS = '/vaults',
  SHORTS = '/shorts',
  CHANNELS = '/channels',
  FOLLOWING = '/following',
  CATEGORIES = '/categories',
  PICTURES = '/pictures',
  PURCHASED = '/purchased',
  TUTORIALS = '/tutorials',
  ACADEMY = '/academy',
  TOP_CREATORS = '/top-creators',

  // Trending
  TRENDING = '/trending',
  TRENDING_CREATORS = '/trending/creators',
  TRENDING_PICTURES = '/trending/pictures',
  TRENDING_VAULTS = '/trending/vaults',
  TRENDING_POSTS = '/trending/posts',

  // Favorites
  LIKED = '/liked',
  LIKED_PICTURES = '/liked/pictures',
  LIKED_VAULTS = '/liked/vaults',
  LIKED_POSTS = '/liked/posts',

  // Profile/Settings
  PROFILE = '/profile',
  UPGRADE = '/upgrade',
  BILLING = '/billing',
  SETTINGS = '/settings',
  SUPPORT = '/support',
  FEEDBACK = '/feedback',
  NOTIFICATIONS = '/notifications',
  REPORTS = '/reports'
}

export const FEATURE_FLAGS: Record<APP_PATHS, boolean> = {
  // Main
  [APP_PATHS.HOME]: true,
  [APP_PATHS.DASHBOARD]: true,
  [APP_PATHS.SUBSCRIPTIONS]: false,
  [APP_PATHS.HISTORY]: false,
  [APP_PATHS.POSTS]: true,
  [APP_PATHS.CREATORS]: true,
  [APP_PATHS.VAULTS]: true,
  [APP_PATHS.SHORTS]: true,
  [APP_PATHS.CHANNELS]: false,
  [APP_PATHS.FOLLOWING]: true,
  [APP_PATHS.CATEGORIES]: true,
  [APP_PATHS.PICTURES]: true,
  [APP_PATHS.PURCHASED]: true,
  [APP_PATHS.TUTORIALS]: true,

  [APP_PATHS.ACADEMY]: true,
  [APP_PATHS.TOP_CREATORS]: false,

  // Trending
  [APP_PATHS.TRENDING]: true,
  [APP_PATHS.TRENDING_CREATORS]: true,
  [APP_PATHS.TRENDING_PICTURES]: true,
  [APP_PATHS.TRENDING_VAULTS]: true,
  [APP_PATHS.TRENDING_POSTS]: true,

  // Favorites
  [APP_PATHS.LIKED]: true,
  [APP_PATHS.LIKED_PICTURES]: true,
  [APP_PATHS.LIKED_VAULTS]: true,
  [APP_PATHS.LIKED_POSTS]: true,

  // Profile/Settings
  [APP_PATHS.UPGRADE]: false,
  [APP_PATHS.PROFILE]: true,
  [APP_PATHS.BILLING]: false,
  [APP_PATHS.SETTINGS]: true,
  [APP_PATHS.SUPPORT]: false,
  [APP_PATHS.FEEDBACK]: false,

  [APP_PATHS.NOTIFICATIONS]: false,
  [APP_PATHS.REPORTS]: true
};
