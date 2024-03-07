const form = document.forms[0];
const numberInputElement = form.elements[0];
const resultElement = form.elements[1];

class UserInputNumber {
  constructor(numberInput) {
    this.number = numberInput;
  }

  validateInput() {
    const numericalRegex = /^\d+$/;
    return numericalRegex.test(this.number);
  }
}

function handleSubmit() {
  const userInput = new UserInputNumber(numberInputElement.value);

  if (userInput.validateInput()) {
    resultElement.value = "true";
    // submit after half a second so that user sees that the value turned true
    setTimeout(() => form.submit(), 500);
  } else {
    resultElement.value = "false";
  }
}

document.getElementById("buttonSubmit").addEventListener("click", handleSubmit);
