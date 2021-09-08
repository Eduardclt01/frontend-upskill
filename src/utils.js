
export function getUserConfirmation(operation, message) {
  if (confirmOperation(message)) {
    operation();
  }
}

export function confirmOperation(message) {
  return window.confirm(message);
}
