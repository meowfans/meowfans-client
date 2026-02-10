import { LucideIcon } from 'lucide-react';
import { ButtonHTMLAttributes, ClassAttributes } from 'react';
import { AuthUserRoles, FeedbackType, FileType, MediaType, TokenType } from './enums';

export interface JwtUser {
  sub: string; // holds userId
  jti: string; // JWT ID
  iat: number; // issued at
  exp: number; // expiration time
  version: string;
  type: TokenType;
  roles: AuthUserRoles[];
  ip: string;
  admin?: JwtUser;
  impersonating: boolean;
  userAgent: string;
  associated_access_token_jti: string;
}

export interface FeedbackFormData {
  type: FeedbackType;
  rating: string;
  title: string;
  message: string;
}

export interface FeedbackCategory {
  id: FeedbackType;
  label: string;
  icon: LucideIcon;
  color: string;
}

export type ButtonSize = 'default' | 'lg' | 'sm' | 'icon';
export type ButtonVariant = 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null;

export interface ButtonProps extends ClassAttributes<HTMLButtonElement>, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  title?: string;
}

export interface UploadMediaOutput {
  rawUrl: string;
  blurredUrl: string | null;
  mimeType: string;
  mediaType: MediaType;
  fileType: FileType;
  assetId?: string;
}

export interface UploadMediaInput {
  mediaType: MediaType;
}

export interface CreatorSignupInput {
  email: string;
  password: string;
  fullName: string;
  username: string;
  otp: string;
}

export interface HeaderProps {
  variant?: 'outline' | 'default';
  title?: string;
  icon?: LucideIcon;
  onClick?: () => unknown;
  path?: string;
}
