/* eslint-disable no-alert */
/**
 * Opens given url in new window
 * @param {String} url - url to open
 */
function openInNewWindow(url) {
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
}

function onPageLoad() {
  const url = prompt("Enter a URL:");

  if (url && url.trim()) {
    openInNewWindow(url);
  } else {
    alert("Url not valid.");
  }
}

window.addEventListener("load", onPageLoad);
