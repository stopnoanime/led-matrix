describe('TimerWorker', () => {
  let worker: Worker;

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  beforeEach(() => {
    worker = new Worker(new URL('./timer.worker', import.meta.url));
  });

  it('should be created', () => {
    expect(beforeEach).toBeTruthy();
  });

  it('starts and executes timeout', async () => {
    const onmessageSpy = jasmine.createSpy();
    worker.onmessage = onmessageSpy;

    worker.postMessage({ action: 'start', time: 100 });

    await timeout(200);

    expect(onmessageSpy).toHaveBeenCalledTimes(1);
    expect(onmessageSpy.calls.first().args[0].data).toBe('tick');
  });

  it('starts and cancels timeout', async () => {
    worker.onmessage = jasmine.createSpy();

    worker.postMessage({ action: 'start', time: 100 });

    await timeout(50);

    worker.postMessage({ action: 'stop' });

    await timeout(100);

    expect(worker.onmessage).toHaveBeenCalledTimes(0);
  });
});
