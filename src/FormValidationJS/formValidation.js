function showAlert(msg) {
  // eslint-disable-next-line no-alert
  alert(msg);
}

const validator = {
  emailPattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  urlPattern: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  validateTextLength(...[fieldName, value, minLength]) {
    return value && value.trim().length >= minLength ? null : `Enter atleast ${minLength} characters in ${fieldName}`;
  },
  validateIsNotEmpty(...[fieldName, value]) {
    return (this.validateTextLength(fieldName, value, 1) === null) ? null : `${fieldName} can't be empty.`;
  },
  validateEmail(...[, value]) {
    return this.emailPattern.test(value) ? null : "Enter a valid email";
  },
  validateUrl(...[fieldName, value]) {
    return this.urlPattern.test(value) ? null : `Enter a valid ${fieldName} URL`;
  },
};

class UserForm {
  constructor(form) {
    this.form = form;
    this.fieldValues = {};
  }

  /**
   * extracts form data and returns an object
   * @returns {{loginId, email, name, timeZone, homePage, aboutMe, receiveNotification}}
   */
  extractFormData() {
    const formElements = this.form.elements;
    const formLength = formElements.length;
    const formData = {};

    for (let i = 0; i < formLength; i += 1) {
      const element = formElements[i];
      if (element.dataset.inputfield) formData[element.dataset.inputfield] = element.value;
      if (element.dataset.checkbox) formData[element.dataset.checkbox] = element.checked;
    }
    return formData;
  }

  /**
   * @param {MouseEvent} event
   */
  handleSubmit(event) {
    event.preventDefault();
    const fieldValues = this.extractFormData();
    const formErrors = UserForm.validate(fieldValues);
    if (formErrors.length) {
      event.preventDefault(); // prevent form submission
      formErrors.forEach((error) => showAlert(error));
    } else {
      showAlert("Thanks. Received your details.");
    }
    this.fieldValues = {}; // refresh field values
  }

  /**
   * method to do any initializations - like add events
   */
  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  /**
   * static method to create {UserForm}
   * @param {HTMLFormElement} form
   * @returns {UserForm}
   */
  static createUserForm(form) {
    const userForm = new UserForm(form);
    userForm.init();
    return userForm;
  }

  /**
   * @returns {Array} an array of error messages
   */
  static validate(fieldValues) {
    const errorMsgs = [];
    function validateField(validatorFunction, ...args) {
      const errorMessage = validatorFunction.bind(validator)(...args);
      if (errorMessage != null) {
        errorMsgs.push(errorMessage);
        return false;
      }
      return true;
    }

    validateField(validator.validateIsNotEmpty, "Login Id", fieldValues.loginId);
    if (validateField(validator.validateIsNotEmpty, "Email", fieldValues.email)) validateField(validator.validateEmail, "Email", fieldValues.email);
    validateField(validator.validateIsNotEmpty, "Name", fieldValues.name);
    validateField(validator.validateIsNotEmpty, "timeZone", fieldValues.timeZone);
    if (validateField(validator.validateIsNotEmpty, "Home page", fieldValues.homePage)) validateField(validator.validateUrl, "Home page", fieldValues.homePage);
    validateField(validator.validateTextLength, "About me", fieldValues.aboutMe, 50);
    if (!fieldValues.receiveNotification) errorMsgs.push("Please check receive comment notifications");

    return errorMsgs;
  }
}

window.addEventListener("load", () => UserForm.createUserForm(document.forms[0]));
