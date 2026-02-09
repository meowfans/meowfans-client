import confetti from 'canvas-confetti';
import { deleteCookie, getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { adminCookieKey, authCookieKey, creatorCookieKey, fanCookieKey } from './constants';
import { FileType } from './enums';
import { JwtUser } from './types';

export const resolvePathName = (pathname: string) => {
  if (pathname.startsWith('/vaults')) return '/vaults';
  else if (pathname.startsWith('/profiles')) return '/profiles';
  else if (pathname.startsWith('/dashboard')) return '/dashboard';
  else if (pathname.startsWith('/creators')) return '/creators';
  else if (pathname.startsWith('/settings')) return '/settings';
  else if (pathname.startsWith('/channels')) return '/channels';
  else if (pathname.startsWith('/posts')) return '/posts';
  else return pathname;
};

enum UserRoles {
  Admin = 'ADMIN',
  Creator = 'CREATOR',
  Fan = 'FAN',
  SuperViewer = 'SUPER_VIEWER'
}

export const tokenMap = {
  [UserRoles.Admin]: adminCookieKey,
  [UserRoles.Creator]: creatorCookieKey,
  [UserRoles.Fan]: fanCookieKey,
  [UserRoles.SuperViewer]: authCookieKey
};

export const BearerAccessToken = (role: UserRoles) => {
  return `Bearer ${getCookie(tokenMap[role])}`;
};

export const pluralizeByCount = (count: number, text: string) => {
  return count > 1 ? `${text}s` : text;
};

export const normalizePath = (...parts: Array<string>) => {
  return '/'.concat(parts.join('/'));
};

export const triggerSparkles = () => {
  const duration = 1.8 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 15,
      startVelocity: 25,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      origin: { x: Math.random(), y: Math.random() - 0.2 },
      colors: ['#a855f7', '#ec4899', '#6366f1', '#facc15', '#22d3ee']
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

export const buildSafeUrl = (input: { host: string; pathname?: string }) => {
  try {
    const redirectUrl = new URL(input.host);
    redirectUrl.pathname = input.pathname || '/';
    return redirectUrl.toString();
  } catch {
    console.log('Failed to create url!');
    return '';
  }
};

export const decodeJwtToken = (token?: string): JwtUser | null => {
  try {
    if (!token) return null;
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const deleteImpersonationTokenAfterSessionEnds = async () => {
  const creatorCookie = getCookie(creatorCookieKey) as string;
  if (!creatorCookie) return;

  const decoded = decodeJwtToken(creatorCookie);
  if (!decoded?.impersonating || !decoded.exp) return;

  const expiresAtMs = decoded.exp * 1000;

  if (Date.now() > expiresAtMs) {
    deleteCookie(creatorCookieKey);
  }
};

export const resolveFileType = (url: string) => {
  if (url.endsWith('.png')) return FileType.IMAGE;
  if (url.endsWith('.jpg') || url.endsWith('.jpeg')) return FileType.IMAGE;
  if (url.endsWith('.gif')) return FileType.IMAGE;
  if (url.endsWith('.webp')) return FileType.IMAGE;
  if (url.endsWith('.mp4')) return FileType.VIDEO;
  return FileType.IMAGE;
};

export const handleFullScreen = (url: string, startIndex: number, mediaUrls: string[], type?: 'img' | 'video') => {
  let currentIndex = startIndex;

  let mediaEl: HTMLImageElement | HTMLVideoElement | null = null;

  const createMedia = (src: string) => {
    if (mediaEl && wrapper.contains(mediaEl)) {
      wrapper.removeChild(mediaEl);
    }

    if (type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.style.maxWidth = '100%';
      video.style.maxHeight = '100%';
      mediaEl = video;
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.style.maxWidth = '100%';
      img.style.maxHeight = '100%';
      img.style.userSelect = 'none';
      mediaEl = img;
    }

    mediaEl.style.margin = 'auto';
    mediaEl.style.display = 'block';

    wrapper.appendChild(mediaEl);
  };

  const wrapper = document.createElement('div');
  Object.assign(wrapper.style, {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'black',
    position: 'fixed',
    inset: '0',
    zIndex: '9999'
  });

  // initial media
  createMedia(url);

  const createButton = (content: string, style: Partial<CSSStyleDeclaration>, onClick: () => void) => {
    const btn = document.createElement('button');
    btn.innerHTML = content;
    Object.assign(btn.style, {
      position: 'absolute',
      background: '#000',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '24px',
      padding: '4px',
      ...style
    });
    btn.onclick = onClick;
    wrapper.appendChild(btn);
    return btn;
  };

  const next = () => {
    currentIndex = (currentIndex + 1) % mediaUrls.length;
    createMedia(mediaUrls[currentIndex] as string);
  };

  const prev = () => {
    currentIndex = (currentIndex - 1 + mediaUrls.length) % mediaUrls.length;
    createMedia(mediaUrls[currentIndex] as string);
  };

  const exit = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    cleanup();
  };

  createButton('&#8594;', { right: '20px', top: '50%', transform: 'translateY(-50%)' }, next);
  createButton('&#8592;', { left: '20px', top: '50%', transform: 'translateY(-50%)' }, prev);
  createButton('&#215;', { top: '20px', right: '20px', fontSize: '20px' }, exit);

  const keyHandler = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'Escape') exit();
  };

  const fullscreenChangeHandler = () => {
    if (!document.fullscreenElement) cleanup();
  };

  const cleanup = () => {
    document.removeEventListener('keydown', keyHandler);
    document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    if (document.body.contains(wrapper)) {
      document.body.removeChild(wrapper);
    }
  };

  document.body.appendChild(wrapper);
  wrapper.requestFullscreen?.();

  document.addEventListener('keydown', keyHandler);
  document.addEventListener('fullscreenchange', fullscreenChangeHandler);
};
