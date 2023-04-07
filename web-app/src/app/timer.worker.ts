/// <reference lib="webworker" />

let timeoutId: number;
addEventListener(
  'message',
  (e: MessageEvent<{ action: 'start' | 'stop'; time?: number }>) => {
    if (e.data.action == 'start') {
      timeoutId = setTimeout(() => self.postMessage('tick'), e.data.time);
    } else {
      clearTimeout(timeoutId);
    }
  }
);
