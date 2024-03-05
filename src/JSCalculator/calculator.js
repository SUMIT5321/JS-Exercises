const display = document.getElementsByName("display")[0];

/**
 * Handles click on form element
 * @param {MouseEvent} event
 * @returns nothing
 */
function handleClick(event) {
  const view = event.target;

  if (view.type !== "button") return;
  const { value } = view;

  if (value === "AC") {
    display.value = "";
    return;
  }

  if (value === "DE") {
    display.value = display.value.toString().slice(0, -1);
    return;
  }

  if (value === "=") {
    try {
      // eslint-disable-next-line no-eval
      display.value = eval(display.value);
    } catch (error) {
      display.value = "error";
    }
    return;
  }

  const validValuePattern = /[\d.*+\-/]/g;
  if (validValuePattern.test(value)) {
    display.value += value;
  }
}

document.forms[0].addEventListener("click", handleClick);
