const form = document.forms[0];

function showAlert(msg) {
  // eslint-disable-next-line no-alert
  alert(msg);
}

const validator = {
  validateString: (text, minLength = 0) => text && text.trim().length > minLength,
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
    if (!validator.validateString(this.id)) errorMsgs.push("Login Id can't be empty.");
    if (!validator.validateEmail(this.email)) errorMsgs.push("Enter a valid email");
    if (!validator.validateString(this.name)) errorMsgs.push("Name can't be empty.");
    if (!validator.validateUrl(this.homePage)) errorMsgs.push("Enter a valid Home page URL");
    if (!validator.validateString(this.aboutMe, 50)) errorMsgs.push("Enter atleast 50 characters about yourself.");
    if (this.receiveCommentsNotification) errorMsgs.push("Please check receive notification");

    return errorMsgs;
  }
}

/**
 * handle go button click
 */
function handleFromSubmit() {
  const formElements = form.elements;
  const formLength = formElements.length;
  const formData = {};

  for (let i = 0; i < formLength; i += 1) {
    const element = formElements[i];
    switch (element.id) {
      case "inputLoginId":
        formData.userId = element.value;
        break;
      case "inputEmail":
        formData.email = element.value;
        break;
      case "inputName":
        formData.name = element.value;
        break;
      case "inputTimeZone":
        formData.timeZone = element.value;
        break;
      case "inputHomePage":
        formData.homePage = element.value;
        break;
      case "inputTextArea":
        formData.aboutMe = element.value;
        break;
      case "cbReceiveNotification":
        formData.receiveCommentsNotification = element.value;
        break;
      default:
        break;
    }
  }

  const user = new User(formData);

  const formErrors = user.validate();
  if (formErrors.length === 0) {
    form.submit();
    showAlert("Thanks. Received your details.");
  } else {
    formErrors.forEach((error) => showAlert(error));
  }
}

document.getElementById("buttonGo").addEventListener("click", handleFromSubmit);
