class NumberValidationForm {
  static numericalRegex = /^\d+$/;

  constructor({ form, numberInputElement, resultElement }) {
    this.form = form;
    this.numberInputElement = numberInputElement;
    this.resultElement = resultElement;
  }

  /**
   * adds event handlers
   */
  init() {
    this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
  }

  /**
   * Checks if input text is a valid number
   * @returns {Boolean}
   */
  validateInput() {
    return NumberValidationForm.numericalRegex.test(this.numberInputElement.value);
  }

  /**
   * overrides default submit behaviour
   * @param {Event} event
   */
  handleFormSubmit(event) {
    event.preventDefault();
    if (this.validateInput()) {
      this.resultElement.value = "true";
      setTimeout(() => this.form.reset(), 1000); // simulate form submit
    } else {
      this.resultElement.value = "false";
    }
  }

  /**
   * creates {NumberValidationForm} and returns an instance of it
   * @param {HTMLFormElement} form
   * @returns {NumberValidationForm}
   */
  static create(form) {
    const numberInputElement = form.elements[0];
    const resultElement = form.elements[1];
    const numberValidationForm = new NumberValidationForm(
      { form, numberInputElement, resultElement },
    );
    numberValidationForm.init();
    return numberValidationForm;
  }
}

window.addEventListener("load", () => NumberValidationForm.create(document.forms[0]));
