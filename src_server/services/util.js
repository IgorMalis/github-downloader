
export function separateFullName(fullName) {
    const match = fullName.match(/(.*)\/(.*)/);
    return [match[1], match[2]];
}

// Return a promise that is resolved immediately
export function emptyPromise() {
  return new Promise((resolve, reject) => {
    resolve();
  });
}

// Resolve promise in t ms (for delay in between requests)
export function timerPromise(t) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(), t));
}
