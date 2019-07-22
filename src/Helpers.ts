/**
 * timer - setTimeout adaptation with option of getting remaining time
 *
 * @param  {function} callback
 * @param  {number} delay    delay in ms
 * @return {void}
 */
export function timer(callback: Function, delay: number): void {
  let id,
    started,
    remaining = delay,
    running;

  this.start = function() {
    running = true;
    started = new Date();
    id = setTimeout(callback, remaining);
  };

  this.pause = function() {
    running = false;
    clearTimeout(id);
    remaining -= (new Date() as any) - started;
  };

  this.getTimeLeft = function() {
    if (running) {
      this.pause();
      this.start();
    }

    return remaining;
  };

  this.getStateRunning = function() {
    return running;
  };

  this.start();
}
