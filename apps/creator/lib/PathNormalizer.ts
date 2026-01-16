import { authenticatedPaths } from './constants';

export interface PathContext {
  pathname: string;
  username?: string;
}

export class PathNormalizer {
  private static normalizeUsername(username?: string): string {
    return `/${username}` || '/';
  }

  private static resolveUsername(ctx: PathContext): string | undefined {
    return ctx.username && ctx.pathname === this.normalizeUsername(ctx.username) ? this.normalizeUsername(ctx.username) : undefined;
  }

  private static resolveAuthenticated(pathname: string): string | undefined {
    return authenticatedPaths.find((path) => pathname.startsWith(path));
  }

  static isAuthenticated(ctx: PathContext): boolean {
    return (
      authenticatedPaths.some((path) => ctx.pathname.startsWith(path)) || ctx.pathname.startsWith(this.normalizeUsername(ctx.username))
    );
  }

  static resolve(ctx: PathContext): string {
    return this.resolveUsername(ctx) ?? this.resolveAuthenticated(ctx.pathname) ?? ctx.pathname;
  }
}
