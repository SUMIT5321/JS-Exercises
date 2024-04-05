function showAlert(msg) {
  // eslint-disable-next-line no-alert
  alert(msg);
}

const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const URL_PATTERN = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

const validator = {
  validateTextLength(...[fieldName, value, minLength]) {
    return value && value.trim().length >= minLength ? null : `Enter atleast ${minLength} characters in ${fieldName}`;
  },
  validateIsNotEmpty(...[fieldName, value]) {
    return (this.validateTextLength(fieldName, value, 1) === null) ? null : `${fieldName} can't be empty.`;
  },
  validateEmail(...[, value]) {
    return EMAIL_PATTERN.test(value) ? null : "Enter a valid email";
  },
  validateUrl(...[fieldName, value]) {
    return URL_PATTERN.test(value) ? null : `Enter a valid ${fieldName} URL`;
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
    const fieldValues = this.extractFormData();
    const formErrors = UserForm.validate(fieldValues);
    if (formErrors.length) {
      event.preventDefault(); // prevent form submission
      formErrors.forEach((error) => showAlert(error));
    } else {
      if (fieldValues.receiveNotification && !UserForm.showNotificationConfirmationModal()) {
        event.preventDefault();
        return;
      }
      showAlert("Thanks. Received your details.");
    }
  }

  /**
   * method to do any initializations - like add events
   */
  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  static showNotificationConfirmationModal() {
    // eslint-disable-next-line no-restricted-globals, no-alert
    return confirm("You will be receiving notification on profile comments. If you are good, press 'OK' otherwise 'Cancel'.");
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

    return errorMsgs;
  }
}

window.addEventListener("load", () => UserForm.createUserForm(document.forms[0]));
