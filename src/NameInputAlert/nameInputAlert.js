function forcePrompt(msg) {
  const value = prompt(msg);

  if (value && value.trim()) return value;
  return forcePrompt(msg);
}

function onPageLoad() {
  const firstName = forcePrompt("Enter first name");
  const lastName = forcePrompt("Enter last name");

  document.write(`Hello, ${firstName} ${lastName}`);
}

window.addEventListener("load", onPageLoad);
