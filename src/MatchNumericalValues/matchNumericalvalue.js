class LoaderButton {
  /**
   * the button element must contain 2 child element - text and loader
   * @param {HTMLButtonElement} buttonElement
   */
  constructor(buttonElement) {
    this.buttonElement = buttonElement;
    this.textElement = buttonElement.firstElementChild;
    this.loaderElement = buttonElement.lastElementChild;
  }

  init() {
    this.showLoader(false);
  }

  showLoader(show) {
    if (show) {
      this.textElement.style.display = "none";
      this.loaderElement.style.display = "block";
    } else {
      this.textElement.style.display = "block";
      this.loaderElement.style.display = "none";
    }
  }

  static create(buttonElement) {
    const loaderButton = new LoaderButton(buttonElement);
    loaderButton.init();
    return loaderButton;
  }
}

class NumberValidationForm {
  static numberRegex = /^\d+$/;

  constructor({
    form, numberInputElement, resultElement, loaderButton,
  }) {
    this.form = form;
    this.numberInputElement = numberInputElement;
    this.resultElement = resultElement;
    this.loaderButton = loaderButton;
  }

  /**
   * do any init work, adds event handlers
   */
  init() {
    this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
  }

  /**
   * Checks if input text is a valid number
   * @returns {Boolean}
   */
  validateInput() {
    return NumberValidationForm.numberRegex.test(this.numberInputElement.value);
  }

  /**
   * overrides default submit behaviour
   * @param {Event} event
   */
  handleFormSubmit(event) {
    event.preventDefault();
    if (this.validateInput()) {
      this.loaderButton.showLoader(true);
      this.resultElement.value = "true";
      setTimeout(() => {
        this.loaderButton.showLoader(false);
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
   * @returns {NumberValidationForm}
   */
  static create(form, button) {
    const numberInputElement = form.elements[0];
    const resultElement = form.elements[1];
    const loaderButton = LoaderButton.create(button);
    const numberValidationForm = new NumberValidationForm(
      {
        form, numberInputElement, resultElement, loaderButton,
      },
    );
    numberValidationForm.init();
    return numberValidationForm;
  }
}

window.addEventListener("load", () => NumberValidationForm.create(document.forms[0], document.querySelector("[data-button='submitButton']")));
