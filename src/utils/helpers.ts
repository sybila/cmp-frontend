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

export function truncate(n, useWordBoundary) {
  if (this.length <= n) {
    return this;
  }
  var subString = this.substr(0, n - 1);
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(" "))
      : subString) + "..."
  );
}

export function capitalize(s: string) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function pad(num) {
  return ("0"+num).slice(-2);
}

export function hhmmss(secs) {
var minutes = Math.floor(secs / 60);
secs = secs%60;
var hours = Math.floor(minutes/60)
minutes = minutes%60;
return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
// return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
}