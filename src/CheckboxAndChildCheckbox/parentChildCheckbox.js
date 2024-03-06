const childCheckBoxes = {
  color: ["Red", "Yellow", "Green", "Blue"],
  movie: ["Dar", "Sir"],
  drinks: ["Coke", "Pepsi", "Dew"],
  bikes: ["V-rod", "Pulsar", "cbz"],
};

/**
 * Handles child checkbox click
 * @param {MouseEvent} event
 */
function handleChildCheckboxClick(event) {
  const childView = event.target;
  const parent = childView.parentElement;

  const areAllChecked = [...parent.childNodes].reduce(
    ((previous, current) => current.checked || previous),
    false,
  );

  if (!areAllChecked) {
    const superParent = parent.parentElement;
    superParent.removeChild(parent);
    superParent.querySelector("[name='cb-parent']").checked = false;
  }
}

/**
 * Creates a checkbox, returns it wrapped in a DocumentFragment
 * @param {String} data - data to be used to create child checkbox
 * @param {Number} position - postion of the checkbox in the list
 * @returns {DocumentFragment} - returns DocumentFragment wrapping checkbox with its lable
 */
function createCheckbox(data, position) {
  const fragment = document.createDocumentFragment();
  const checkbox = document.createElement("input");
  const br = document.createElement("br");
  checkbox.type = "checkbox";
  checkbox.name = data;
  checkbox.id = data;
  checkbox.value = data;
  checkbox.checked = true;
  checkbox.onclick = handleChildCheckboxClick;

  const label = document.createElement("label");
  const tn = document.createTextNode(data);
  label.htmlFor = data;
  label.appendChild(tn);

  if (position !== 0) fragment.appendChild(br);
  fragment.appendChild(checkbox);
  fragment.appendChild(label);
  return fragment;
}

/**
 * Adds child checkboxes for given input checkbox
 * @param {HTMLInputElement} parentCheckboxElement
 */
function addChildCheckboxes(parentCheckboxElement) {
  const childContainer = document.createElement("div");
  childContainer.classList.add("childContainer");
  const children = childCheckBoxes[parentCheckboxElement.value];

  children.forEach((element, position) => {
    childContainer.appendChild(createCheckbox(element, position));
  });

  parentCheckboxElement.parentElement.append(childContainer);
  parentCheckboxElement.scrollIntoView({ behavior: "smooth" });
}

/**
 * Handles parent checkbox selection
 * @param {MouseEvent} event
 */
function handleCheckboxSelection(event) {
  const view = event.target;

  if (view.name === "cb-parent" && view.checked === true) {
    addChildCheckboxes(view);
  } else {
    view.parentElement.removeChild(view.parentElement.lastChild);
  }
}

// add click listener to all parent checkboxes
document.getElementsByName("cb-parent").forEach((element) => element.addEventListener("click", handleCheckboxSelection));
