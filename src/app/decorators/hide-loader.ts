export function HideLoader(triggerAction: string) {
  return function(Class: Function) {
    Object.defineProperty(Class.prototype, "triggerAction", {
      value: triggerAction
    });
  };
}
