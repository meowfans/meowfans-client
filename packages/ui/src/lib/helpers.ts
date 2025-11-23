import confetti from 'canvas-confetti';
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';
import { JwtUser } from './types';
import { authCookieKey } from './constants';

export const handlePathName = (pathname: string) => {
  if (pathname.startsWith('/vaults')) return '/vaults';
  else if (pathname.startsWith('/profiles')) return '/profiles';
  else if (pathname.startsWith('/dashboard')) return '/dashboard';
  else if (pathname.startsWith('/creators')) return '/creators';
  else return pathname;
};

export const BearerAccessToken = () => {
  return `Bearer ${getCookie(authCookieKey)}`;
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

export const handleFullScreen = (url: string, startIndex: number, imageUrls: string[]) => {
  let currentIndex = startIndex;

  const image = document.createElement('img');
  image.src = url;
  image.style.maxWidth = '100%';
  image.style.maxHeight = '100%';
  image.style.margin = 'auto';
  image.style.display = 'block';
  image.style.userSelect = 'none';

  const wrapper = document.createElement('div');
  wrapper.style.width = '100%';
  wrapper.style.height = '100%';
  wrapper.style.display = 'flex';
  wrapper.style.justifyContent = 'center';
  wrapper.style.alignItems = 'center';
  wrapper.style.background = 'black';
  wrapper.style.position = 'relative';

  const nextButton = document.createElement('button');
  nextButton.innerHTML = '&#8594;';
  nextButton.style.position = 'absolute';
  nextButton.style.right = '20px';
  nextButton.style.top = '50%';
  nextButton.style.transform = 'translateY(-50%)';
  nextButton.style.padding = '0px';
  nextButton.style.background = '#000';
  nextButton.style.color = 'white';
  nextButton.style.border = 'none';
  nextButton.style.cursor = 'pointer';
  nextButton.style.fontSize = '24px';
  nextButton.onclick = () => {
    currentIndex = (currentIndex + 1) % imageUrls.length;
    const nextImage = imageUrls[currentIndex];
    if (nextImage) image.src = nextImage;
  };

  const previousButton = document.createElement('button');
  previousButton.innerHTML = '&#8592;';
  previousButton.style.position = 'absolute';
  previousButton.style.left = '20px';
  previousButton.style.top = '50%';
  previousButton.style.transform = 'translateY(-50%)';
  previousButton.style.padding = '0px';
  previousButton.style.background = '#000000';
  previousButton.style.color = 'white';
  previousButton.style.border = 'none';
  previousButton.style.cursor = 'pointer';
  previousButton.style.fontSize = '24px';
  previousButton.onclick = () => {
    currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    const prevImage = imageUrls[currentIndex];
    if (prevImage) image.src = prevImage;
  };

  const closeButton = document.createElement('button');
  closeButton.innerHTML = '&#215;';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '20px';
  closeButton.style.right = '20px';
  closeButton.style.padding = '0px';
  closeButton.style.background = '#000000';
  closeButton.style.color = 'white';
  closeButton.style.border = 'none';
  closeButton.style.cursor = 'pointer';
  closeButton.style.fontSize = '20px';
  closeButton.onclick = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      exitHandler();
    }
  };

  wrapper.appendChild(image);
  wrapper.appendChild(nextButton);
  wrapper.appendChild(previousButton);
  wrapper.appendChild(closeButton);
  document.body.appendChild(wrapper);

  if (wrapper.requestFullscreen) wrapper.requestFullscreen();

  const keyHandler = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextButton.click();
    if (e.key === 'ArrowLeft') previousButton.click();
    if (e.key === 'Escape') closeButton.click();
  };

  const exitHandler = () => {
    if (document.body.contains(wrapper)) document.body.removeChild(wrapper);
    document.removeEventListener('fullscreenchange', onFullscreenChange);
    document.removeEventListener('keydown', keyHandler);
  };

  const onFullscreenChange = () => {
    if (!document.fullscreenElement) exitHandler();
  };

  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('keydown', keyHandler);
};
