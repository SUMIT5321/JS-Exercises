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
  validateIsEmpty(...[fieldName, value]) {
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
   * @returns {{userId, email, name, timeZone, homePage, aboutMe, receiveCommentsNotification}}
   */
  extractFormData() {
    const formElements = this.form.elements;
    const formLength = formElements.length;
    const formData = {};

    for (let i = 0; i < formLength; i += 1) {
      const element = formElements[i];
      switch (element.dataset.inputfield) {
        case "loginId":
          formData.userId = element.value;
          break;
        case "email":
          formData.email = element.value;
          break;
        case "name":
          formData.name = element.value;
          break;
        case "timeZone":
          formData.timeZone = element.value;
          break;
        case "homePage":
          formData.homePage = element.value;
          break;
        case "aboutMe":
          formData.aboutMe = element.value;
          break;
        case "receiveNotification":
          formData.receiveCommentsNotification = element.checked;
          break;
        default:
          break;
      }
    }
    return formData;
  }

  /**
   * @returns {Array} an array of error messages
   */
  validate() {
    const errorMsgs = [];
    function validateField(validatorFunction, ...args) {
      const errorMessage = validatorFunction.bind(validator)(...args);
      if (errorMessage != null) errorMsgs.push(errorMessage);
    }

    const {
      userId, email, name, timeZone, homePage, aboutMe, receiveCommentsNotification,
    } = this.fieldValues;

    validateField(validator.validateIsEmpty, "Login Id", userId);
    validateField(validator.validateIsEmpty, "Email", email);
    validateField(validator.validateEmail, "Email", email);
    validateField(validator.validateIsEmpty, "Name", name);
    validateField(validator.validateIsEmpty, "timeZone", timeZone);
    validateField(validator.validateIsEmpty, "Home page", homePage);
    validateField(validator.validateUrl, "Home page", homePage);
    validateField(validator.validateTextLength, "About me", aboutMe, 50);
    if (!receiveCommentsNotification) errorMsgs.push("Please check receive comment notifications");

    return errorMsgs;
  }

  /**
   * @param {MouseEvent} event
   */
  handleSubmit(event) {
    this.fieldValues = this.extractFormData();
    const formErrors = this.validate();
    if (formErrors.length === 0) {
      this.form.submit();
      showAlert("Thanks. Received your details.");
    } else {
      event.preventDefault(); // prevent form submission
      formErrors.forEach((error) => showAlert(error));
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
}

window.addEventListener("load", () => UserForm.createUserForm(document.forms[0]));
