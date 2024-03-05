/* eslint-disable no-alert */
const daysCheckboxes = document.getElementsByName("days");
const noneCheckbox = document.getElementsByName("days-none")[0];
const selectedDays = [];

/**
 * @param {MouseEvent} event
 */
function handleFormClick(event) {
  const view = event.target;

  if (view.type !== "checkbox") {
    return;
  }

  // if none checked/unchecked
  if (view.value === "None") {
    if (view.checked === true) {
      selectedDays.splice(0, selectedDays.length);
      daysCheckboxes.forEach((element) => {
        element.checked = false;
      });
    }
    return;
  }

  // days checked / unchecked
  if (view.checked === true) {
    if (selectedDays.length === 3) {
      view.checked = false;
      alert(`Only 3 days can be selected. You have already selected ${selectedDays[0]}, ${selectedDays[1]} and ${selectedDays[2]}`);
    } else {
      noneCheckbox.checked = false;
      selectedDays.push(view.value);
    }
  } else {
    const index = selectedDays.indexOf(view.value);
    selectedDays.splice(index, 1);
  }
}

document.forms[0].addEventListener("click", handleFormClick);
