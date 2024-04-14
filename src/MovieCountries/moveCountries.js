/* eslint-disable no-param-reassign */
const countriesList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)"];

class MultiSelectElement {
  constructor({
    leftSelectBox, rightSelectBox, buttonAdd, buttonRemove, optionList,
  }) {
    this.leftSelectBox = leftSelectBox;
    this.rightSelectBox = rightSelectBox;
    this.buttonAdd = buttonAdd;
    this.buttonRemove = buttonRemove;
    this.optionList = optionList;
  }

  init() {
    this.optionList.forEach((optionText) => {
      const option = new Option(optionText, optionText);
      this.leftSelectBox.add(option, undefined);
    });

    this.buttonAdd.addEventListener("click", this.handleButtonClick.bind(this));
    this.buttonRemove.addEventListener("click", this.handleButtonClick.bind(this));
    this.leftSelectBox.addEventListener("change", this.handleListSelectionChange.bind(this));
    this.rightSelectBox.addEventListener("change", this.handleListSelectionChange.bind(this));

    // initially the buttons would be disabled
    this.buttonAdd.disabled = true;
    this.buttonRemove.disabled = true;
  }

  handleListSelectionChange(event) {
    const selectElement = event.target;
    const buttonToUpdate = selectElement.dataset.select === "leftbox" ? this.buttonAdd : this.buttonRemove;
    this.updateButtonDisabledState(buttonToUpdate, selectElement);
  }

  /**
   * handle add remove
   * @param {MouseEvent} event
   */
  handleButtonClick(event) {
    const buttonElement = event.target;
    const isAdd = buttonElement.dataset.button === "add";
    const fromSelectBox = isAdd ? this.leftSelectBox : this.rightSelectBox;
    const toSelectBox = isAdd ? this.rightSelectBox : this.leftSelectBox;

    const elementsToMove = [...fromSelectBox.childNodes]
      .filter((element) => element.selected === true)
      .map((element) => { // remove selection
        element.selected = false;
        return element;
      });
    elementsToMove.forEach((node) => fromSelectBox.removeChild(node));
    this.addAndSort(toSelectBox, elementsToMove);
    this.updateButtonDisabledState(isAdd ? this.buttonAdd : this.buttonRemove, fromSelectBox);
  }

  /**
   * sort the options of received selectElement based on string value
   * @param {HTMLSelectElement} selectElement
   */
  addAndSort(selectElement, elementsToMove) {
    const clonedArray = [...selectElement.options, ...elementsToMove];
    clonedArray.sort((a, b) => a.value.localeCompare(b.value));
    selectElement.options.innerHTML = "";
    clonedArray.forEach((option) => selectElement.add(option, null));
  }

  /**
   * Update given button enable/disable state based on the items seleceted in selectElement
   * @param {HTMLButtonElement} buttonToUpdate
   * @param {HTMLSelectElement} selectElement
   */
  updateButtonDisabledState(buttonToUpdate, selectElement) {
    buttonToUpdate.disabled = [...selectElement.childNodes].every((e) => !e.selected);
  }

  static create({
    leftSelectBox, rightSelectBox, buttonAdd, buttonRemove, optionList,
  }) {
    const countrySelect = new MultiSelectElement({
      leftSelectBox, rightSelectBox, buttonAdd, buttonRemove, optionList,
    });
    countrySelect.init();
  }
}

function onLoad() {
  const args = {
    leftSelectBox: document.getElementById("lstBoxLeft"),
    rightSelectBox: document.getElementById("lstBoxRight"),
    buttonAdd: document.getElementById("buttonAdd"),
    buttonRemove: document.getElementById("buttonRemove"),
    optionList: countriesList,
  };

  MultiSelectElement.create(args);
}

window.addEventListener("load", onLoad);
