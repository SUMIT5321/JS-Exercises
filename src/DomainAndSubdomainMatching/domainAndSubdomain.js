/* eslint-disable no-alert */
/**
 * wapper on {HTMLInputElement}, provides an functionality to validate
 * and parse the entered url to return domain and subdomain
 */
class UrlInputBox {
  static domainSubdomainRegex = /^(?:https?:\/\/)?(?:www\.)?(?:([^:/\n]+)\.)?([^:/\n]+\.[^:/\n?#]+)$/;

  constructor(inputFiled) {
    this.inputFiled = inputFiled;
  }

  parseDomainAndSubdomain() {
    const matches = UrlInputBox.domainSubdomainRegex.exec(this.inputFiled.value);

    return matches ? {
      subdoamin: matches[1],
      domain: matches[2],
    } : null;
  }

  static create(inputfield) {
    return new UrlInputBox(inputfield);
  }
}

class CustomForm {
  constructor(form) {
    this.form = form;
  }

  init() {
    const urlField = this.form.querySelector("[data-type]");
    this.urlField = UrlInputBox.create(urlField);

    this.form.addEventListener("submit", (e) => this.handleFormSubmit(e));
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const domainSubdoamin = this.urlField.parseDomainAndSubdomain();
    CustomForm.showDomainSubdoamin(domainSubdoamin);
  }

  static showDomainSubdoamin(domainSubdoamin) {
    if (domainSubdoamin) {
      let msg = `Domain: ${domainSubdoamin.domain}`;
      if (domainSubdoamin.subdoamin) {
        msg += `, Subdomain: ${domainSubdoamin.subdoamin}.`;
      } else {
        msg += ".";
      }
      alert(msg);
    } else {
      alert("Not a valid url");
    }
  }

  static create(form) {
    const customForm = new CustomForm(form);
    customForm.init();
  }
}

window.addEventListener("load", () => CustomForm.create(document.forms[0]));
