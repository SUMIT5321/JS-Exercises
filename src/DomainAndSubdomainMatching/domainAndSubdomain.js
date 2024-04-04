/* eslint-disable no-alert */
/**
 * wapper on {HTMLInputElement}, provides an functionality to validate
 * and parse the entered url to return domain and subdomain
 */
const urlParser = {
  domainSubdomainRegex: /^(?:https?:\/\/)?(?:(?<subdomain>[^:/\n]+)\.)?(?<domain>[^:/\n]+\.[^:/\n\s?#]+)/,
  parseDomainAndSubdomain(url) {
    const matches = urlParser.domainSubdomainRegex.exec(url);
    return matches ? matches.groups : null;
  },
};

class CustomForm {
  constructor({ form, urlField }) {
    this.form = form;
    this.urlField = urlField;
  }

  init() {
    this.form.addEventListener("submit", (e) => this.handleFormSubmit(e));
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.urlField.value === "") {
      alert("Please enter a URL");
      return;
    }
    const domainSubdomain = urlParser.parseDomainAndSubdomain(this.urlField.value);
    CustomForm.showDomainSubdomain(domainSubdomain);
  }

  static showDomainSubdomain(domainSubdomain) {
    if (domainSubdomain) {
      let msg = `Domain: ${domainSubdomain.domain}`;
      if (domainSubdomain.subdomain) {
        msg += `, Subdomain: ${domainSubdomain.subdomain}.`;
      } else {
        msg += ".";
      }
      alert(msg);
    } else {
      alert("Not a valid url");
    }
  }

  static create({ formId, urlFieldId }) {
    const form = document.querySelector(formId);
    const urlField = form.querySelector(urlFieldId);
    const customForm = new CustomForm({ form, urlField });
    customForm.init();
  }
}

window.addEventListener("load", () => {
  const params = {
    formId: "[data-form='urlForm']",
    urlFieldId: "[data-type='url']",
  };
  CustomForm.create(params);
});
