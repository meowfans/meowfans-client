/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export enum AssetType {
  Archive = 'ARCHIVE',
  Hidden = 'HIDDEN',
  Private = 'PRIVATE'
}

export type AssetsEntity = {
  __typename?: 'AssetsEntity';
  blurredUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  creatorAssets: Array<CreatorAssetsEntity>;
  creatorId: Scalars['String']['output'];
  creatorProfile: CreatorProfilesEntity;
  fanAssets: Array<FanAssetsEntity>;
  fileType: FileType;
  id: Scalars['String']['output'];
  isPosted: Scalars['Boolean']['output'];
  mediaType: MediaType;
  messageAssets: Array<MessageAssetsEntity>;
  mimeType: Scalars['String']['output'];
  postAssets: Array<PostAssetsEntity>;
  rawUrl: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  vaultObject?: Maybe<VaultObjectsEntity>;
  vaultObjectId?: Maybe<Scalars['ID']['output']>;
  viewCount?: Maybe<Scalars['Int']['output']>;
};

export type AttachPaymentMethodInput = {
  paymentMethodId: Scalars['String']['input'];
};

export type AttachPaymentMethodOutput = {
  __typename?: 'AttachPaymentMethodOutput';
  clientSecret?: Maybe<Scalars['String']['output']>;
  nextActionUrl?: Maybe<Scalars['String']['output']>;
  paymentMethodId?: Maybe<Scalars['String']['output']>;
};

export type BlockFanInput = {
  fanId: Scalars['String']['input'];
};

export type CardChecks = {
  __typename?: 'CardChecks';
  address_line1_check?: Maybe<Scalars['Boolean']['output']>;
  address_postal_code_check?: Maybe<Scalars['String']['output']>;
  cvc_check?: Maybe<Scalars['String']['output']>;
};

export type CardInfo = {
  __typename?: 'CardInfo';
  brand: Scalars['String']['output'];
  checks: CardChecks;
  country: Scalars['String']['output'];
  display_brand: Scalars['String']['output'];
  exp_month: Scalars['Int']['output'];
  exp_year: Scalars['Int']['output'];
  fingerprint: Scalars['String']['output'];
  funding: Scalars['String']['output'];
  generated_from?: Maybe<Scalars['String']['output']>;
  last4: Scalars['String']['output'];
  networks: CardNetworks;
  regulated_status: Scalars['String']['output'];
  three_d_secure_usage: ThreeDSecureUsage;
  wallet?: Maybe<Scalars['Boolean']['output']>;
};

export type CardNetworks = {
  __typename?: 'CardNetworks';
  available: Array<Scalars['String']['output']>;
  preferred?: Maybe<Scalars['Boolean']['output']>;
};

export type CardOutput = {
  __typename?: 'CardOutput';
  card: CardInfo;
  customer: CustomerInfo;
  id: Scalars['String']['output'];
};

export type CleanUpVaultInput = {
  creatorId: Scalars['String']['input'];
};

export type ConfirmCardInput = {
  paymentMethodId: Scalars['String']['input'];
};

export type ConfirmCardOutput = {
  __typename?: 'ConfirmCardOutput';
  defaultPaymentMethod?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export enum ContentType {
  Nsfw = 'NSFW',
  Sfw = 'SFW',
  Shorts = 'SHORTS'
}

export type CreateChannelInput = {
  creatorId: Scalars['String']['input'];
  fanId: Scalars['String']['input'];
};

export type CreateCommentInput = {
  comment: Scalars['String']['input'];
  postId: Scalars['String']['input'];
};

export type CreateImportQueueInput = {
  creatorId: Scalars['String']['input'];
  exceptions?: InputMaybe<Array<Scalars['String']['input']>>;
  exclude?: Scalars['Int']['input'];
  fileType?: FileType;
  importType?: ImportTypes;
  isNewCreator?: Scalars['Boolean']['input'];
  qualityType?: DocumentQualityType;
  serviceType?: ServiceType;
  start?: Scalars['Int']['input'];
  subDirectory: Scalars['String']['input'];
  totalContent?: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type CreatePostInput = {
  assetIds: Array<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  previewId?: InputMaybe<Scalars['String']['input']>;
  types: Array<PostTypes>;
  unlockPrice?: InputMaybe<Scalars['Int']['input']>;
};

export type CreatePurchasePostInput = {
  postId: Scalars['String']['input'];
};

export type CreateTransactionInput = {
  creatorId: Scalars['String']['input'];
  entityId: Scalars['String']['input'];
  paymentMethod: Scalars['String']['input'];
  purchaseType: PurchaseType;
};

export type CreatorAssetsEntity = {
  __typename?: 'CreatorAssetsEntity';
  asset: AssetsEntity;
  assetId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['String']['output'];
  creatorProfile: CreatorProfilesEntity;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  type: AssetType;
};

export type CreatorBlocksEntity = {
  __typename?: 'CreatorBlocksEntity';
  blockedAt: Scalars['DateTime']['output'];
  creatorId: Scalars['String']['output'];
  creatorProfile: CreatorProfilesEntity;
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  unBlockedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreatorFollowsEntity = {
  __typename?: 'CreatorFollowsEntity';
  creatorId: Scalars['String']['output'];
  creatorProfile: CreatorProfilesEntity;
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  followedAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  unFollowedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreatorInterfacesEntity = {
  __typename?: 'CreatorInterfacesEntity';
  backgroundImage: Scalars['String']['output'];
  canReceiveCall: Scalars['Boolean']['output'];
  creatorId: Scalars['String']['output'];
  creatorProfile: CreatorProfilesEntity;
  id: Scalars['String']['output'];
  isPGFilterOn: Scalars['Boolean']['output'];
  mode: Scalars['String']['output'];
};

export type CreatorPaymentProfilesEntity = {
  __typename?: 'CreatorPaymentProfilesEntity';
  canTransfer: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['String']['output'];
  creatorProfile: CreatorProfilesEntity;
  id: Scalars['String']['output'];
  stripe_connect_id: Scalars['String']['output'];
  subscriptions: Array<SubscriptionsEntity>;
};

export type CreatorProfile = {
  __typename?: 'CreatorProfile';
  avatarUrl: Scalars['String']['output'];
  creatorId: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreatorProfileOutput = {
  __typename?: 'CreatorProfileOutput';
  avatarUrl: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreatorProfilesEntity = {
  __typename?: 'CreatorProfilesEntity';
  acceptedAt?: Maybe<Scalars['DateTime']['output']>;
  allowsComment: Scalars['Boolean']['output'];
  allowsMessaging: Scalars['Boolean']['output'];
  assetCount?: Maybe<Scalars['Int']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['String']['output'];
  creatorType: CreatorType;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  displayOnlineStatus: Scalars['Boolean']['output'];
  displayTotalPost: Scalars['Boolean']['output'];
  displayTotalSubscriber: Scalars['Boolean']['output'];
  followersCount: Scalars['Float']['output'];
  fulfilledObjectCount: Scalars['Float']['output'];
  interfaces: Array<CreatorInterfacesEntity>;
  isFollowing: Scalars['Boolean']['output'];
  pendingObjectCount: Scalars['Float']['output'];
  processingObjectCount: Scalars['Float']['output'];
  rejectedAt?: Maybe<Scalars['DateTime']['output']>;
  rejectedObjectCount: Scalars['Float']['output'];
  socialAccount: Array<SocialAccountsEntity>;
  themeColor: Scalars['String']['output'];
  totalExclusivePost: Scalars['Float']['output'];
  totalPost: Scalars['Float']['output'];
  totalPublicPost: Scalars['Float']['output'];
  totalSubscriber: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UsersEntity;
  vaultCount?: Maybe<Scalars['Int']['output']>;
  vaultObjectCount?: Maybe<Scalars['Int']['output']>;
  verified: Scalars['Boolean']['output'];
  viewCount?: Maybe<Scalars['Int']['output']>;
};

export type CreatorRestrictsEntity = {
  __typename?: 'CreatorRestrictsEntity';
  creatorId: Scalars['String']['output'];
  creatorProfile: CreatorProfilesEntity;
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  restrictedAt: Scalars['DateTime']['output'];
  unRestrictedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreatorStatsInput = {
  addId?: Scalars['Boolean']['input'];
  field?: DateTrunc;
};

export enum CreatorType {
  ImportedOnlyFansUser = 'IMPORTED_ONLY_FANS_USER',
  ImportedPornStar = 'IMPORTED_PORN_STAR',
  NewAiUser = 'NEW_AI_USER',
  NewUser = 'NEW_USER'
}

export type CreatorViewAnalyticsOutput = {
  __typename?: 'CreatorViewAnalyticsOutput';
  timestamp: Scalars['DateTime']['output'];
  viewCount?: Maybe<Scalars['Float']['output']>;
};

export type CustomerInfo = {
  __typename?: 'CustomerInfo';
  address?: Maybe<Scalars['String']['output']>;
  balance: Scalars['Float']['output'];
  created: Scalars['Int']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  default_source?: Maybe<Scalars['String']['output']>;
  delinquent: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discount?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  invoice_prefix: Scalars['String']['output'];
  invoice_settings: InvoiceSettings;
  livemode: Scalars['Boolean']['output'];
  metadata: CustomerMetadata;
  name: Scalars['String']['output'];
  next_invoice_sequence: Scalars['Int']['output'];
  object: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  preferred_locales: Array<Scalars['String']['output']>;
  shipping?: Maybe<Scalars['String']['output']>;
  tax_exempt: Scalars['String']['output'];
  test_clock?: Maybe<Scalars['String']['output']>;
};

export type CustomerMetadata = {
  __typename?: 'CustomerMetadata';
  userId: Scalars['String']['output'];
};

export enum DataFetchType {
  InfiniteScroll = 'InfiniteScroll',
  Pagination = 'Pagination'
}

export enum DateTrunc {
  Day = 'day',
  Month = 'month',
  Quarter = 'quarter',
  Week = 'week'
}

export type DeleteCommentInput = {
  commentId: Scalars['String']['input'];
};

export type DeleteCreatorAsset = {
  assetIds: Array<Scalars['ID']['input']>;
};

export type DeleteFollowerInput = {
  fanId: Scalars['String']['input'];
};

export type DeleteMessageInput = {
  messageId: Scalars['String']['input'];
};

export type DeleteMessagesInput = {
  messageIds: Array<Scalars['ID']['input']>;
};

export type DeletePostInput = {
  postId: Scalars['String']['input'];
};

export type DeletePostsInput = {
  postIds: Array<Scalars['ID']['input']>;
};

export type DeleteSharePostInput = {
  postId: Scalars['String']['input'];
  shareId: Scalars['String']['input'];
};

export enum DocumentQualityType {
  DefaultDefinition = 'DEFAULT_DEFINITION',
  DivDefinition = 'DIV_DEFINITION',
  HighDefinition = 'HIGH_DEFINITION',
  LowDefinition = 'LOW_DEFINITION',
  SourceDefinition = 'SOURCE_DEFINITION',
  VideoDefinition = 'VIDEO_DEFINITION'
}

export type DownloadAllCreatorObjectsAsBatchInput = {
  creatorIds: Array<Scalars['ID']['input']>;
};

export enum DownloadStates {
  Fulfilled = 'FULFILLED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Rejected = 'REJECTED'
}

export type FanAssetsEntity = {
  __typename?: 'FanAssetsEntity';
  asset: AssetsEntity;
  assetId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
};

export type FanPaymentProfilesEntity = {
  __typename?: 'FanPaymentProfilesEntity';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  stripeCustomerId: Scalars['String']['output'];
};

export type FanProfile = {
  __typename?: 'FanProfile';
  avatarUrl: Scalars['String']['output'];
  fanId: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type FanProfileOutput = {
  __typename?: 'FanProfileOutput';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type FanProfilesEntity = {
  __typename?: 'FanProfilesEntity';
  appliedAt?: Maybe<Scalars['DateTime']['output']>;
  blockedByCreators: Array<CreatorBlocksEntity>;
  channels: Array<MessageChannelsEntity>;
  createdAt: Scalars['DateTime']['output'];
  currentZone?: Maybe<ZoneMembershipsEntity>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fanAssets: Array<FanAssetsEntity>;
  fanId: Scalars['String']['output'];
  fanPaymentProfiles: Array<FanPaymentProfilesEntity>;
  following: Array<CreatorFollowsEntity>;
  followingCount: Scalars['Float']['output'];
  groupMessageReplies: Array<GroupMessageRepliesEntity>;
  groupReceivers: Array<GroupMessagesEntity>;
  hasZoneMembership: Scalars['Boolean']['output'];
  isBanned: Scalars['Boolean']['output'];
  messagePurchases: Array<MessagePurchasesEntity>;
  moderatorGroups: Array<GroupsEntity>;
  participantGroups: Array<GroupsEntity>;
  payments: Array<PaymentsEntity>;
  postComments: Array<PostCommentsEntity>;
  postLikes: Array<MessageRepliesEntity>;
  postPurchases: Array<PostPurchasesEntity>;
  postSaves: Array<PostSavesEntity>;
  postShares: Array<PostSharesEntity>;
  postUnlocks: Array<PremiumPostUnlocksEntity>;
  restrictedByCreators: Array<CreatorRestrictsEntity>;
  subscriptions: Array<SubscriptionsEntity>;
  updatedAt: Scalars['DateTime']['output'];
  user: UsersEntity;
  vaultObjectPurchases: Array<VaultObjectPurchasesEntity>;
  vaultPurchases: Array<VaultPurchasesEntity>;
  zoneMemberships: Array<ZoneMembershipsEntity>;
};

export enum FileType {
  Audio = 'AUDIO',
  Document = 'DOCUMENT',
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type FollowCreatorInput = {
  creatorId: Scalars['String']['input'];
};

export type GetAllAssetsOutput = {
  __typename?: 'GetAllAssetsOutput';
  assets: Array<CreatorAssetsEntity>;
  count: Scalars['Int']['output'];
};

export type GetAllCreatorsOutput = {
  __typename?: 'GetAllCreatorsOutput';
  count: Scalars['Int']['output'];
  creators: Array<UsersEntity>;
  hasNext: Scalars['Boolean']['output'];
  hasPrev: Scalars['Boolean']['output'];
  totalPages: Scalars['Int']['output'];
};

export type GetAllObjectsCountOutput = {
  __typename?: 'GetAllObjectsCountOutput';
  fulfilled: Scalars['Float']['output'];
  pending: Scalars['Float']['output'];
  processing: Scalars['Float']['output'];
  rejected: Scalars['Float']['output'];
};

export type GetAllVaultsOutput = {
  __typename?: 'GetAllVaultsOutput';
  count: Scalars['Int']['output'];
  vaults: Array<VaultObjectsEntity>;
};

export type GetChannelInput = {
  channelId: Scalars['String']['input'];
};

export type GetChannelOutput = {
  __typename?: 'GetChannelOutput';
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['String']['output'];
  creatorLastSeenAt?: Maybe<Scalars['DateTime']['output']>;
  creatorLastSentAt?: Maybe<Scalars['DateTime']['output']>;
  creatorProfile?: Maybe<CreatorProfile>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fanId: Scalars['String']['output'];
  fanLastSeenAt: Scalars['DateTime']['output'];
  fanLastSentAt: Scalars['DateTime']['output'];
  fanProfile?: Maybe<FanProfile>;
  id: Scalars['String']['output'];
  isMessagingBlocked: Scalars['Boolean']['output'];
  isMuted: Scalars['Boolean']['output'];
  isPinned: Scalars['Boolean']['output'];
  isRestricted: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  totalEarning: Scalars['Float']['output'];
};

export type GetCreatorVaultObjectsOutput = {
  __typename?: 'GetCreatorVaultObjectsOutput';
  count: Scalars['Int']['output'];
  vaultObjects: Array<VaultObjectsEntity>;
};

export type GetDefaultAssetsOutput = {
  __typename?: 'GetDefaultAssetsOutput';
  assets: Array<CreatorAssetsEntity>;
  count?: Maybe<Scalars['Int']['output']>;
  hasNext?: Maybe<Scalars['Boolean']['output']>;
  hasPrev?: Maybe<Scalars['Boolean']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type GetDefaultCreatorsOutput = {
  __typename?: 'GetDefaultCreatorsOutput';
  count?: Maybe<Scalars['Int']['output']>;
  creators: Array<UsersEntity>;
  hasNext?: Maybe<Scalars['Boolean']['output']>;
  hasPrev?: Maybe<Scalars['Boolean']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type GetPostInput = {
  postId: Scalars['String']['input'];
};

export type GetPostsInfoOutput = {
  __typename?: 'GetPostsInfoOutput';
  caption?: Maybe<Scalars['String']['output']>;
  commentCount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  lastCommentId?: Maybe<Scalars['String']['output']>;
  latestComment?: Maybe<Scalars['String']['output']>;
  likeCount: Scalars['Float']['output'];
  preview?: Maybe<Scalars['String']['output']>;
  saveCount: Scalars['Float']['output'];
  shareCount: Scalars['Float']['output'];
  totalEarning: Scalars['Float']['output'];
  types: Array<PostTypes>;
  unlockPrice?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  viewCount: Scalars['Float']['output'];
};

export type GetUserOutput = {
  __typename?: 'GetUserOutput';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  bannerUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  creatorProfile: CreatorProfilesEntity;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fanProfile: FanProfilesEntity;
  firstName: Scalars['String']['output'];
  fulfilledCount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  lastName: Scalars['String']['output'];
  pendingCount: Scalars['Int']['output'];
  processingCount: Scalars['Int']['output'];
  rejectedCount: Scalars['Int']['output'];
  roles: Array<UserRoles>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type GroupMessageRepliesEntity = {
  __typename?: 'GroupMessageRepliesEntity';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  groupMessage: GroupMessagesEntity;
  id: Scalars['String']['output'];
  messageId: Scalars['String']['output'];
  repliers: Array<FanProfilesEntity>;
  updatedAt: Scalars['DateTime']['output'];
};

export type GroupMessagesEntity = {
  __typename?: 'GroupMessagesEntity';
  createdAt: Scalars['DateTime']['output'];
  creatorProfile: CreatorProfilesEntity;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  group: GroupsEntity;
  groupId: Scalars['String']['output'];
  groupMessageReplies: Array<GroupMessageRepliesEntity>;
  id: Scalars['String']['output'];
  isCreator: Scalars['Boolean']['output'];
  isExclusive: Scalars['Boolean']['output'];
  isPinned: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  receivers: Array<FanProfilesEntity>;
  senderId: Scalars['String']['output'];
  unlockPrice: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GroupsEntity = {
  __typename?: 'GroupsEntity';
  admin: CreatorProfilesEntity;
  adminId: Scalars['String']['output'];
  backgroundColor: Scalars['String']['output'];
  bannerUrl: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  groupMessages: Array<GroupMessagesEntity>;
  groupName: Scalars['String']['output'];
  iconUrl: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isBlocked: Scalars['Boolean']['output'];
  isMuted: Scalars['Boolean']['output'];
  isPinned: Scalars['Boolean']['output'];
  isRestricted: Scalars['Boolean']['output'];
  moderators: Array<FanProfilesEntity>;
  participants: Array<FanProfilesEntity>;
};

export enum ImportTypes {
  Branch = 'BRANCH',
  Ok = 'OK',
  Page = 'PAGE',
  Pics = 'PICS',
  Profile = 'PROFILE',
  Shorts = 'SHORTS',
  Single = 'SINGLE'
}

export type InvoiceSettings = {
  __typename?: 'InvoiceSettings';
  default_payment_method?: Maybe<Scalars['String']['output']>;
  footer?: Maybe<Scalars['String']['output']>;
};

export type LikePostInput = {
  postId: Scalars['String']['input'];
};

export enum MediaType {
  MessageMedia = 'MESSAGE_MEDIA',
  PostMedia = 'POST_MEDIA',
  ProfileMedia = 'PROFILE_MEDIA'
}

export type MessageAssetsEntity = {
  __typename?: 'MessageAssetsEntity';
  asset: AssetsEntity;
  assetId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  message: MessagesEntity;
  messageId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MessageChannelsEntity = {
  __typename?: 'MessageChannelsEntity';
  createdAt: Scalars['DateTime']['output'];
  creatorProfile: CreatorProfilesEntity;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  isMessagingBlocked: Scalars['Boolean']['output'];
  isMuted: Scalars['Boolean']['output'];
  isPinned: Scalars['Boolean']['output'];
  isRestricted: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
  lastMessage: MessagesEntity;
  lastMessageId?: Maybe<Scalars['String']['output']>;
  messages: Array<MessagesEntity>;
  totalEarning: Scalars['Float']['output'];
};

export type MessagePurchasesEntity = {
  __typename?: 'MessagePurchasesEntity';
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  message: MessagesEntity;
  messageId: Scalars['String']['output'];
  purchasedAt: Scalars['String']['output'];
};

export type MessageReactionsEntity = {
  __typename?: 'MessageReactionsEntity';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  message: MessagesEntity;
  messageId: Scalars['String']['output'];
  reaction: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type MessageRepliesEntity = {
  __typename?: 'MessageRepliesEntity';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  message: MessagesEntity;
  messageId: Scalars['String']['output'];
  replierId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MessagesEntity = {
  __typename?: 'MessagesEntity';
  channel: MessageChannelsEntity;
  channelId: Scalars['String']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  hasAccess: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  isExclusive: Scalars['Boolean']['output'];
  messageAssets: Array<MessageAssetsEntity>;
  messagePurchases: Array<MessagePurchasesEntity>;
  reaction: MessageReactionsEntity;
  recipientUserId: Scalars['String']['output'];
  repliedTo?: Maybe<MessagesEntity>;
  replies: Array<MessageRepliesEntity>;
  senderId: Scalars['String']['output'];
  unlockPrice?: Maybe<Scalars['Float']['output']>;
  unlockedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  attachPaymentMethod: AttachPaymentMethodOutput;
  blockFan: Scalars['Boolean']['output'];
  cleanUpVaultObjectsOfACreator: Scalars['Float']['output'];
  confirmCard: ConfirmCardOutput;
  createChannel: MessageChannelsEntity;
  createComment: PostCommentsEntity;
  createPost: PostsEntity;
  createTransaction: TransactionOutput;
  deleteAllAssets: Scalars['Boolean']['output'];
  deleteComment: Scalars['Boolean']['output'];
  deleteCreatorAssets: Scalars['Boolean']['output'];
  deleteFollower: Scalars['Boolean']['output'];
  deleteMessage: Scalars['Boolean']['output'];
  deleteMessages: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  deletePosts: Scalars['Boolean']['output'];
  deleteShare: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  downloadAllCreatorObjects: Scalars['String']['output'];
  downloadCreatorObjectsAsBatch: Scalars['String']['output'];
  followCreator: CreatorFollowsEntity;
  initiate: Scalars['String']['output'];
  initiateCreatorObjectsImport: Scalars['String']['output'];
  likePost?: Maybe<PostLikesEntity>;
  likeVault: VaultLikeOutput;
  likeVaultObject: VaultObjectLikeOutput;
  purchasePost: PostPurchasesEntity;
  restrictFan: Scalars['Boolean']['output'];
  savePost: PostsEntity;
  sendMessageFromCreator: MessagesEntity;
  sendMessageFromFan: MessagesEntity;
  sendOrDeleteMessageReaction: MessageReactionsEntity;
  sendReplyFromCreator: MessagesEntity;
  sendReplyFromFan: MessagesEntity;
  sharePost: PostSharesEntity;
  terminate: Scalars['Boolean']['output'];
  terminateDownloading: Scalars['String']['output'];
  unBlockFan: Scalars['Boolean']['output'];
  unFollowCreator: Scalars['Boolean']['output'];
  unRestrictFan: Scalars['Boolean']['output'];
  updateAllCreatorProfiles: Scalars['String']['output'];
  updateAssets: Array<CreatorAssetsEntity>;
  updateChannel: MessageChannelsEntity;
  updateComment: PostCommentsEntity;
  updateCreatorProfile: CreatorProfilesEntity;
  updateFanProfile: FanProfilesEntity;
  updateMessage: MessagesEntity;
  updatePost: PostsEntity;
  updatePreviewOfVaults: Scalars['String']['output'];
  uploadVault: Scalars['String']['output'];
};


export type MutationAttachPaymentMethodArgs = {
  input: AttachPaymentMethodInput;
};


export type MutationBlockFanArgs = {
  input: BlockFanInput;
};


export type MutationCleanUpVaultObjectsOfACreatorArgs = {
  input: CleanUpVaultInput;
};


export type MutationConfirmCardArgs = {
  input: ConfirmCardInput;
};


export type MutationCreateChannelArgs = {
  input: CreateChannelInput;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreateTransactionArgs = {
  input: CreateTransactionInput;
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type MutationDeleteCreatorAssetsArgs = {
  input: DeleteCreatorAsset;
};


export type MutationDeleteFollowerArgs = {
  input: DeleteFollowerInput;
};


export type MutationDeleteMessageArgs = {
  input: DeleteMessageInput;
};


export type MutationDeleteMessagesArgs = {
  input: DeleteMessagesInput;
};


export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


export type MutationDeletePostsArgs = {
  input: DeletePostsInput;
};


export type MutationDeleteShareArgs = {
  input: DeleteSharePostInput;
};


export type MutationDownloadAllCreatorObjectsArgs = {
  input: DownloadAllCreatorObjectsAsBatchInput;
};


export type MutationDownloadCreatorObjectsAsBatchArgs = {
  input: UploadVaultQueueInput;
};


export type MutationFollowCreatorArgs = {
  input: FollowCreatorInput;
};


export type MutationInitiateArgs = {
  input: CreateImportQueueInput;
};


export type MutationInitiateCreatorObjectsImportArgs = {
  input: CreateImportQueueInput;
};


export type MutationLikePostArgs = {
  input: LikePostInput;
};


export type MutationLikeVaultArgs = {
  input: PaginationInput;
};


export type MutationLikeVaultObjectArgs = {
  input: PaginationInput;
};


export type MutationPurchasePostArgs = {
  input: CreatePurchasePostInput;
};


export type MutationRestrictFanArgs = {
  input: RestrictFanInput;
};


export type MutationSavePostArgs = {
  input: SavePostInput;
};


export type MutationSendMessageFromCreatorArgs = {
  input: SendMessageFromCreatorInput;
};


export type MutationSendMessageFromFanArgs = {
  input: SendMessageFromFanInput;
};


export type MutationSendOrDeleteMessageReactionArgs = {
  input: SendReactionInput;
};


export type MutationSendReplyFromCreatorArgs = {
  input: SendMessageFromCreatorInput;
};


export type MutationSendReplyFromFanArgs = {
  input: SendMessageFromFanInput;
};


export type MutationSharePostArgs = {
  input: LikePostInput;
};


export type MutationUnBlockFanArgs = {
  input: BlockFanInput;
};


export type MutationUnFollowCreatorArgs = {
  input: UnFollowCreatorInput;
};


export type MutationUnRestrictFanArgs = {
  input: RestrictFanInput;
};


export type MutationUpdateAllCreatorProfilesArgs = {
  input: UpdateUsersInput;
};


export type MutationUpdateAssetsArgs = {
  input: UpdateAssetsInput;
};


export type MutationUpdateChannelArgs = {
  input: UpdateChannelInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdateCreatorProfileArgs = {
  input: UpdateCreatorProfileInput;
};


export type MutationUpdateFanProfileArgs = {
  input: UpdateUserProfileInput;
};


export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUploadVaultArgs = {
  input: UploadVaultInput;
};

export type PaginationInput = {
  assetType?: InputMaybe<AssetType>;
  creatorType?: InputMaybe<Array<CreatorType>>;
  dataFetchType?: InputMaybe<DataFetchType>;
  fileType?: InputMaybe<FileType>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<SortOrder>;
  pageNumber?: Scalars['Int']['input'];
  postStats?: Array<PostStats>;
  postTypes?: InputMaybe<Array<PostTypes>>;
  relatedEntityId?: InputMaybe<Scalars['ID']['input']>;
  relatedUserId?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoles>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<SortBy>;
  status?: DownloadStates;
  take?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type PaymentsEntity = {
  __typename?: 'PaymentsEntity';
  amountInCents: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['String']['output'];
  creatorProfile: CreatorProfilesEntity;
  currency: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  purchaseType: PurchaseType;
  relatedEntityId: Scalars['String']['output'];
  status: Scalars['String']['output'];
  stripePaymentId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PostAssetsEntity = {
  __typename?: 'PostAssetsEntity';
  asset: AssetsEntity;
  assetId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  post: PostsEntity;
  postId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PostCommentsEntity = {
  __typename?: 'PostCommentsEntity';
  comment: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  post: PostsEntity;
  postId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PostLikesEntity = {
  __typename?: 'PostLikesEntity';
  createdAt: Scalars['DateTime']['output'];
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  post: PostsEntity;
  postId: Scalars['String']['output'];
};

export type PostPurchasesEntity = {
  __typename?: 'PostPurchasesEntity';
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  post: PostsEntity;
  postId: Scalars['String']['output'];
  purchasedAt: Scalars['DateTime']['output'];
};

export type PostSavesEntity = {
  __typename?: 'PostSavesEntity';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  post: PostsEntity;
  postId: Scalars['String']['output'];
};

export type PostSharesEntity = {
  __typename?: 'PostSharesEntity';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  post: PostsEntity;
  postId: Scalars['String']['output'];
};

export type PostStatAnalyticsOutput = {
  __typename?: 'PostStatAnalyticsOutput';
  commentCount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  likeCount?: Maybe<Scalars['Float']['output']>;
  saveCount?: Maybe<Scalars['Float']['output']>;
  shareCount?: Maybe<Scalars['Float']['output']>;
  timestamp: Scalars['DateTime']['output'];
  totalEarning?: Maybe<Scalars['Float']['output']>;
  unlockPrice?: Maybe<Scalars['Int']['output']>;
  viewCount?: Maybe<Scalars['Float']['output']>;
};

export enum PostStats {
  CommentCount = 'COMMENT_COUNT',
  Id = 'ID',
  LikeCount = 'LIKE_COUNT',
  SaveCount = 'SAVE_COUNT',
  ShareCount = 'SHARE_COUNT',
  TotalEarning = 'TOTAL_EARNING',
  UnlockPrice = 'UNLOCK_PRICE',
  ViewCount = 'VIEW_COUNT'
}

export type PostStatsInput = {
  addId?: Scalars['Boolean']['input'];
  field?: DateTrunc;
  postId?: InputMaybe<Scalars['String']['input']>;
  postStats?: Array<PostStats>;
};

export enum PostTypes {
  Archived = 'ARCHIVED',
  Banned = 'BANNED',
  Exclusive = 'EXCLUSIVE',
  Hidden = 'HIDDEN',
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type PostsEntity = {
  __typename?: 'PostsEntity';
  blurredPreview: Scalars['String']['output'];
  caption?: Maybe<Scalars['String']['output']>;
  commentCount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['String']['output'];
  creatorProfile: CreatorProfilesEntity;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  isLiked: Scalars['Boolean']['output'];
  isPurchased: Scalars['Boolean']['output'];
  isSaved: Scalars['Boolean']['output'];
  lastCommentId?: Maybe<Scalars['String']['output']>;
  latestComment?: Maybe<PostCommentsEntity>;
  likeCount: Scalars['Float']['output'];
  objectCount: Scalars['Int']['output'];
  postAssets: Array<PostAssetsEntity>;
  postComments: Array<PostCommentsEntity>;
  postLikes: Array<PostLikesEntity>;
  postPurchases: Array<PostPurchasesEntity>;
  postSaves: Array<PostSavesEntity>;
  postShares: Array<PostSharesEntity>;
  postUnlocks: Array<PremiumPostUnlocksEntity>;
  preview: Scalars['String']['output'];
  saveCount: Scalars['Float']['output'];
  shareCount: Scalars['Float']['output'];
  totalEarning: Scalars['Float']['output'];
  types: Array<PostTypes>;
  unlockPrice?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  viewCount: Scalars['Float']['output'];
};

export type PremiumPostUnlocksEntity = {
  __typename?: 'PremiumPostUnlocksEntity';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  fanId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  postId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum PurchaseType {
  Message = 'Message',
  Post = 'Post',
  Subscription = 'Subscription',
  Vault = 'Vault',
  VaultObject = 'VaultObject',
  Zone = 'Zone'
}

export type Query = {
  __typename?: 'Query';
  getAllAssetsByAdmin: GetAllAssetsOutput;
  getAllComments: Array<PostCommentsEntity>;
  getAllVaultsByAdmin: GetAllVaultsOutput;
  getBlockedUsers: Array<CreatorBlocksEntity>;
  getCard: CardOutput;
  getChannel: GetChannelOutput;
  getChannelMessages: Array<MessagesEntity>;
  getChannels: Array<MessageChannelsEntity>;
  getCountOfObjectsOfEachType: GetAllObjectsCountOutput;
  getCreatorAssets: Array<CreatorAssetsEntity>;
  getCreatorProfile: CreatorProfilesEntity;
  getCreatorVaultObjects: Array<VaultObjectsEntity>;
  getCreatorVaultObjectsByAdmin: GetCreatorVaultObjectsOutput;
  getCreatorViewAnalyticsOutput: Array<CreatorViewAnalyticsOutput>;
  getCreatorsByAdmin: GetAllCreatorsOutput;
  getDefaultCreators: GetDefaultCreatorsOutput;
  getFanAssets: Array<FanAssetsEntity>;
  getFanProfile?: Maybe<FanProfilesEntity>;
  getFollowers: Array<CreatorFollowsEntity>;
  getFollowing: Array<CreatorFollowsEntity>;
  getLikedPosts: Array<PostLikesEntity>;
  getLikedVaultObjects: Array<VaultObjectsLikesEntity>;
  getLikedVaults: Array<VaultLikesEntity>;
  getPost: PostsEntity;
  getPostAnalytics: Array<PostStatAnalyticsOutput>;
  getPostAssets: Array<PostAssetsEntity>;
  getPostCommentsByPostId: Array<PostCommentsEntity>;
  getPosts: Array<PostsEntity>;
  getPostsInfo: Array<GetPostsInfoOutput>;
  getPublicAssets: GetDefaultAssetsOutput;
  getPublicCreatorAssets: GetDefaultAssetsOutput;
  getPublicCreatorProfile: CreatorProfilesEntity;
  getPublicPostById: PostsEntity;
  getPublicPostCommentsByPostId: Array<PostCommentsEntity>;
  getPublicPosts: Array<PostsEntity>;
  getPublicShortsAssets: Array<AssetsEntity>;
  getPublicSinglePost: PostsEntity;
  getPublicSingleVault: VaultsEntity;
  getPublicTags: Array<TagsEntity>;
  getPublicVaultObjects: Array<VaultObjectsEntity>;
  getPublicVaults: Array<VaultsEntity>;
  getRestrictedUsers: Array<CreatorRestrictsEntity>;
  getSinglePost: PostsEntity;
  getTotalObjectsAsType: Scalars['Int']['output'];
  getUser: GetUserOutput;
  getZonePlans: Array<ZonePlansEntity>;
  searchTags: Array<TagsEntity>;
};


export type QueryGetAllAssetsByAdminArgs = {
  input: PaginationInput;
};


export type QueryGetAllCommentsArgs = {
  input: PaginationInput;
};


export type QueryGetAllVaultsByAdminArgs = {
  input: PaginationInput;
};


export type QueryGetBlockedUsersArgs = {
  input: PaginationInput;
};


export type QueryGetChannelArgs = {
  input: GetChannelInput;
};


export type QueryGetChannelMessagesArgs = {
  input: PaginationInput;
};


export type QueryGetChannelsArgs = {
  input: PaginationInput;
};


export type QueryGetCreatorAssetsArgs = {
  input: PaginationInput;
};


export type QueryGetCreatorVaultObjectsArgs = {
  input: PaginationInput;
};


export type QueryGetCreatorVaultObjectsByAdminArgs = {
  input: PaginationInput;
};


export type QueryGetCreatorViewAnalyticsOutputArgs = {
  input: CreatorStatsInput;
};


export type QueryGetCreatorsByAdminArgs = {
  input: PaginationInput;
};


export type QueryGetDefaultCreatorsArgs = {
  input: PaginationInput;
};


export type QueryGetFanAssetsArgs = {
  input: PaginationInput;
};


export type QueryGetFollowersArgs = {
  input: PaginationInput;
};


export type QueryGetFollowingArgs = {
  input: PaginationInput;
};


export type QueryGetLikedPostsArgs = {
  input: PaginationInput;
};


export type QueryGetLikedVaultObjectsArgs = {
  input: PaginationInput;
};


export type QueryGetLikedVaultsArgs = {
  input: PaginationInput;
};


export type QueryGetPostArgs = {
  input: PaginationInput;
};


export type QueryGetPostAnalyticsArgs = {
  input: PostStatsInput;
};


export type QueryGetPostAssetsArgs = {
  input: PaginationInput;
};


export type QueryGetPostCommentsByPostIdArgs = {
  input: PaginationInput;
};


export type QueryGetPostsArgs = {
  input: PaginationInput;
};


export type QueryGetPostsInfoArgs = {
  input: PaginationInput;
};


export type QueryGetPublicAssetsArgs = {
  input: PaginationInput;
};


export type QueryGetPublicCreatorAssetsArgs = {
  input: PaginationInput;
};


export type QueryGetPublicCreatorProfileArgs = {
  input: PaginationInput;
};


export type QueryGetPublicPostByIdArgs = {
  input: GetPostInput;
};


export type QueryGetPublicPostCommentsByPostIdArgs = {
  input: PaginationInput;
};


export type QueryGetPublicPostsArgs = {
  input: PaginationInput;
};


export type QueryGetPublicShortsAssetsArgs = {
  input: PaginationInput;
};


export type QueryGetPublicSinglePostArgs = {
  input: GetPostInput;
};


export type QueryGetPublicSingleVaultArgs = {
  input: PaginationInput;
};


export type QueryGetPublicTagsArgs = {
  input: PaginationInput;
};


export type QueryGetPublicVaultObjectsArgs = {
  input: PaginationInput;
};


export type QueryGetPublicVaultsArgs = {
  input: PaginationInput;
};


export type QueryGetRestrictedUsersArgs = {
  input: PaginationInput;
};


export type QueryGetSinglePostArgs = {
  input: PaginationInput;
};


export type QueryGetTotalObjectsAsTypeArgs = {
  input: PaginationInput;
};


export type QueryGetUserArgs = {
  username: Scalars['String']['input'];
};


export type QuerySearchTagsArgs = {
  input: PaginationInput;
};

export type RestrictFanInput = {
  fanId: Scalars['String']['input'];
};

export type SavePostInput = {
  postId: Scalars['String']['input'];
};

export type SendMessageFromCreatorInput = {
  assetIds: Array<Scalars['ID']['input']>;
  content: Scalars['String']['input'];
  isExclusive?: Scalars['Boolean']['input'];
  messageId?: InputMaybe<Scalars['String']['input']>;
  recipientUserId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
  unlockAmount: Scalars['Int']['input'];
};

export type SendMessageFromFanInput = {
  content: Scalars['String']['input'];
  messageId?: InputMaybe<Scalars['String']['input']>;
  recipientUserId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};

export type SendReactionInput = {
  messageId: Scalars['String']['input'];
  reaction: Scalars['String']['input'];
};

export enum ServiceType {
  Dos = 'DOS',
  Ras = 'RAS'
}

export type SocialAccountsEntity = {
  __typename?: 'SocialAccountsEntity';
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['String']['output'];
  creatorProfile: CreatorProfilesEntity;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  faceBook?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  instagram?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export enum SortBy {
  AssetCount = 'ASSET_COUNT',
  AssetCreatedAt = 'ASSET_CREATED_AT',
  AssetDisplayOrder = 'ASSET_DISPLAY_ORDER',
  AssetViewCount = 'ASSET_VIEW_COUNT',
  CreatorFollowingCount = 'CREATOR_FOLLOWING_COUNT',
  CreatorViewCount = 'CREATOR_VIEW_COUNT',
  PostCreatedAt = 'POST_CREATED_AT',
  PostLikeCount = 'POST_LIKE_COUNT',
  PostSaveCount = 'POST_SAVE_COUNT',
  PostShareCount = 'POST_SHARE_COUNT',
  PostTotalEarning = 'POST_TOTAL_EARNING',
  PostViewCount = 'POST_VIEW_COUNT',
  UserCreatedAt = 'USER_CREATED_AT',
  VaultCount = 'VAULT_COUNT',
  VaultCreatedAt = 'VAULT_CREATED_AT',
  VaultLikeCount = 'VAULT_LIKE_COUNT',
  VaultObjectCount = 'VAULT_OBJECT_COUNT',
  VaultObjectLikeCount = 'VAULT_OBJECT_LIKE_COUNT',
  VaultObjectSuffix = 'VAULT_OBJECT_SUFFIX',
  VaultObjectViewCount = 'VAULT_OBJECT_VIEW_COUNT',
  VaultViewCount = 'VAULT_VIEW_COUNT'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SubscriptionPlansEntity = {
  __typename?: 'SubscriptionPlansEntity';
  bannerUrl: Scalars['String']['output'];
  creatorId: Scalars['String']['output'];
  creatorProfile: CreatorProfilesEntity;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  subscribedAt: Scalars['DateTime']['output'];
  subscription: SubscriptionsEntity;
  syncedAt: Scalars['DateTime']['output'];
  tier: Scalars['String']['output'];
};

export type SubscriptionsEntity = {
  __typename?: 'SubscriptionsEntity';
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['String']['output'];
  creatorPaymentProfile: CreatorPaymentProfilesEntity;
  creatorPaymentProfileId: Scalars['String']['output'];
  creatorProfile: CreatorProfilesEntity;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  months: Scalars['Float']['output'];
  price: Scalars['Float']['output'];
  stripeSubscriptionId: Scalars['String']['output'];
  subscriptionPlan: SubscriptionPlansEntity;
  subscriptionPlanId: Scalars['String']['output'];
  syncedAt: Scalars['DateTime']['output'];
};

export type TagsEntity = {
  __typename?: 'TagsEntity';
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

export type ThreeDSecureUsage = {
  __typename?: 'ThreeDSecureUsage';
  supported: Scalars['Boolean']['output'];
};

export type TransactionOutput = {
  __typename?: 'TransactionOutput';
  clientSecret?: Maybe<Scalars['String']['output']>;
  requiresAction?: Maybe<Scalars['String']['output']>;
};

export type UnFollowCreatorInput = {
  creatorId: Scalars['String']['input'];
};

export type UpdateAssetsInput = {
  assetIds: Array<Scalars['ID']['input']>;
  assetType: AssetType;
};

export type UpdateChannelInput = {
  channelId: Scalars['String']['input'];
  isBlocked?: InputMaybe<Scalars['Boolean']['input']>;
  isMessagingBlocked?: InputMaybe<Scalars['Boolean']['input']>;
  isMuted?: InputMaybe<Scalars['Boolean']['input']>;
  isRestricted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateCommentInput = {
  comment: Scalars['String']['input'];
  commentId: Scalars['String']['input'];
};

export type UpdateCreatorProfileInput = {
  allowsComment?: InputMaybe<Scalars['Boolean']['input']>;
  allowsMessaging?: InputMaybe<Scalars['Boolean']['input']>;
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  bannerUrl?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  displayOnlineStatus?: InputMaybe<Scalars['Boolean']['input']>;
  displayTotalPost?: InputMaybe<Scalars['Boolean']['input']>;
  displayTotalSubscriber?: InputMaybe<Scalars['Boolean']['input']>;
  themeColor?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMessageInput = {
  content: Scalars['String']['input'];
  messageId: Scalars['String']['input'];
};

export type UpdatePostInput = {
  caption?: InputMaybe<Scalars['String']['input']>;
  postId: Scalars['String']['input'];
  types?: Array<PostTypes>;
  unlockPrice?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateUserProfileInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  bannerUrl?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUsersInput = {
  adminId: Scalars['ID']['input'];
};

export type UploadVaultInput = {
  destination?: AssetType;
  vaultObjectIds: Array<Scalars['ID']['input']>;
};

export type UploadVaultQueueInput = {
  creatorId: Scalars['String']['input'];
  destination?: AssetType;
  vaultObjectIds: Array<Scalars['ID']['input']>;
};

export enum UserRoles {
  Admin = 'ADMIN',
  Creator = 'CREATOR',
  Fan = 'FAN',
  SuperViewer = 'SUPER_VIEWER'
}

export type UsersEntity = {
  __typename?: 'UsersEntity';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  bannerUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  creatorProfile: CreatorProfilesEntity;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fanProfile: FanProfilesEntity;
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastLoginAt?: Maybe<Scalars['DateTime']['output']>;
  lastName: Scalars['String']['output'];
  roles: Array<UserRoles>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type VaultLikeOutput = {
  __typename?: 'VaultLikeOutput';
  entity?: Maybe<VaultLikesEntity>;
  isLiked: Scalars['Boolean']['output'];
};

export type VaultLikesEntity = {
  __typename?: 'VaultLikesEntity';
  createdAt: Scalars['DateTime']['output'];
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  vault: VaultsEntity;
  vaultId: Scalars['String']['output'];
};

export type VaultObjectLikeOutput = {
  __typename?: 'VaultObjectLikeOutput';
  entity?: Maybe<VaultObjectsLikesEntity>;
  isLiked: Scalars['Boolean']['output'];
};

export type VaultObjectPurchasesEntity = {
  __typename?: 'VaultObjectPurchasesEntity';
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  purchasedAt: Scalars['DateTime']['output'];
  vaultObject: VaultObjectsEntity;
  vaultObjectId: Scalars['String']['output'];
};

export type VaultObjectsEntity = {
  __typename?: 'VaultObjectsEntity';
  asset?: Maybe<AssetsEntity>;
  contentType: ContentType;
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  fileType: FileType;
  id: Scalars['String']['output'];
  importedAt?: Maybe<Scalars['DateTime']['output']>;
  isLiked: Scalars['Boolean']['output'];
  isPurchased: Scalars['Boolean']['output'];
  likeCount: Scalars['Int']['output'];
  objectUrl: Scalars['String']['output'];
  status: DownloadStates;
  suffix?: Maybe<Scalars['Float']['output']>;
  unlockPrice?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  vault?: Maybe<VaultsEntity>;
  vaultId: Scalars['String']['output'];
  vaultObjectPurchases: Array<VaultObjectPurchasesEntity>;
  vaultObjectsLikes: Array<VaultObjectsLikesEntity>;
};

export type VaultObjectsLikesEntity = {
  __typename?: 'VaultObjectsLikesEntity';
  createdAt: Scalars['DateTime']['output'];
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  vaultObject: VaultObjectsEntity;
  vaultObjectId: Scalars['String']['output'];
};

export type VaultPurchasesEntity = {
  __typename?: 'VaultPurchasesEntity';
  fanId: Scalars['String']['output'];
  fanProfile: FanProfilesEntity;
  id: Scalars['String']['output'];
  purchasedAt: Scalars['DateTime']['output'];
  vault: VaultsEntity;
  vaultId: Scalars['String']['output'];
};

export type VaultsEntity = {
  __typename?: 'VaultsEntity';
  createdAt: Scalars['DateTime']['output'];
  creatorId: Scalars['String']['output'];
  creatorProfile: CreatorProfilesEntity;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isLiked: Scalars['Boolean']['output'];
  isPurchased: Scalars['Boolean']['output'];
  keywords?: Maybe<Array<Scalars['String']['output']>>;
  likeCount: Scalars['Int']['output'];
  objectCount: Scalars['Int']['output'];
  preview: Scalars['String']['output'];
  purchasedObjectCount: Scalars['Int']['output'];
  unlockPrice?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  vaultLikes?: Maybe<Array<VaultLikesEntity>>;
  vaultObjects: Array<VaultObjectsEntity>;
  vaultPurchases: Array<VaultPurchasesEntity>;
  viewCount?: Maybe<Scalars['Int']['output']>;
};

export type ZoneMembershipsEntity = {
  __typename?: 'ZoneMembershipsEntity';
  endsAt: Scalars['DateTime']['output'];
  fanId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  startedAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  zoneType: ZoneTypes;
};

export type ZonePlansEntity = {
  __typename?: 'ZonePlansEntity';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  unlockPrice: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  zoneType: ZoneTypes;
};

export enum ZoneTypes {
  Monthly = 'Monthly',
  Onetime = 'Onetime',
  Quarterly = 'Quarterly',
  Yearly = 'Yearly'
}

export type GetAllAssetsByAdminQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetAllAssetsByAdminQuery = { __typename?: 'Query', getAllAssetsByAdmin: { __typename?: 'GetAllAssetsOutput', count: number, assets: Array<{ __typename?: 'CreatorAssetsEntity', assetId: string, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, type: AssetType, asset: { __typename?: 'AssetsEntity', blurredUrl?: string | null, createdAt: any, fileType: FileType, id: string, mediaType: MediaType, mimeType: string, rawUrl: string, updatedAt: any }, creatorProfile: { __typename?: 'CreatorProfilesEntity', createdAt: any, creatorId: string, verified: boolean, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, id: string, lastLoginAt?: any | null, roles: Array<UserRoles>, username: string } } }> } };

export type GetCreatorAssetsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetCreatorAssetsQuery = { __typename?: 'Query', getCreatorAssets: Array<{ __typename?: 'CreatorAssetsEntity', assetId: string, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, type: AssetType, asset: { __typename?: 'AssetsEntity', blurredUrl?: string | null, createdAt: any, creatorId: string, fileType: FileType, id: string, mediaType: MediaType, mimeType: string, rawUrl: string, updatedAt: any, isPosted: boolean } }> };

export type GetPublicShortsAssetsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPublicShortsAssetsQuery = { __typename?: 'Query', getPublicShortsAssets: Array<{ __typename?: 'AssetsEntity', blurredUrl?: string | null, createdAt: any, creatorId: string, fileType: FileType, id: string, mediaType: MediaType, mimeType: string, rawUrl: string, updatedAt: any, vaultObjectId?: string | null, creatorProfile: { __typename?: 'CreatorProfilesEntity', creatorId: string, user: { __typename?: 'UsersEntity', id: string, username: string, avatarUrl?: string | null, bannerUrl?: string | null } }, vaultObject?: { __typename?: 'VaultObjectsEntity', id: string, isLiked: boolean, vault?: { __typename?: 'VaultsEntity', id: string, description?: string | null } | null } | null }> };

export type GetPublicAssetsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPublicAssetsQuery = { __typename?: 'Query', getPublicAssets: { __typename?: 'GetDefaultAssetsOutput', totalPages?: number | null, hasPrev?: boolean | null, hasNext?: boolean | null, count?: number | null, assets: Array<{ __typename?: 'CreatorAssetsEntity', assetId: string, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, type: AssetType, asset: { __typename?: 'AssetsEntity', blurredUrl?: string | null, createdAt: any, creatorId: string, fileType: FileType, id: string, mediaType: MediaType, mimeType: string, rawUrl: string, updatedAt: any, vaultObjectId?: string | null }, creatorProfile: { __typename?: 'CreatorProfilesEntity', bio?: string | null, creatorId: string, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, bannerUrl?: string | null, id: string, username: string } } }> } };

export type GetFanAssetsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetFanAssetsQuery = { __typename?: 'Query', getFanAssets: Array<{ __typename?: 'FanAssetsEntity', assetId: string, createdAt: any, deletedAt?: any | null, fanId: string, id: string, asset: { __typename?: 'AssetsEntity', createdAt: any, creatorId: string, fileType: FileType, id: string, mediaType: MediaType, mimeType: string, rawUrl: string, updatedAt: any, vaultObjectId?: string | null, viewCount?: number | null } }> };

export type GetPublicCreatorAssetsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPublicCreatorAssetsQuery = { __typename?: 'Query', getPublicCreatorAssets: { __typename?: 'GetDefaultAssetsOutput', count?: number | null, hasNext?: boolean | null, hasPrev?: boolean | null, totalPages?: number | null, assets: Array<{ __typename?: 'CreatorAssetsEntity', assetId: string, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, type: AssetType, asset: { __typename?: 'AssetsEntity', blurredUrl?: string | null, createdAt: any, creatorId: string, fileType: FileType, id: string, mediaType: MediaType, mimeType: string, rawUrl: string, updatedAt: any, vaultObjectId?: string | null, viewCount?: number | null, vaultObject?: { __typename?: 'VaultObjectsEntity', isLiked: boolean, likeCount: number, contentType: ContentType, id: string, isPurchased: boolean, vault?: { __typename?: 'VaultsEntity', description?: string | null, id: string, isPurchased: boolean, isLiked: boolean, keywords?: Array<string> | null, likeCount: number, preview: string } | null } | null } }> } };

export type DeleteCreatorAssetsMutationVariables = Exact<{
  input: DeleteCreatorAsset;
}>;


export type DeleteCreatorAssetsMutation = { __typename?: 'Mutation', deleteCreatorAssets: boolean };

export type DeleteAllAssetsMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAllAssetsMutation = { __typename?: 'Mutation', deleteAllAssets: boolean };

export type UpdateAssetsMutationVariables = Exact<{
  input: UpdateAssetsInput;
}>;


export type UpdateAssetsMutation = { __typename?: 'Mutation', updateAssets: Array<{ __typename?: 'CreatorAssetsEntity', assetId: string, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, type: AssetType, asset: { __typename?: 'AssetsEntity', blurredUrl?: string | null, createdAt: any, creatorId: string, fileType: FileType, id: string, mediaType: MediaType, mimeType: string, rawUrl: string, updatedAt: any } }> };

export type CreateChannelMutationVariables = Exact<{
  input: CreateChannelInput;
}>;


export type CreateChannelMutation = { __typename?: 'Mutation', createChannel: { __typename?: 'MessageChannelsEntity', createdAt: any, deletedAt?: any | null, id: string, isMessagingBlocked: boolean, isMuted: boolean, isPinned: boolean, isRestricted: boolean, label: string, lastMessageId?: string | null, totalEarning: number } };

export type GetPublicPostCommentsByPostIdQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPublicPostCommentsByPostIdQuery = { __typename?: 'Query', getPublicPostCommentsByPostId: Array<{ __typename?: 'PostCommentsEntity', comment: string, createdAt: any, deletedAt?: any | null, fanId: string, id: string, postId: string, updatedAt: any, fanProfile: { __typename?: 'FanProfilesEntity', fanId: string, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, username: string } } }> };

export type GetPostCommentsByPostIdQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPostCommentsByPostIdQuery = { __typename?: 'Query', getPostCommentsByPostId: Array<{ __typename?: 'PostCommentsEntity', comment: string, createdAt: any, deletedAt?: any | null, fanId: string, id: string, postId: string, updatedAt: any, fanProfile: { __typename?: 'FanProfilesEntity', user: { __typename?: 'UsersEntity', avatarUrl?: string | null, firstName: string, lastName: string, username: string } } }> };

export type GetAllCommentsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetAllCommentsQuery = { __typename?: 'Query', getAllComments: Array<{ __typename?: 'PostCommentsEntity', comment: string, createdAt: any, deletedAt?: any | null, fanId: string, id: string, postId: string, updatedAt: any, fanProfile: { __typename?: 'FanProfilesEntity', user: { __typename?: 'UsersEntity', avatarUrl?: string | null, firstName: string, lastName: string, username: string } } }> };

export type GetFollowingQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetFollowingQuery = { __typename?: 'Query', getFollowing: Array<{ __typename?: 'CreatorFollowsEntity', creatorId: string, fanId: string, followedAt: any, id: string, unFollowedAt?: any | null, creatorProfile: { __typename?: 'CreatorProfilesEntity', creatorId: string, assetCount?: number | null, viewCount?: number | null, vaultCount?: number | null, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, bannerUrl?: string | null, id: string, username: string } } }> };

export type GetCreatorsByAdminQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetCreatorsByAdminQuery = { __typename?: 'Query', getCreatorsByAdmin: { __typename?: 'GetAllCreatorsOutput', count: number, totalPages: number, hasNext: boolean, hasPrev: boolean, creators: Array<{ __typename?: 'UsersEntity', avatarUrl?: string | null, bannerUrl?: string | null, createdAt: any, deletedAt?: any | null, firstName: string, id: string, lastLoginAt?: any | null, lastName: string, roles: Array<UserRoles>, updatedAt: any, username: string, creatorProfile: { __typename?: 'CreatorProfilesEntity', vaultCount?: number | null, vaultObjectCount?: number | null, viewCount?: number | null, creatorId: string, assetCount?: number | null, fulfilledObjectCount: number, pendingObjectCount: number, processingObjectCount: number, rejectedObjectCount: number } }> } };

export type FollowCreatorMutationVariables = Exact<{
  input: FollowCreatorInput;
}>;


export type FollowCreatorMutation = { __typename?: 'Mutation', followCreator: { __typename?: 'CreatorFollowsEntity', creatorId: string, fanId: string, followedAt: any, id: string, unFollowedAt?: any | null, creatorProfile: { __typename?: 'CreatorProfilesEntity', creatorId: string, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, bannerUrl?: string | null, id: string, username: string } } } };

export type UnFollowCreatorMutationVariables = Exact<{
  input: UnFollowCreatorInput;
}>;


export type UnFollowCreatorMutation = { __typename?: 'Mutation', unFollowCreator: boolean };

export type GetRestrictedUsersQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetRestrictedUsersQuery = { __typename?: 'Query', getRestrictedUsers: Array<{ __typename?: 'CreatorRestrictsEntity', creatorId: string, fanId: string, id: string, restrictedAt: any, unRestrictedAt?: any | null, fanProfile: { __typename?: 'FanProfilesEntity', fanId: string, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, firstName: string, lastName: string, username: string } } }> };

export type UpdateCreatorProfileMutationVariables = Exact<{
  input: UpdateCreatorProfileInput;
}>;


export type UpdateCreatorProfileMutation = { __typename?: 'Mutation', updateCreatorProfile: { __typename?: 'CreatorProfilesEntity', allowsComment: boolean, allowsMessaging: boolean, bio?: string | null, creatorId: string, displayOnlineStatus: boolean, displayTotalPost: boolean, displayTotalSubscriber: boolean, themeColor: string, totalExclusivePost: number, totalPost: number, totalPublicPost: number, totalSubscriber: number } };

export type GetPublicCreatorProfileQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPublicCreatorProfileQuery = { __typename?: 'Query', getPublicCreatorProfile: { __typename?: 'CreatorProfilesEntity', allowsComment: boolean, allowsMessaging: boolean, bio?: string | null, creatorId: string, displayOnlineStatus: boolean, displayTotalPost: boolean, displayTotalSubscriber: boolean, themeColor: string, totalExclusivePost: number, totalPost: number, totalPublicPost: number, totalSubscriber: number, followersCount: number, assetCount?: number | null, vaultCount?: number | null, viewCount?: number | null, creatorType: CreatorType, isFollowing: boolean, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, bannerUrl?: string | null, createdAt: any, deletedAt?: any | null, firstName: string, id: string, lastLoginAt?: any | null, lastName: string, roles: Array<UserRoles>, updatedAt: any, username: string } } };

export type GetDefaultCreatorsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetDefaultCreatorsQuery = { __typename?: 'Query', getDefaultCreators: { __typename?: 'GetDefaultCreatorsOutput', count?: number | null, totalPages?: number | null, hasNext?: boolean | null, hasPrev?: boolean | null, creators: Array<{ __typename?: 'UsersEntity', avatarUrl?: string | null, bannerUrl?: string | null, createdAt: any, deletedAt?: any | null, firstName: string, id: string, lastLoginAt?: any | null, lastName: string, roles: Array<UserRoles>, updatedAt: any, username: string, creatorProfile: { __typename?: 'CreatorProfilesEntity', totalExclusivePost: number, totalPost: number, totalPublicPost: number, totalSubscriber: number, assetCount?: number | null, vaultCount?: number | null, viewCount?: number | null, isFollowing: boolean } }> } };

export type GetFollowersQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetFollowersQuery = { __typename?: 'Query', getFollowers: Array<{ __typename?: 'CreatorFollowsEntity', creatorId: string, fanId: string, followedAt: any, id: string, unFollowedAt?: any | null, fanProfile: { __typename?: 'FanProfilesEntity', user: { __typename?: 'UsersEntity', avatarUrl?: string | null, firstName: string, lastName: string, lastLoginAt?: any | null, username: string, bannerUrl?: string | null } } }> };

export type GetCreatorProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCreatorProfileQuery = { __typename?: 'Query', getCreatorProfile: { __typename?: 'CreatorProfilesEntity', allowsComment: boolean, allowsMessaging: boolean, bio?: string | null, creatorId: string, displayOnlineStatus: boolean, displayTotalPost: boolean, displayTotalSubscriber: boolean, themeColor: string, totalExclusivePost: number, totalPost: number, totalPublicPost: number, totalSubscriber: number, followersCount: number, assetCount?: number | null, viewCount?: number | null, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, bannerUrl?: string | null, createdAt: any, deletedAt?: any | null, firstName: string, id: string, lastLoginAt?: any | null, lastName: string, roles: Array<UserRoles>, updatedAt: any, username: string } } };

export type GetBlockedUsersQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetBlockedUsersQuery = { __typename?: 'Query', getBlockedUsers: Array<{ __typename?: 'CreatorBlocksEntity', blockedAt: any, creatorId: string, fanId: string, id: string, unBlockedAt?: any | null, fanProfile: { __typename?: 'FanProfilesEntity', fanId: string, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, firstName: string, lastName: string, username: string } } }> };

export type BlockFanMutationVariables = Exact<{
  input: BlockFanInput;
}>;


export type BlockFanMutation = { __typename?: 'Mutation', blockFan: boolean };

export type UnBlockFanMutationVariables = Exact<{
  input: BlockFanInput;
}>;


export type UnBlockFanMutation = { __typename?: 'Mutation', blockFan: boolean };

export type RestrictFanMutationVariables = Exact<{
  input: RestrictFanInput;
}>;


export type RestrictFanMutation = { __typename?: 'Mutation', restrictFan: boolean };

export type UnRestrictFanMutationVariables = Exact<{
  input: RestrictFanInput;
}>;


export type UnRestrictFanMutation = { __typename?: 'Mutation', restrictFan: boolean };

export type DownloadAllCreatorObjectsMutationVariables = Exact<{
  input: DownloadAllCreatorObjectsAsBatchInput;
}>;


export type DownloadAllCreatorObjectsMutation = { __typename?: 'Mutation', downloadAllCreatorObjects: string };

export type TerminateDownloadingMutationVariables = Exact<{ [key: string]: never; }>;


export type TerminateDownloadingMutation = { __typename?: 'Mutation', terminateDownloading: string };

export type GetFanProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFanProfileQuery = { __typename?: 'Query', getFanProfile?: { __typename?: 'FanProfilesEntity', fanId: string, appliedAt?: any | null, hasZoneMembership: boolean, currentZone?: { __typename?: 'ZoneMembershipsEntity', id: string, zoneType: ZoneTypes, startedAt: any, endsAt: any, updatedAt: any, fanId: string } | null, user: { __typename?: 'UsersEntity', firstName: string, lastName: string, username: string, avatarUrl?: string | null, bannerUrl?: string | null } } | null };

export type UpdateFanProfileMutationVariables = Exact<{
  input: UpdateUserProfileInput;
}>;


export type UpdateFanProfileMutation = { __typename?: 'Mutation', updateFanProfile: { __typename?: 'FanProfilesEntity', appliedAt?: any | null, createdAt: any, deletedAt?: any | null, fanId: string, isBanned: boolean, updatedAt: any, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, bannerUrl?: string | null, createdAt: any, deletedAt?: any | null, firstName: string, id: string, lastLoginAt?: any | null, lastName: string, roles: Array<UserRoles>, updatedAt: any, username: string } } };

export type InitiateCreatorObjectsImportMutationVariables = Exact<{
  input: CreateImportQueueInput;
}>;


export type InitiateCreatorObjectsImportMutation = { __typename?: 'Mutation', initiateCreatorObjectsImport: string };

export type InitiateMutationVariables = Exact<{
  input: CreateImportQueueInput;
}>;


export type InitiateMutation = { __typename?: 'Mutation', initiate: string };

export type PurchasePostMutationVariables = Exact<{
  input: CreatePurchasePostInput;
}>;


export type PurchasePostMutation = { __typename?: 'Mutation', purchasePost: { __typename?: 'PostPurchasesEntity', fanId: string, id: string, postId: string, purchasedAt: any } };

export type CreateTransactionMutationVariables = Exact<{
  input: CreateTransactionInput;
}>;


export type CreateTransactionMutation = { __typename?: 'Mutation', createTransaction: { __typename?: 'TransactionOutput', requiresAction?: string | null, clientSecret?: string | null } };

export type AttachPaymentMethodMutationVariables = Exact<{
  input: AttachPaymentMethodInput;
}>;


export type AttachPaymentMethodMutation = { __typename?: 'Mutation', attachPaymentMethod: { __typename?: 'AttachPaymentMethodOutput', paymentMethodId?: string | null, nextActionUrl?: string | null, clientSecret?: string | null } };

export type GetCardQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCardQuery = { __typename?: 'Query', getCard: { __typename?: 'CardOutput', id: string, card: { __typename?: 'CardInfo', brand: string, country: string, display_brand: string, exp_month: number, exp_year: number, fingerprint: string, funding: string, generated_from?: string | null, last4: string, regulated_status: string, wallet?: boolean | null, checks: { __typename?: 'CardChecks', address_line1_check?: boolean | null, address_postal_code_check?: string | null, cvc_check?: string | null }, networks: { __typename?: 'CardNetworks', available: Array<string>, preferred?: boolean | null }, three_d_secure_usage: { __typename?: 'ThreeDSecureUsage', supported: boolean } }, customer: { __typename?: 'CustomerInfo', address?: string | null, balance: number, created: number, currency?: string | null, default_source?: string | null, delinquent: boolean, description?: string | null, discount?: string | null, email: string, id: string, invoice_prefix: string, livemode: boolean, name: string, next_invoice_sequence: number, object: string, phone?: string | null, preferred_locales: Array<string>, shipping?: string | null, tax_exempt: string, test_clock?: string | null, invoice_settings: { __typename?: 'InvoiceSettings', default_payment_method?: string | null, footer?: string | null }, metadata: { __typename?: 'CustomerMetadata', userId: string } } } };

export type GetPublicPostsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPublicPostsQuery = { __typename?: 'Query', getPublicPosts: Array<{ __typename?: 'PostsEntity', caption?: string | null, commentCount: number, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, lastCommentId?: string | null, likeCount: number, saveCount: number, shareCount: number, preview: string, updatedAt: any, isLiked: boolean, objectCount: number, types: Array<PostTypes>, isPurchased: boolean, unlockPrice?: number | null }> };

export type GetPublicPostByIdQueryVariables = Exact<{
  input: GetPostInput;
}>;


export type GetPublicPostByIdQuery = { __typename?: 'Query', getPublicPostById: { __typename?: 'PostsEntity', caption?: string | null, commentCount: number, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, lastCommentId?: string | null, likeCount: number, saveCount: number, shareCount: number, preview: string, updatedAt: any, isLiked: boolean, types: Array<PostTypes>, unlockPrice?: number | null, isPurchased: boolean, creatorProfile: { __typename?: 'CreatorProfilesEntity', assetCount?: number | null, creatorId: string, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, bannerUrl?: string | null, id: string, username: string } } } };

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'PostCommentsEntity', comment: string, createdAt: any, deletedAt?: any | null, fanId: string, id: string, postId: string, updatedAt: any } };

export type UpdateCommentMutationVariables = Exact<{
  input: UpdateCommentInput;
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'PostCommentsEntity', comment: string, createdAt: any, deletedAt?: any | null, fanId: string, id: string, postId: string, updatedAt: any } };

export type DeleteCommentMutationVariables = Exact<{
  input: DeleteCommentInput;
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type LikePostMutationVariables = Exact<{
  input: LikePostInput;
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost?: { __typename?: 'PostLikesEntity', id: string, fanId: string, createdAt: any, postId: string, post: { __typename?: 'PostsEntity', caption?: string | null, commentCount: number, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, isLiked: boolean, lastCommentId?: string | null, likeCount: number, preview: string, saveCount: number, shareCount: number, totalEarning: number, types: Array<PostTypes>, unlockPrice?: number | null, updatedAt: any, viewCount: number } } | null };

export type SavePostMutationVariables = Exact<{
  input: SavePostInput;
}>;


export type SavePostMutation = { __typename?: 'Mutation', savePost: { __typename?: 'PostsEntity', caption?: string | null, commentCount: number, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, likeCount: number, saveCount: number, shareCount: number, totalEarning: number, types: Array<PostTypes>, unlockPrice?: number | null, updatedAt: any } };

export type GetLikedPostsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetLikedPostsQuery = { __typename?: 'Query', getLikedPosts: Array<{ __typename?: 'PostLikesEntity', createdAt: any, fanId: string, id: string, postId: string, post: { __typename?: 'PostsEntity', caption?: string | null, commentCount: number, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, isLiked: boolean, lastCommentId?: string | null, likeCount: number, preview: string, saveCount: number, shareCount: number, totalEarning: number, types: Array<PostTypes>, unlockPrice?: number | null, updatedAt: any, viewCount: number } }> };

export type GetPostsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: Array<{ __typename?: 'PostsEntity', caption?: string | null, commentCount: number, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, lastCommentId?: string | null, likeCount: number, saveCount: number, shareCount: number, totalEarning: number, types: Array<PostTypes>, preview: string, unlockPrice?: number | null, updatedAt: any, postAssets: Array<{ __typename?: 'PostAssetsEntity', id: string, deletedAt?: any | null, assetId: string, createdAt: any, asset: { __typename?: 'AssetsEntity', blurredUrl?: string | null, createdAt: any, creatorId: string, fileType: FileType, id: string, mediaType: MediaType, mimeType: string, rawUrl: string, updatedAt: any, vaultObjectId?: string | null, viewCount?: number | null } }> }> };

export type GetPostsInfoQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPostsInfoQuery = { __typename?: 'Query', getPostsInfo: Array<{ __typename?: 'GetPostsInfoOutput', caption?: string | null, commentCount: number, viewCount: number, preview?: string | null, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, lastCommentId?: string | null, latestComment?: string | null, likeCount: number, saveCount: number, shareCount: number, totalEarning: number, types: Array<PostTypes>, unlockPrice?: number | null, updatedAt: any }> };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostsEntity', caption?: string | null, commentCount: number, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, lastCommentId?: string | null, likeCount: number, saveCount: number, shareCount: number, totalEarning: number, types: Array<PostTypes>, unlockPrice?: number | null, updatedAt: any } };

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'PostsEntity', caption?: string | null, commentCount: number, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, likeCount: number, saveCount: number, shareCount: number, totalEarning: number, types: Array<PostTypes>, unlockPrice?: number | null, updatedAt: any } };

export type DeletePostMutationVariables = Exact<{
  input: DeletePostInput;
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type DeletePostsMutationVariables = Exact<{
  input: DeletePostsInput;
}>;


export type DeletePostsMutation = { __typename?: 'Mutation', deletePosts: boolean };

export type GetPostAssetsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPostAssetsQuery = { __typename?: 'Query', getPostAssets: Array<{ __typename?: 'PostAssetsEntity', assetId: string, createdAt: any, deletedAt?: any | null, id: string, postId: string, updatedAt: any, asset: { __typename?: 'AssetsEntity', blurredUrl?: string | null, createdAt: any, creatorId: string, fileType: FileType, id: string, mediaType: MediaType, mimeType: string, rawUrl: string, updatedAt: any, vaultObjectId?: string | null, viewCount?: number | null } }> };

export type GetSinglePostQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetSinglePostQuery = { __typename?: 'Query', getSinglePost: { __typename?: 'PostsEntity', blurredPreview: string, caption?: string | null, commentCount: number, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, isLiked: boolean, isPurchased: boolean, lastCommentId?: string | null, likeCount: number, objectCount: number, preview: string, saveCount: number, shareCount: number, totalEarning: number, types: Array<PostTypes>, unlockPrice?: number | null, updatedAt: any, viewCount: number, postAssets: Array<{ __typename?: 'PostAssetsEntity', assetId: string, asset: { __typename?: 'AssetsEntity', isPosted: boolean, mediaType: MediaType, mimeType: string, rawUrl: string, viewCount?: number | null, updatedAt: any, id: string, fileType: FileType, createdAt: any } }>, latestComment?: { __typename?: 'PostCommentsEntity', comment: string, createdAt: any, deletedAt?: any | null, fanId: string, id: string, postId: string, updatedAt: any, fanProfile: { __typename?: 'FanProfilesEntity', fanId: string, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, lastName: string, firstName: string, username: string } } } | null } };

export type GetPublicSinglePostQueryVariables = Exact<{
  input: GetPostInput;
}>;


export type GetPublicSinglePostQuery = { __typename?: 'Query', getPublicSinglePost: { __typename?: 'PostsEntity', blurredPreview: string, caption?: string | null, commentCount: number, createdAt: any, creatorId: string, deletedAt?: any | null, id: string, isLiked: boolean, isPurchased: boolean, lastCommentId?: string | null, likeCount: number, objectCount: number, preview: string, saveCount: number, shareCount: number, totalEarning: number, types: Array<PostTypes>, unlockPrice?: number | null, updatedAt: any, viewCount: number, postAssets: Array<{ __typename?: 'PostAssetsEntity', assetId: string, asset: { __typename?: 'AssetsEntity', isPosted: boolean, mediaType: MediaType, mimeType: string, rawUrl: string, viewCount?: number | null, updatedAt: any, id: string, fileType: FileType, createdAt: any } }>, latestComment?: { __typename?: 'PostCommentsEntity', comment: string, createdAt: any, deletedAt?: any | null, fanId: string, id: string, postId: string, updatedAt: any, fanProfile: { __typename?: 'FanProfilesEntity', fanId: string, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, lastName: string, firstName: string, username: string } } } | null } };

export type GetPostAnalyticsQueryVariables = Exact<{
  input: PostStatsInput;
}>;


export type GetPostAnalyticsQuery = { __typename?: 'Query', getPostAnalytics: Array<{ __typename?: 'PostStatAnalyticsOutput', commentCount?: number | null, timestamp: any, id?: string | null, likeCount?: number | null, saveCount?: number | null, shareCount?: number | null, totalEarning?: number | null, unlockPrice?: number | null, viewCount?: number | null }> };

export type GetPublicTagsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPublicTagsQuery = { __typename?: 'Query', getPublicTags: Array<{ __typename?: 'TagsEntity', id: string, label: string }> };

export type SearchTagsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type SearchTagsQuery = { __typename?: 'Query', searchTags: Array<{ __typename?: 'TagsEntity', id: string, label: string }> };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type GetUserQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'GetUserOutput', avatarUrl?: string | null, bannerUrl?: string | null, createdAt: any, deletedAt?: any | null, firstName: string, id: string, lastLoginAt?: any | null, lastName: string, roles: Array<UserRoles>, updatedAt: any, username: string, pendingCount: number, rejectedCount: number, processingCount: number, fulfilledCount: number } };

export type UpdateAllCreatorProfilesMutationVariables = Exact<{
  input: UpdateUsersInput;
}>;


export type UpdateAllCreatorProfilesMutation = { __typename?: 'Mutation', updateAllCreatorProfiles: string };

export type GetPublicSingleVaultQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPublicSingleVaultQuery = { __typename?: 'Query', getPublicSingleVault: { __typename?: 'VaultsEntity', createdAt: any, creatorId: string, deletedAt?: any | null, description?: string | null, id: string, keywords?: Array<string> | null, preview: string, updatedAt: any, isLiked: boolean, likeCount: number, isPurchased: boolean, unlockPrice?: number | null, objectCount: number, creatorProfile: { __typename?: 'CreatorProfilesEntity', assetCount?: number | null, creatorId: string, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, bannerUrl?: string | null, id: string, username: string } }, vaultObjects: Array<{ __typename?: 'VaultObjectsEntity', id: string, unlockPrice?: number | null, isPurchased: boolean, contentType: ContentType, fileType: FileType, status: DownloadStates, vaultId: string, isLiked: boolean, likeCount: number, asset?: { __typename?: 'AssetsEntity', blurredUrl?: string | null, createdAt: any, creatorId: string, fileType: FileType, id: string, mediaType: MediaType, mimeType: string, rawUrl: string, updatedAt: any, vaultObjectId?: string | null } | null }> } };

export type GetLikedVaultsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetLikedVaultsQuery = { __typename?: 'Query', getLikedVaults: Array<{ __typename?: 'VaultLikesEntity', createdAt: any, fanId: string, id: string, vaultId: string, vault: { __typename?: 'VaultsEntity', createdAt: any, creatorId: string, deletedAt?: any | null, description?: string | null, id: string, keywords?: Array<string> | null, likeCount: number, preview: string, updatedAt: any, viewCount?: number | null, isLiked: boolean, isPurchased: boolean } }> };

export type LikeVaultObjectMutationVariables = Exact<{
  input: PaginationInput;
}>;


export type LikeVaultObjectMutation = { __typename?: 'Mutation', likeVaultObject: { __typename?: 'VaultObjectLikeOutput', isLiked: boolean, entity?: { __typename?: 'VaultObjectsLikesEntity', createdAt: any, fanId: string, id: string, vaultObjectId: string, vaultObject: { __typename?: 'VaultObjectsEntity', contentType: ContentType, createdAt: any, deletedAt?: any | null, fileType: FileType, id: string, importedAt?: any | null, likeCount: number, status: DownloadStates, suffix?: number | null, updatedAt: any, vaultId: string, asset?: { __typename?: 'AssetsEntity', blurredUrl?: string | null, createdAt: any, creatorId: string, fileType: FileType, id: string, mediaType: MediaType, mimeType: string, rawUrl: string, updatedAt: any, vaultObjectId?: string | null, viewCount?: number | null } | null } } | null } };

export type LikeVaultMutationVariables = Exact<{
  input: PaginationInput;
}>;


export type LikeVaultMutation = { __typename?: 'Mutation', likeVault: { __typename?: 'VaultLikeOutput', isLiked: boolean, entity?: { __typename?: 'VaultLikesEntity', createdAt: any, fanId: string, id: string, vaultId: string, vault: { __typename?: 'VaultsEntity', createdAt: any, creatorId: string, deletedAt?: any | null, description?: string | null, id: string, keywords?: Array<string> | null, likeCount: number, preview: string, updatedAt: any, viewCount?: number | null } } | null } };

export type GetLikedVaultObjectsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetLikedVaultObjectsQuery = { __typename?: 'Query', getLikedVaultObjects: Array<{ __typename?: 'VaultObjectsLikesEntity', createdAt: any, fanId: string, id: string, vaultObjectId: string, vaultObject: { __typename?: 'VaultObjectsEntity', contentType: ContentType, fileType: FileType, id: string, status: DownloadStates, isLiked: boolean, likeCount: number, asset?: { __typename?: 'AssetsEntity', blurredUrl?: string | null, createdAt: any, creatorId: string, fileType: FileType, id: string, mediaType: MediaType, mimeType: string, rawUrl: string, updatedAt: any, vaultObjectId?: string | null, viewCount?: number | null } | null } }> };

export type GetAllVaultsByAdminQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetAllVaultsByAdminQuery = { __typename?: 'Query', getAllVaultsByAdmin: { __typename?: 'GetAllVaultsOutput', count: number, vaults: Array<{ __typename?: 'VaultObjectsEntity', createdAt: any, deletedAt?: any | null, id: string, objectUrl: string, status: DownloadStates, updatedAt: any, vaultId: string }> } };

export type GetCreatorVaultObjectsByAdminQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetCreatorVaultObjectsByAdminQuery = { __typename?: 'Query', getCreatorVaultObjectsByAdmin: { __typename?: 'GetCreatorVaultObjectsOutput', count: number, vaultObjects: Array<{ __typename?: 'VaultObjectsEntity', createdAt: any, deletedAt?: any | null, id: string, objectUrl: string, status: DownloadStates, fileType: FileType, updatedAt: any, vaultId: string, vault?: { __typename?: 'VaultsEntity', createdAt: any, creatorId: string, deletedAt?: any | null, id: string, updatedAt: any, url: string, creatorProfile: { __typename?: 'CreatorProfilesEntity', creatorId: string, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, id: string, username: string } } } | null }> } };

export type GetPublicVaultsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPublicVaultsQuery = { __typename?: 'Query', getPublicVaults: Array<{ __typename?: 'VaultsEntity', creatorId: string, description?: string | null, id: string, keywords?: Array<string> | null, isLiked: boolean, likeCount: number, createdAt: any, preview: string, objectCount: number, isPurchased: boolean, unlockPrice?: number | null, creatorProfile: { __typename?: 'CreatorProfilesEntity', creatorId: string, user: { __typename?: 'UsersEntity', avatarUrl?: string | null, bannerUrl?: string | null, id: string, username: string } } }> };

export type GetPublicVaultObjectsQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetPublicVaultObjectsQuery = { __typename?: 'Query', getPublicVaultObjects: Array<{ __typename?: 'VaultObjectsEntity', contentType: ContentType, createdAt: any, deletedAt?: any | null, fileType: FileType, id: string, importedAt?: any | null, likeCount: number, objectUrl: string, status: DownloadStates, suffix?: number | null, updatedAt: any, vaultId: string, asset?: { __typename?: 'AssetsEntity', blurredUrl?: string | null, createdAt: any, creatorId: string, fileType: FileType, id: string, mediaType: MediaType, mimeType: string, rawUrl: string, updatedAt: any, vaultObjectId?: string | null, viewCount?: number | null } | null }> };

export type DownloadCreatorObjectsAsBatchMutationVariables = Exact<{
  input: UploadVaultQueueInput;
}>;


export type DownloadCreatorObjectsAsBatchMutation = { __typename?: 'Mutation', downloadCreatorObjectsAsBatch: string };

export type TerminateMutationVariables = Exact<{ [key: string]: never; }>;


export type TerminateMutation = { __typename?: 'Mutation', terminate: boolean };

export type GetTotalObjectsAsTypeQueryVariables = Exact<{
  input: PaginationInput;
}>;


export type GetTotalObjectsAsTypeQuery = { __typename?: 'Query', getTotalObjectsAsType: number };

export type CleanUpVaultObjectsOfACreatorMutationVariables = Exact<{
  input: CleanUpVaultInput;
}>;


export type CleanUpVaultObjectsOfACreatorMutation = { __typename?: 'Mutation', cleanUpVaultObjectsOfACreator: number };

export type GetCountOfObjectsOfEachTypeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCountOfObjectsOfEachTypeQuery = { __typename?: 'Query', getCountOfObjectsOfEachType: { __typename?: 'GetAllObjectsCountOutput', fulfilled: number, pending: number, processing: number, rejected: number } };

export type UpdatePreviewOfDefaultVaultsMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdatePreviewOfDefaultVaultsMutation = { __typename?: 'Mutation', updatePreviewOfVaults: string };

export type GetZonePlansQueryVariables = Exact<{ [key: string]: never; }>;


export type GetZonePlansQuery = { __typename?: 'Query', getZonePlans: Array<{ __typename?: 'ZonePlansEntity', id: string, unlockPrice: number, zoneType: ZoneTypes, createdAt: any, updatedAt: any }> };


export const GetAllAssetsByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAssetsByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAssetsByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blurredUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creatorProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginAt"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllAssetsByAdminQuery, GetAllAssetsByAdminQueryVariables>;
export const GetCreatorAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCreatorAssets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCreatorAssets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blurredUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPosted"}}]}}]}}]}}]} as unknown as DocumentNode<GetCreatorAssetsQuery, GetCreatorAssetsQueryVariables>;
export const GetPublicShortsAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicShortsAssets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicShortsAssets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blurredUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjectId"}},{"kind":"Field","name":{"kind":"Name","value":"creatorProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vaultObject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicShortsAssetsQuery, GetPublicShortsAssetsQueryVariables>;
export const GetPublicAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicAssets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicAssets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrev"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blurredUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjectId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creatorProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicAssetsQuery, GetPublicAssetsQueryVariables>;
export const GetFanAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFanAssets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFanAssets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjectId"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}}]}}]}}]} as unknown as DocumentNode<GetFanAssetsQuery, GetFanAssetsQueryVariables>;
export const GetPublicCreatorAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicCreatorAssets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicCreatorAssets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrev"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"assets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blurredUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjectId"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPurchased"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPurchased"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicCreatorAssetsQuery, GetPublicCreatorAssetsQueryVariables>;
export const DeleteCreatorAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCreatorAssets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteCreatorAsset"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCreatorAssets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteCreatorAssetsMutation, DeleteCreatorAssetsMutationVariables>;
export const DeleteAllAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAllAssets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAllAssets"}}]}}]} as unknown as DocumentNode<DeleteAllAssetsMutation, DeleteAllAssetsMutationVariables>;
export const UpdateAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAssets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAssetsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAssets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blurredUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAssetsMutation, UpdateAssetsMutationVariables>;
export const CreateChannelDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateChannel"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateChannelInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createChannel"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isMessagingBlocked"}},{"kind":"Field","name":{"kind":"Name","value":"isMuted"}},{"kind":"Field","name":{"kind":"Name","value":"isPinned"}},{"kind":"Field","name":{"kind":"Name","value":"isRestricted"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessageId"}},{"kind":"Field","name":{"kind":"Name","value":"totalEarning"}}]}}]}}]} as unknown as DocumentNode<CreateChannelMutation, CreateChannelMutationVariables>;
export const GetPublicPostCommentsByPostIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicPostCommentsByPostId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicPostCommentsByPostId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicPostCommentsByPostIdQuery, GetPublicPostCommentsByPostIdQueryVariables>;
export const GetPostCommentsByPostIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostCommentsByPostId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostCommentsByPostId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPostCommentsByPostIdQuery, GetPostCommentsByPostIdQueryVariables>;
export const GetAllCommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllComments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAllCommentsQuery, GetAllCommentsQueryVariables>;
export const GetFollowingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFollowing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"followedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unFollowedAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"assetCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}},{"kind":"Field","name":{"kind":"Name","value":"vaultCount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFollowingQuery, GetFollowingQueryVariables>;
export const GetCreatorsByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCreatorsByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCreatorsByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrev"}},{"kind":"Field","name":{"kind":"Name","value":"creators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"creatorProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vaultCount"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjectCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"assetCount"}},{"kind":"Field","name":{"kind":"Name","value":"vaultCount"}},{"kind":"Field","name":{"kind":"Name","value":"fulfilledObjectCount"}},{"kind":"Field","name":{"kind":"Name","value":"pendingObjectCount"}},{"kind":"Field","name":{"kind":"Name","value":"processingObjectCount"}},{"kind":"Field","name":{"kind":"Name","value":"rejectedObjectCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCreatorsByAdminQuery, GetCreatorsByAdminQueryVariables>;
export const FollowCreatorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FollowCreator"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FollowCreatorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followCreator"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"followedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unFollowedAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FollowCreatorMutation, FollowCreatorMutationVariables>;
export const UnFollowCreatorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnFollowCreator"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UnFollowCreatorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unFollowCreator"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UnFollowCreatorMutation, UnFollowCreatorMutationVariables>;
export const GetRestrictedUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRestrictedUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRestrictedUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"restrictedAt"}},{"kind":"Field","name":{"kind":"Name","value":"unRestrictedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetRestrictedUsersQuery, GetRestrictedUsersQueryVariables>;
export const UpdateCreatorProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCreatorProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCreatorProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCreatorProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowsComment"}},{"kind":"Field","name":{"kind":"Name","value":"allowsMessaging"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOnlineStatus"}},{"kind":"Field","name":{"kind":"Name","value":"displayTotalPost"}},{"kind":"Field","name":{"kind":"Name","value":"displayTotalSubscriber"}},{"kind":"Field","name":{"kind":"Name","value":"themeColor"}},{"kind":"Field","name":{"kind":"Name","value":"totalExclusivePost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPublicPost"}},{"kind":"Field","name":{"kind":"Name","value":"totalSubscriber"}},{"kind":"Field","name":{"kind":"Name","value":"themeColor"}}]}}]}}]} as unknown as DocumentNode<UpdateCreatorProfileMutation, UpdateCreatorProfileMutationVariables>;
export const GetPublicCreatorProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicCreatorProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicCreatorProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowsComment"}},{"kind":"Field","name":{"kind":"Name","value":"allowsMessaging"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOnlineStatus"}},{"kind":"Field","name":{"kind":"Name","value":"displayTotalPost"}},{"kind":"Field","name":{"kind":"Name","value":"displayTotalSubscriber"}},{"kind":"Field","name":{"kind":"Name","value":"themeColor"}},{"kind":"Field","name":{"kind":"Name","value":"totalExclusivePost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPublicPost"}},{"kind":"Field","name":{"kind":"Name","value":"totalSubscriber"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"assetCount"}},{"kind":"Field","name":{"kind":"Name","value":"vaultCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}},{"kind":"Field","name":{"kind":"Name","value":"creatorType"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicCreatorProfileQuery, GetPublicCreatorProfileQueryVariables>;
export const GetDefaultCreatorsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDefaultCreators"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDefaultCreators"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNext"}},{"kind":"Field","name":{"kind":"Name","value":"hasPrev"}},{"kind":"Field","name":{"kind":"Name","value":"creators"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"creatorProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalExclusivePost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPublicPost"}},{"kind":"Field","name":{"kind":"Name","value":"totalSubscriber"}},{"kind":"Field","name":{"kind":"Name","value":"assetCount"}},{"kind":"Field","name":{"kind":"Name","value":"vaultCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDefaultCreatorsQuery, GetDefaultCreatorsQueryVariables>;
export const GetFollowersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFollowers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFollowers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"followedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unFollowedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFollowersQuery, GetFollowersQueryVariables>;
export const GetCreatorProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCreatorProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCreatorProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowsComment"}},{"kind":"Field","name":{"kind":"Name","value":"allowsMessaging"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"displayOnlineStatus"}},{"kind":"Field","name":{"kind":"Name","value":"displayTotalPost"}},{"kind":"Field","name":{"kind":"Name","value":"displayTotalSubscriber"}},{"kind":"Field","name":{"kind":"Name","value":"themeColor"}},{"kind":"Field","name":{"kind":"Name","value":"totalExclusivePost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPost"}},{"kind":"Field","name":{"kind":"Name","value":"totalPublicPost"}},{"kind":"Field","name":{"kind":"Name","value":"totalSubscriber"}},{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"assetCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetCreatorProfileQuery, GetCreatorProfileQueryVariables>;
export const GetBlockedUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBlockedUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBlockedUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockedAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unBlockedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBlockedUsersQuery, GetBlockedUsersQueryVariables>;
export const BlockFanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BlockFan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BlockFanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockFan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<BlockFanMutation, BlockFanMutationVariables>;
export const UnBlockFanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnBlockFan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BlockFanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blockFan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UnBlockFanMutation, UnBlockFanMutationVariables>;
export const RestrictFanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RestrictFan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RestrictFanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restrictFan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RestrictFanMutation, RestrictFanMutationVariables>;
export const UnRestrictFanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnRestrictFan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RestrictFanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"restrictFan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UnRestrictFanMutation, UnRestrictFanMutationVariables>;
export const DownloadAllCreatorObjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DownloadAllCreatorObjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DownloadAllCreatorObjectsAsBatchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"downloadAllCreatorObjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DownloadAllCreatorObjectsMutation, DownloadAllCreatorObjectsMutationVariables>;
export const TerminateDownloadingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TerminateDownloading"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"terminateDownloading"}}]}}]} as unknown as DocumentNode<TerminateDownloadingMutation, TerminateDownloadingMutationVariables>;
export const GetFanProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFanProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFanProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"appliedAt"}},{"kind":"Field","name":{"kind":"Name","value":"hasZoneMembership"}},{"kind":"Field","name":{"kind":"Name","value":"currentZone"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"zoneType"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetFanProfileQuery, GetFanProfileQueryVariables>;
export const UpdateFanProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFanProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFanProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appliedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"isBanned"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateFanProfileMutation, UpdateFanProfileMutationVariables>;
export const InitiateCreatorObjectsImportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InitiateCreatorObjectsImport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateImportQueueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initiateCreatorObjectsImport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<InitiateCreatorObjectsImportMutation, InitiateCreatorObjectsImportMutationVariables>;
export const InitiateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Initiate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateImportQueueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initiate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<InitiateMutation, InitiateMutationVariables>;
export const PurchasePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PurchasePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePurchasePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"purchasePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"purchasedAt"}}]}}]}}]} as unknown as DocumentNode<PurchasePostMutation, PurchasePostMutationVariables>;
export const CreateTransactionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTransaction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTransactionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTransaction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requiresAction"}},{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}}]}}]}}]} as unknown as DocumentNode<CreateTransactionMutation, CreateTransactionMutationVariables>;
export const AttachPaymentMethodDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AttachPaymentMethod"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AttachPaymentMethodInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attachPaymentMethod"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentMethodId"}},{"kind":"Field","name":{"kind":"Name","value":"nextActionUrl"}},{"kind":"Field","name":{"kind":"Name","value":"clientSecret"}}]}}]}}]} as unknown as DocumentNode<AttachPaymentMethodMutation, AttachPaymentMethodMutationVariables>;
export const GetCardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"card"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"display_brand"}},{"kind":"Field","name":{"kind":"Name","value":"exp_month"}},{"kind":"Field","name":{"kind":"Name","value":"exp_year"}},{"kind":"Field","name":{"kind":"Name","value":"fingerprint"}},{"kind":"Field","name":{"kind":"Name","value":"funding"}},{"kind":"Field","name":{"kind":"Name","value":"generated_from"}},{"kind":"Field","name":{"kind":"Name","value":"last4"}},{"kind":"Field","name":{"kind":"Name","value":"regulated_status"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"}},{"kind":"Field","name":{"kind":"Name","value":"checks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address_line1_check"}},{"kind":"Field","name":{"kind":"Name","value":"address_postal_code_check"}},{"kind":"Field","name":{"kind":"Name","value":"cvc_check"}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"available"}},{"kind":"Field","name":{"kind":"Name","value":"preferred"}}]}},{"kind":"Field","name":{"kind":"Name","value":"three_d_secure_usage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"supported"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"default_source"}},{"kind":"Field","name":{"kind":"Name","value":"delinquent"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invoice_prefix"}},{"kind":"Field","name":{"kind":"Name","value":"livemode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"next_invoice_sequence"}},{"kind":"Field","name":{"kind":"Name","value":"object"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"preferred_locales"}},{"kind":"Field","name":{"kind":"Name","value":"shipping"}},{"kind":"Field","name":{"kind":"Name","value":"tax_exempt"}},{"kind":"Field","name":{"kind":"Name","value":"test_clock"}},{"kind":"Field","name":{"kind":"Name","value":"invoice_settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"default_payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"footer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCardQuery, GetCardQueryVariables>;
export const GetPublicPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastCommentId"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"saveCount"}},{"kind":"Field","name":{"kind":"Name","value":"shareCount"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"objectCount"}},{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"isPurchased"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}}]}}]}}]} as unknown as DocumentNode<GetPublicPostsQuery, GetPublicPostsQueryVariables>;
export const GetPublicPostByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicPostById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetPostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicPostById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastCommentId"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"saveCount"}},{"kind":"Field","name":{"kind":"Name","value":"shareCount"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"isPurchased"}},{"kind":"Field","name":{"kind":"Name","value":"creatorProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetCount"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicPostByIdQuery, GetPublicPostByIdQueryVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const UpdateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const LikePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LikePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"lastCommentId"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"saveCount"}},{"kind":"Field","name":{"kind":"Name","value":"shareCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalEarning"}},{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}}]}}]}}]} as unknown as DocumentNode<LikePostMutation, LikePostMutationVariables>;
export const SavePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SavePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SavePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"savePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"saveCount"}},{"kind":"Field","name":{"kind":"Name","value":"shareCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalEarning"}},{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<SavePostMutation, SavePostMutationVariables>;
export const GetLikedPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLikedPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLikedPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"post"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"lastCommentId"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"saveCount"}},{"kind":"Field","name":{"kind":"Name","value":"shareCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalEarning"}},{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}}]}}]}}]} as unknown as DocumentNode<GetLikedPostsQuery, GetLikedPostsQueryVariables>;
export const GetPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastCommentId"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"saveCount"}},{"kind":"Field","name":{"kind":"Name","value":"shareCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalEarning"}},{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"postAssets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blurredUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjectId"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPostsQuery, GetPostsQueryVariables>;
export const GetPostsInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostsInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostsInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastCommentId"}},{"kind":"Field","name":{"kind":"Name","value":"latestComment"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"saveCount"}},{"kind":"Field","name":{"kind":"Name","value":"shareCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalEarning"}},{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetPostsInfoQuery, GetPostsInfoQueryVariables>;
export const CreatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastCommentId"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"saveCount"}},{"kind":"Field","name":{"kind":"Name","value":"shareCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalEarning"}},{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const UpdatePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"saveCount"}},{"kind":"Field","name":{"kind":"Name","value":"shareCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalEarning"}},{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdatePostMutation, UpdatePostMutationVariables>;
export const DeletePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeletePostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>;
export const DeletePostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeletePostsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePosts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeletePostsMutation, DeletePostsMutationVariables>;
export const GetPostAssetsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostAssets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostAssets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blurredUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjectId"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostAssetsQuery, GetPostAssetsQueryVariables>;
export const GetSinglePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSinglePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSinglePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blurredPreview"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isPurchased"}},{"kind":"Field","name":{"kind":"Name","value":"lastCommentId"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"objectCount"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"saveCount"}},{"kind":"Field","name":{"kind":"Name","value":"shareCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalEarning"}},{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}},{"kind":"Field","name":{"kind":"Name","value":"postAssets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isPosted"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"latestComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSinglePostQuery, GetSinglePostQueryVariables>;
export const GetPublicSinglePostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicSinglePost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetPostInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicSinglePost"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blurredPreview"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isPurchased"}},{"kind":"Field","name":{"kind":"Name","value":"lastCommentId"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"objectCount"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"saveCount"}},{"kind":"Field","name":{"kind":"Name","value":"shareCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalEarning"}},{"kind":"Field","name":{"kind":"Name","value":"types"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}},{"kind":"Field","name":{"kind":"Name","value":"postAssets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isPosted"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"latestComment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"postId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicSinglePostQuery, GetPublicSinglePostQueryVariables>;
export const GetPostAnalyticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostAnalytics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostStatsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostAnalytics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commentCount"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"saveCount"}},{"kind":"Field","name":{"kind":"Name","value":"shareCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalEarning"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}}]}}]} as unknown as DocumentNode<GetPostAnalyticsQuery, GetPostAnalyticsQueryVariables>;
export const GetPublicTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<GetPublicTagsQuery, GetPublicTagsQueryVariables>;
export const SearchTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<SearchTagsQuery, SearchTagsQueryVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"pendingCount"}},{"kind":"Field","name":{"kind":"Name","value":"rejectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"processingCount"}},{"kind":"Field","name":{"kind":"Name","value":"fulfilledCount"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const UpdateAllCreatorProfilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAllCreatorProfiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUsersInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAllCreatorProfiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateAllCreatorProfilesMutation, UpdateAllCreatorProfilesMutationVariables>;
export const GetPublicSingleVaultDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicSingleVault"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicSingleVault"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"isPurchased"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"objectCount"}},{"kind":"Field","name":{"kind":"Name","value":"creatorProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assetCount"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blurredUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjectId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"isPurchased"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"vaultId"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicSingleVaultQuery, GetPublicSingleVaultQueryVariables>;
export const GetLikedVaultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLikedVaults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLikedVaults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vaultId"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isPurchased"}}]}}]}}]}}]} as unknown as DocumentNode<GetLikedVaultsQuery, GetLikedVaultsQueryVariables>;
export const LikeVaultObjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeVaultObject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeVaultObject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"entity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjectId"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"importedAt"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"suffix"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vaultId"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blurredUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjectId"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}}]} as unknown as DocumentNode<LikeVaultObjectMutation, LikeVaultObjectMutationVariables>;
export const LikeVaultDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeVault"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeVault"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"entity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vaultId"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LikeVaultMutation, LikeVaultMutationVariables>;
export const GetLikedVaultObjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLikedVaultObjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLikedVaultObjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"fanId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjectId"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blurredUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjectId"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetLikedVaultObjectsQuery, GetLikedVaultObjectsQueryVariables>;
export const GetAllVaultsByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllVaultsByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllVaultsByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"vaults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"objectUrl"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vaultId"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllVaultsByAdminQuery, GetAllVaultsByAdminQueryVariables>;
export const GetCreatorVaultObjectsByAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCreatorVaultObjectsByAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCreatorVaultObjectsByAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"objectUrl"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vaultId"}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"creatorProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCreatorVaultObjectsByAdminQuery, GetCreatorVaultObjectsByAdminQueryVariables>;
export const GetPublicVaultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicVaults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicVaults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"objectCount"}},{"kind":"Field","name":{"kind":"Name","value":"isPurchased"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"creatorProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bannerUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicVaultsQuery, GetPublicVaultsQueryVariables>;
export const GetPublicVaultObjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPublicVaultObjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPublicVaultObjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"importedAt"}},{"kind":"Field","name":{"kind":"Name","value":"likeCount"}},{"kind":"Field","name":{"kind":"Name","value":"objectUrl"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"suffix"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vaultId"}},{"kind":"Field","name":{"kind":"Name","value":"asset"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blurredUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"fileType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mediaType"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"rawUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"vaultObjectId"}},{"kind":"Field","name":{"kind":"Name","value":"viewCount"}}]}}]}}]}}]} as unknown as DocumentNode<GetPublicVaultObjectsQuery, GetPublicVaultObjectsQueryVariables>;
export const DownloadCreatorObjectsAsBatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DownloadCreatorObjectsAsBatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadVaultQueueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"downloadCreatorObjectsAsBatch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DownloadCreatorObjectsAsBatchMutation, DownloadCreatorObjectsAsBatchMutationVariables>;
export const TerminateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Terminate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"terminate"}}]}}]} as unknown as DocumentNode<TerminateMutation, TerminateMutationVariables>;
export const GetTotalObjectsAsTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTotalObjectsAsType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTotalObjectsAsType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<GetTotalObjectsAsTypeQuery, GetTotalObjectsAsTypeQueryVariables>;
export const CleanUpVaultObjectsOfACreatorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CleanUpVaultObjectsOfACreator"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CleanUpVaultInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cleanUpVaultObjectsOfACreator"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CleanUpVaultObjectsOfACreatorMutation, CleanUpVaultObjectsOfACreatorMutationVariables>;
export const GetCountOfObjectsOfEachTypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCountOfObjectsOfEachType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCountOfObjectsOfEachType"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fulfilled"}},{"kind":"Field","name":{"kind":"Name","value":"pending"}},{"kind":"Field","name":{"kind":"Name","value":"processing"}},{"kind":"Field","name":{"kind":"Name","value":"rejected"}}]}}]}}]} as unknown as DocumentNode<GetCountOfObjectsOfEachTypeQuery, GetCountOfObjectsOfEachTypeQueryVariables>;
export const UpdatePreviewOfDefaultVaultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePreviewOfDefaultVaults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePreviewOfVaults"}}]}}]} as unknown as DocumentNode<UpdatePreviewOfDefaultVaultsMutation, UpdatePreviewOfDefaultVaultsMutationVariables>;
export const GetZonePlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetZonePlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getZonePlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unlockPrice"}},{"kind":"Field","name":{"kind":"Name","value":"zoneType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetZonePlansQuery, GetZonePlansQueryVariables>;