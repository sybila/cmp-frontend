type SessionType = "SESSION" | "LOCAL";

function set(Type: SessionType, Key: string, Value: any) {
  let storage;
  switch (Type) {
    case "SESSION":
      storage = window.sessionStorage;
      break;
    case "LOCAL":
      storage = window.localStorage;
      break;
  }

  try {
    storage.setItem(Key, JSON.stringify(Value));
  } catch (e) {
    console.error(`[Session] Failed to set key '${Key}'.`);
  }
}

function get(Type: SessionType, Key: string) {
  let storage;
  switch (Type) {
    case "SESSION":
      storage = window.sessionStorage;
      break;
    case "LOCAL":
      storage = window.localStorage;
      break;
  }

  try {
    return JSON.parse(storage.getItem(Key));
  } catch (e) {
    return undefined;
  }
}

function remove(Type: SessionType, Key: string) {
  this.set(Type, Key, undefined);
}

function purge(Type: SessionType) {
  let storage;
  switch (Type) {
    case "SESSION":
      storage = window.sessionStorage;
      break;
    case "LOCAL":
      storage = window.localStorage;
      break;
  }

  storage.clear();
}

function update(Type: SessionType, Key: string, Updater: (Value: any) => any) {
  let Value = this.get(Type, Key);
  Value = Updater(Value);
  this.set(Type, Key, Value);
}

export default {
  set,
  get,
  remove,
  purge,
  update,
};
