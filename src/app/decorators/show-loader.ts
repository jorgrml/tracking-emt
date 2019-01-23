export function ShowLoader() {
  return function(Class: Function) {
    Object.defineProperty(Class.prototype, "showLoader", {
      value: true
    });
  };
}
