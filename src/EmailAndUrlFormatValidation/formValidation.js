function showAlert(msg) {
  // eslint-disable-next-line no-alert
  alert(msg);
}

const validator = {
  validateTextLength: (text, minLength = 1) => text && text.trim().length >= minLength,
  validateEmail: (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  },
  validateUrl: (url) => {
    const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    return urlPattern.test(url);
  },
};

class User {
  constructor({
    userId, email, name, timeZone, homePage, aboutMe, receiveCommentsNotification,
  }) {
    this.id = userId;
    this.email = email;
    this.name = name;
    this.timeZone = timeZone;
    this.homePage = homePage;
    this.aboutMe = aboutMe;
    this.receiveCommentsNotification = receiveCommentsNotification;
  }

  /**
   * @returns {Array} an array of error messages
   */
  validate() {
    const errorMsgs = [];
    if (!validator.validateTextLength(this.id)) errorMsgs.push("Login Id can't be empty."); // validate id
    if (!validator.validateTextLength(this.email)) errorMsgs.push("Email can't be empty."); // validate email
    else if (!validator.validateEmail(this.email)) errorMsgs.push("Enter a valid email");
    if (!validator.validateTextLength(this.name)) errorMsgs.push("Name can't be empty."); // validate name
    if (!validator.validateTextLength(this.homePage)) errorMsgs.push("Home page can't be empty."); // validate home page
    else if (!validator.validateUrl(this.homePage)) errorMsgs.push("Enter a valid Home page URL");
    if (!validator.validateTextLength(this.aboutMe, 50)) errorMsgs.push("Enter atleast 50 characters about yourself."); // validate about me
    if (!this.receiveCommentsNotification) errorMsgs.push("Please check receive comment notifications"); // validate receive notification

    return errorMsgs;
  }
}

const userFormHandler = {
  form: document.forms[0],

  /**
   * extracts form data and returns an object
   * @returns {{userId, email, name, timeZone, homePage, aboutMe, receiveCommentsNotification}}
   */
  exteactFormData() {
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
  },
  handleSubmit() {
    const formData = this.exteactFormData();
    const user = new User(formData);

    const formErrors = user.validate();
    if (formErrors.length === 0) {
      this.form.submit();
      showAlert("Thanks. Received your details.");
    } else {
      formErrors.forEach((error) => showAlert(error));
    }
  },
};

document.getElementById("buttonGo").addEventListener("click", userFormHandler.handleSubmit.bind(userFormHandler));
