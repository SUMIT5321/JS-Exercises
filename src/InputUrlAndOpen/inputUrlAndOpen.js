/* eslint-disable no-alert */

class UrlHandler {
  static urlPattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

  constructor(url) {
    this.url = url;
  }

  /**
  * Opens given url in new window
  * @param {String} url - url to open
  */
  #openInNewWindow() {
    let blocked = false;
    try {
      const newWindow = window.open(this.url, "_blank", "location=yes,height=400,width=450,scrollbars=false,status=false,toolbar=false");
      if (newWindow == null) {
        blocked = true;
      }
    } catch (ex) {
      blocked = true;
    }
    if (blocked) {
      alert("The popup was blocked!");
    }
  }

  /**
   * validates if url is valid
   * @param {String} url
   * @returns {Boolean}
   */
  #validateUrl() {
    return UrlHandler.urlPattern.test(this.url);
  }

  #validateAndOpen() {
    if (this.url && this.#validateUrl()) {
      this.#openInNewWindow();
    } else {
      alert("Url not valid.");
    }
  }

  /**
   * show prompt to user and open the entered url
   */
  static takeUrlAndOpen() {
    const url = prompt("Enter a URL:");
    const urlHandler = new UrlHandler(url);
    urlHandler.#validateAndOpen();
  }
}

window.addEventListener("load", UrlHandler.takeUrlAndOpen);
