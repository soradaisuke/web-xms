export default function (promise) {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled ? reject(new Error('promise is been canceled')) : resolve(val)),
      error => (hasCanceled ? reject(new Error('promise is been canceled')) : reject(error)),
    );
  });

  wrappedPromise.cancel = () => {
    hasCanceled = true;
  };

  return wrappedPromise;
}
