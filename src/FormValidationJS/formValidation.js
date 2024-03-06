const form = document.forms[0];

function showAlert(msg) {
  // eslint-disable-next-line no-alert
  alert(msg);
}

/**
 * handle go button click
 */
function handleFromSubmit() {
  const formElements = form.elements;
  const formLength = formElements.length;
  let areAllFieldsValid = true;

  for (let i = 0; i < formLength; i += 1) {
    const element = formElements[i];
    if (element.checkValidity() === false) {
      areAllFieldsValid = false;
      const labelElement = element.previousElementSibling;
      if (labelElement && labelElement.className === "label") {
        const formLabel = labelElement.innerHTML;

        if (element.value.length === 0) {
          showAlert(`${formLabel} can't be empty.`);
        } else if (element.id === "inputTextArea") { // specific msg for min 50 characters
          showAlert(`Please enter atlease 50 characters for ${formLabel}`);
        } else if (element.id === "inputEmail") { // specific msg for invalid email
          showAlert("Please enter a valid email.");
        }
      } else if (element.id === "cbReceiveNotification") {
        showAlert("Please check receive notification");
      } else {
        showAlert("Please fix the form inputs");
      }
    }
  }

  if (areAllFieldsValid) {
    form.submit();
    showAlert("Thanks. Received your details.");
  }
}

document.getElementById("buttonGo").addEventListener("click", handleFromSubmit);
