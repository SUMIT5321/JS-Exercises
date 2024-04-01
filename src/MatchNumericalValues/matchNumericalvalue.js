class LoaderButton {
  /**
   * the button element must contain 2 child element - text and loader
   * @param {HTMLButtonElement} buttonElement
   */
  constructor(buttonId) {
    this.buttonElement = document.querySelector(buttonId);
    this.textElement = this.buttonElement.firstElementChild;
    this.loaderElement = this.buttonElement.lastElementChild;
  }

  init() {
    this.setLoadingState(false);
  }

  setLoadingState(showLoading) {
    this.loaderElement.style.display = showLoading ? "block" : "none";
    this.textElement.style.display = showLoading ? "none" : "block";
  }

  static create(buttonId) {
    const loaderButton = new LoaderButton(buttonId);
    loaderButton.init();
    return loaderButton;
  }
}

class NumberValidator {
  static NUMBER_REGEX = /^\d+$/;

  constructor({
    formId, inputElementId, resultElementId, buttonId,
  }) {
    this.form = document.querySelector(formId);
    this.numberInputElement = document.querySelector(inputElementId);
    this.resultElement = document.querySelector(resultElementId);
    this.loaderButton = LoaderButton.create(buttonId);
  }

  /**
   * do any init work, adds event handlers
   */
  init() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  /**
   * Checks if input text is a valid number
   * @returns {Boolean}
   */
  validateInput() {
    return NumberValidator.NUMBER_REGEX.test(this.numberInputElement.value);
  }

  /**
   * overrides default submit behaviour
   * @param {Event} event
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.validateInput()) {
      this.loaderButton.setLoadingState(true);
      this.resultElement.value = "true";
      setTimeout(() => {
        this.loaderButton.setLoadingState(false);
        this.form.reset();
      }, 1000); // simulate form submit
    } else {
      this.resultElement.value = "false";
    }
  }

  /**
   * creates {NumberValidationForm} and returns an instance of it
   * @param {HTMLFormElement} form
   * @param {HTMLButtonElement} button
   * @returns {NumberValidator}
   */
  static create({
    formId, inputElementId, resultElementId, buttonId,
  }) {
    const numberValidationForm = new NumberValidator(
      {
        formId, inputElementId, resultElementId, buttonId,
      },
    );
    numberValidationForm.init();
    return numberValidationForm;
  }
}

window.addEventListener("load", () => {
  const numberValidatorArgs = {
    formId: "[data-form='numberValidator']",
    inputElementId: "[data-input='enterNumber']",
    resultElementId: "[data-input='result']",
    buttonId: "[data-button='submitButton']",
  };
  NumberValidator.create(numberValidatorArgs);
});
