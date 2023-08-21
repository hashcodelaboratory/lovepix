// used for creating a promise that can be resolved outside the promise executor function
export class DeferredPromise {
  promise: Promise<unknown>
  reject: (value: unknown) => void = (value) => {}
  resolve: (value: unknown) => void = (value) => {}
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.reject = reject
      this.resolve = resolve
    })
  }
}
