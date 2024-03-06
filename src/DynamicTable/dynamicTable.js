/* eslint-disable no-alert */
const tableElement = document.getElementById("tableDynamic");
const tablebody = tableElement.tBodies[0];
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const errorMessages = {
  nameError: "Please enter a name.",
  emailError: "Please enter valid email.",
};

/**
 * creates a text input element and returns it
 * @param {String} value
 * @returns {HTMLInputElement}
 */
function getInputElement(value) {
  const inputElement = document.createElement("input");
  inputElement.value = value;
  return inputElement;
}

/**
 * Validates entered name and email and if valid replaces input with text
 * and save button with edit/delete.
 * @param {MouseEvent} event
 */
function handleSave(event) {
  const saveElement = event.target;
  const parentRowElement = saveElement.parentElement.parentElement;

  // name
  const nameCellElement = parentRowElement.cells[0];
  const name = nameCellElement.firstChild.value;
  if (name.length === 0) {
    alert(errorMessages.nameError);
    return;
  }

  // email
  const emailCellElement = parentRowElement.cells[1];
  const email = emailCellElement.firstChild.value;
  if (!emailRegex.test(email)) {
    alert(errorMessages.emailError);
    return;
  }

  nameCellElement.replaceChildren(document.createTextNode(name));
  emailCellElement.replaceChildren(document.createTextNode(email));

  // action
  const actionCellElement = parentRowElement.cells[2];
  actionCellElement.replaceChildren(getActionElement());
}

/**
 * Makes the corresponding row editable and replaces edit/delete with save button
 * @param {MouseEvent} event
 */
function handleEdit(event) {
  const editElement = event.target;
  console.log(editElement);
  const parentRowElement = editElement.parentElement.parentElement.parentElement;

  // name
  const nameCellElement = parentRowElement.cells[0];
  const name = nameCellElement.innerHTML;
  nameCellElement.replaceChildren(getInputElement(name));

  // email
  const emailCellElement = parentRowElement.cells[1];
  const email = emailCellElement.innerHTML;
  emailCellElement.replaceChildren(getInputElement(email));

  // action
  const actionCellElement = parentRowElement.cells[2];
  actionCellElement.replaceChildren(getLinkElement("Save", handleSave));
}

/**
 * Deletes the corresponding row
 * @param {MouseEvent} event
 */
function handleDelete(event) {
  const editElement = event.target;
  const parentRowElement = editElement.parentElement.parentElement.parentElement;
  tablebody.removeChild(parentRowElement);
}

/**
 * creates a link element with given text and adds the event listener
 * @param {String} text link text
 * @param {Function} eventListener event handler
 * @returns {HTMLElement}
 */
function getLinkElement(text, eventListener) {
  const linkElement = document.createElement("div");
  linkElement.classList.add("link");
  linkElement.innerHTML = text;
  linkElement.onclick = eventListener;
  return linkElement;
}

/**
 * Creates and returns a div containing edit and delete links
 * @returns {HTMLElement}
 */
function getActionElement() {
  const containerElement = document.createElement("div");
  containerElement.classList.add("actionContainer");

  const editLink = getLinkElement("Edit", handleEdit);
  const textNode = document.createTextNode("\u00A0/\u00A0");
  const deletetLink = getLinkElement("Delete", handleDelete);

  containerElement.appendChild(editLink, handleEdit);
  containerElement.appendChild(textNode);
  containerElement.appendChild(deletetLink, handleDelete);

  return containerElement;
}

/**
 * Inserts a new row into the table
 */
function addNewRow() {
  const postion = tablebody.rows.length;
  tablebody.insertRow(postion);

  // add name cell
  tablebody.rows[postion].insertCell(0);
  tablebody.rows[postion].cells[0].appendChild(document.createElement("input"));

  // add email cell
  tablebody.rows[postion].insertCell(1);
  tablebody.rows[postion].cells[1].appendChild(document.createElement("input"));

  // add action cell
  tablebody.rows[postion].insertCell(2);
  tablebody.rows[postion].cells[2].appendChild(getLinkElement("Save", handleSave));
}

// attach listener for add button click
document.getElementById("buttonAdd").addEventListener("click", addNewRow);
