/* eslint-disable no-alert */
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const errorMessages = {
  nameError: "Please enter a name.",
  emailError: "Please enter valid email.",
};

class DynamicTable {
  constructor(table, addButton) {
    this.table = table;
    [this.tablebody] = table.tBodies;

    addButton.addEventListener("click", this.addNewRow.bind(this));
  }

  /**
   * Inserts a new row into the table
   */
  addNewRow() {
    const postion = this.tablebody.rows.length;
    this.tablebody.insertRow(postion);

    // add name cell
    this.tablebody.rows[postion].insertCell(0);
    this.tablebody.rows[postion].cells[0].appendChild(document.createElement("input"));

    // add email cell
    this.tablebody.rows[postion].insertCell(1);
    this.tablebody.rows[postion].cells[1].appendChild(document.createElement("input"));

    // add action cell
    this.tablebody.rows[postion].insertCell(2);
    this.tablebody.rows[postion].cells[2].appendChild(this.getLinkElement("Save", this.handleSave));
  }

  /**
   * creates a text input element and returns it
   * @param {String} value
   * @returns {HTMLInputElement}
   */
  getInputElement(value) {
    const inputElement = document.createElement("input");
    inputElement.value = value;
    return inputElement;
  }

  /**
   * Validates entered name and email and if valid replaces input with text
   * and save button with edit/delete.
   * @param {MouseEvent} event
   */
  handleSave(event) {
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
    actionCellElement.replaceChildren(this.getEditDeleteElement());
  }

  /**
   * Makes the corresponding row editable and replaces edit/delete with save button
   * @param {MouseEvent} event
   */
  handleEdit(event) {
    const editElement = event.target;
    console.log(editElement);
    const parentRowElement = editElement.parentElement.parentElement.parentElement;

    // name
    const nameCellElement = parentRowElement.cells[0];
    const name = nameCellElement.innerHTML;
    nameCellElement.replaceChildren(this.getInputElement(name));

    // email
    const emailCellElement = parentRowElement.cells[1];
    const email = emailCellElement.innerHTML;
    emailCellElement.replaceChildren(this.getInputElement(email));

    // action
    const actionCellElement = parentRowElement.cells[2];
    actionCellElement.replaceChildren(this.getLinkElement("Save", this.handleSave));
  }

  /**
   * Deletes the corresponding row
   * @param {MouseEvent} event
   */
  handleDelete(event) {
    const editElement = event.target;
    const parentRowElement = editElement.parentElement.parentElement.parentElement;
    this.tablebody.removeChild(parentRowElement);
  }

  /**
   * creates a link element with given text and adds the event listener
   * @param {String} text link text
   * @param {Function} eventListener event handler
   * @returns {HTMLElement}
   */
  getLinkElement(text, eventListener) {
    const linkElement = document.createElement("div");
    linkElement.classList.add("link");
    linkElement.innerHTML = text;
    linkElement.onclick = eventListener.bind(this);
    return linkElement;
  }

  /**
   * Creates and returns a div containing edit and delete links
   * @returns {HTMLElement}
   */
  getEditDeleteElement() {
    const containerElement = document.createElement("div");
    containerElement.classList.add("actionContainer");

    const editLink = this.getLinkElement("Edit", this.handleEdit);
    const textNode = document.createTextNode("\u00A0/\u00A0");
    const deletetLink = this.getLinkElement("Delete", this.handleDelete);

    containerElement.appendChild(editLink, this.handleEdit);
    containerElement.appendChild(textNode);
    containerElement.appendChild(deletetLink, this.handleDelete);

    return containerElement;
  }
}

function initializeDynamicTable() {
  const table = document.getElementById("tableDynamic");
  const addButton = document.getElementById("buttonAdd");

  new DynamicTable(table, addButton);
}

window.addEventListener("load", initializeDynamicTable);
