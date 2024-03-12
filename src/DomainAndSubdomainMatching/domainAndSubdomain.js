/* eslint-disable no-alert */
const form = document.forms[0];
const urlInputField = form.elements[0];

class UrlProcessor {
  constructor(url) {
    this.url = url;
  }

  getDomainAndSubdomain() {
    const domainSubdomainRegex = /^(?:https?:\/\/)?(?:www\.)?(?:([^:/\n]+)\.)?([^:/\n]+\.[^:/\n?#]+)$/;
    const matches = domainSubdomainRegex.exec(this.url);

    return matches ? {
      subdoamin: matches[1],
      domain: matches[2],
    } : null;
  }
}

function handleSubmit() {
  const urlProcessor = new UrlProcessor(urlInputField.value);

  const domainSubdoamin = urlProcessor.getDomainAndSubdomain();
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

document.getElementById("buttonSubmit").addEventListener("click", handleSubmit);
