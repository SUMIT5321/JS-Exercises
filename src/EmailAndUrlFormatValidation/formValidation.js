function showAlert(msg) {
  // eslint-disable-next-line no-alert
  alert(msg);
}

const errorMessages = {
  emptyField: "%s can't be empty.",
  minLength: "Enter atleast %s characters in %s",
  invalidEmail: "Enter a valid email",
  invalidUrl: "Enter a valid %s URL",
  checkReceiveNotification: "Please check receive comment notifications",
};

function formatText(text, ...args) {
  return args.reduce((prevVal, currentVal) => prevVal.replace(/%s/, currentVal), text);
}

const validator = {
  emailPattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  urlPattern: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  validateTextLength(...[value, minLength]) {
    return value && value.trim().length >= minLength;
  },
  validateIsNotEmpty(...[value]) {
    return this.validateTextLength(value, 1);
  },
  validateEmail(...[value]) {
    return this.emailPattern.test(value);
  },
  validateUrl(...[value]) {
    return this.urlPattern.test(value);
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
    function checkForEmptyField(label, value) {
      if (!validator.validateIsNotEmpty(value)) {
        errorMsgs.push(formatText(errorMessages.emptyField, label));
        return true;
      }
      return false;
    }

    checkForEmptyField("Login Id", fieldValues.loginId);
    if (!checkForEmptyField("Email", fieldValues.email) && !validator.validateEmail(fieldValues.email)) {
      errorMsgs.push(formatText(errorMessages.invalidEmail, "Email"));
    }
    checkForEmptyField("Name", fieldValues.name);
    checkForEmptyField("Time zone", fieldValues.timeZone);
    if (!checkForEmptyField("Home page", fieldValues.homePage) && !validator.validateUrl(fieldValues.homePage)) {
      errorMsgs.push(formatText(errorMessages.invalidUrl, "Home page"));
    }
    if (!validator.validateTextLength(fieldValues.aboutMe, 50)) {
      errorMsgs.push(formatText(errorMessages.minLength, 50, "About me"));
    }
    if (!fieldValues.receiveNotification) errorMsgs.push(errorMessages.checkReceiveNotification);

    return errorMsgs;
  }
}

window.addEventListener("load", () => UserForm.createUserForm(document.querySelector("[data-form='userForm']")));
