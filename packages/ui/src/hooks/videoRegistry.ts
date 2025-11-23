class VideoRegistry {
  private current: { id: string; pause: () => void } | null = null;

  registerAndPlay(id: string, pauseFn: () => void) {
    if (this.current && this.current.id !== id) {
      this.current.pause();
    }
    this.current = { id, pause: pauseFn };
  }
}

export const videoRegistry = new VideoRegistry();
