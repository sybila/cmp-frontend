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

function generateActionType(name: string, prefix: string, type: string) {
  if (!prefix) prefix = "app";
  return "@@" + prefix + "/" + name + "_" + type.toUpperCase();
}

const defaultPrefix = "app";

/**
 * A way to generate async action types to reduce boilerplate
 */
export const asyncAction = {
  request: (name: string, prefix = defaultPrefix) =>
    generateActionType(name, prefix, "request"),
  success: (name: string, prefix = defaultPrefix) =>
    generateActionType(name, prefix, "success"),
  failure: (name: string, prefix = defaultPrefix) =>
    generateActionType(name, prefix, "failure")
};
