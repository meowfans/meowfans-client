class EventEmitter extends EventTarget {
  private static instance: EventEmitter;
  constructor() {
    super();
  }
  static getInstance() {
    if (!EventEmitter.instance) {
      EventEmitter.instance = new EventEmitter();
    }
    return EventEmitter.instance;
  }
}

export const eventEmitter = EventEmitter.getInstance();
