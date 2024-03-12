/* eslint-disable no-alert */
const urlHandler = {
  /**
  * Opens given url in new window
  * @param {String} url - url to open
  */
  openInNewWindow(url) {
    let blocked = false;
    try {
      const newWindow = window.open(url, "_blank", "location=yes,height=400,width=450,scrollbars=false,status=false,toolbar=false");
      if (newWindow == null) {
        blocked = true;
      }
    } catch (ex) {
      blocked = true;
    }
    if (blocked) {
      alert("The popup was blocked!");
    }
  },

  /**
   * validates if url is valid
   * @param {String} url
   * @returns {Boolean}
   */
  validateUrl(url) {
    const urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
    return urlPattern.test(url);
  },

  /**
   * show prompt to user
   */
  showUrlPrompt() {
    const url = prompt("Enter a URL:");
    if (url && this.validateUrl(url.trim())) {
      this.openInNewWindow(url.trim());
    } else {
      alert("Url not valid.");
    }
  },
};

window.addEventListener("load", urlHandler.showUrlPrompt.bind(urlHandler));
