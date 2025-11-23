export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  fullName: string;
}

export enum EventTypes {
  Ping = 'ping',
  VaultDownload = 'vault_download',
  ImportObject = 'import_object',
  VaultDownloadCompleted = 'vault_download_completed',
  ImportCompleted = 'import_completed',
  PostUnlocked = 'post_unlocked',
  VaultUnlocked = 'vault_unlocked',
  VaultObjectUnlocked = 'vault_object_unlocked',
  ZonePurchased = 'zonePurchased'
}

export enum AppSizes {
  ICON_1024 = '1024',
  ICON_512 = '512',
  ICON_384 = '384',
  ICON_256 = '256',
  ICON_196 = '196',
  ICON_144 = '144',
  ICON_96 = '96',
  ICON_72 = '72',
  ICON_48 = '48',
  ICON_36 = '36'
}

export enum UserRoles {
  FAN = 'fan',
  ADMIN = 'admin',
  SUPER_VIEWER = 'super_viewer',
  CREATOR = 'creator'
}

export enum FetchMethods {
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
  GET = 'GET'
}

export enum AspectRatio {
  Square = 'square',
  Portrait = 'portrait',
  Landscape = 'landscape'
}

export enum GridColumns {
  Single = 'grid-cols-1',
  Double = 'grid-cols-2',
  Triple = 'grid-cols-3'
}

export enum MediaType {
  PROFILE_MEDIA = 'profileMedia',
  MESSAGE_MEDIA = 'messageMedia',
  POST_MEDIA = 'postMedia'
}

export enum AuthErrors {
  EMAIL_EXISTS = 'Email already exists. Please use another email.',
  INVALID_CREDENTIALS = 'Invalid email or password.',
  USER_NOT_FOUND = 'No user found with this email.',
  OFFLINE = 'You are offline. Please check your internet connection.',
  CREATOR_SIGNUP_FAILED = 'Unable to create creator account. Try again later.',
  FAN_SIGNUP_FAILED = 'Unable to create fan account. Try again later.',
  ADMIN_SIGNUP_FAILED = 'Unauthorized admin signup attempt.'
}

export enum AuthPaths {
  SIGNUP = '/signup',
  LOGIN = '/login',
  CREATOR_SIGNUP = '/creator-signup',
  FORGOT_PASSWORD = '/forgot-password',
  GOOGLE_LOGIN = '/google',
  APPLE_LOGIN = '/apple',
  META_LOGIN = '/meta'
}

export enum BgColor {
  BLACK = '#000',
  WHITE = '#fff'
}

export enum ShadCnBackgrounds {
  WAVY = 'WAVY',
  FLICKERING = 'FLICKERING',
  RETRO = 'RETRO',
  WARP = 'WARP',
  BOX = 'BOX',
  FIBER_WAVES = 'FIVER',
  VORTEX = 'VORTEX',
  SQUARES_BACKGROUND = 'SQUARES',
  GALAXY = 'GALAXY',
  METEOR = 'METEOR'
}

export enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
  EMAIL_VERIFICATION = 'email_verification',
  PASSWORD_RESET = 'password_reset',
  EMAIL_LOGIN = 'email_login'
}

export enum ShadCnChartTypes {
  BAR_CHART = 'BAR_CHART',
  LINE_CHART = 'LINE_CHART',
  RADAR_CHART = 'RADAR_CHART',
  AREA_CHART = 'AREA_CHART'
}

export enum FileType {
  VIDEO = 'video',
  IMAGE = 'image',
  AUDIO = 'audio',
  DOCUMENT = 'document'
}

export enum HostNames {
  COOMER = 'coomer.st',
  WALLHAVEN = 'wallhaven.cc',
  OK = 'ok.xxx',
  SHORTS = 'www.shorts.xxx'
}

export enum DocumentQualityType {
  HIGH_DEFINITION = 'highDefinition',
  LOW_DEFINITION = 'lowDefinition',
  DEFAULT_DEFINITION = 'defaultDefinition'
}

export enum ImageType {
  BLURRED = 'blurred',
  ORIGINAL = 'original',
  RESIZED = 'resized'
}
