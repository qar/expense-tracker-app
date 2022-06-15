export function isArray(val) {
  return Object.prototype.toString.call(val) === "[object Array]";
}

export function persistData(key, json) {
  try {
    localStorage.setItem(key, JSON.stringify(json));
  } catch (err) {
    console.log(err);
  }
}

export function loadPersistedData(key, defaultValue = []) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return isArray(data) ? data : defaultValue;
  } catch (err) {
    console.log(err);
    return defaultValue;
  }
}
