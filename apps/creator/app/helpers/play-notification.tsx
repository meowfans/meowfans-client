let audioInstance: HTMLAudioElement | null = null;
let isUnlocked = false;

if (typeof window !== 'undefined') {
  audioInstance = new Audio('/notification.mp3');

  const unlockAudio = () => {
    if (!audioInstance || isUnlocked) return;

    audioInstance.muted = true;
    audioInstance
      .play()
      .then(() => {
        if (audioInstance) {
          audioInstance.pause();
          audioInstance.currentTime = 0;
          audioInstance.muted = false;
        }
        isUnlocked = true;
      })
      .catch((e) => {
        console.log('Muted play failed! instance is loaded only', e);
        audioInstance?.load();
      });

    window.removeEventListener('pointerdown', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
  };

  window.addEventListener('pointerdown', unlockAudio);
  window.addEventListener('keydown', unlockAudio);
}

export const playNotification = (canPlay: boolean) => {
  console.log('playing', canPlay);
  try {
    if (canPlay && audioInstance) {
      console.log('hasAudioInstance');
      audioInstance.currentTime = 0;
      audioInstance.play().catch((e) => console.log('Audio playback failed: ', e));
    }
  } catch (e) {
    console.log('Audio not supported', e);
  }
};
