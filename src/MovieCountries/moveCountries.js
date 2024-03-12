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

    this.optionList.forEach((optionText) => {
      const option = new Option(optionText, optionText);
      leftSelectBox.add(option, undefined);
    });

    buttonAdd.addEventListener("click", this.handleButtonClick.bind(this));
    buttonRemove.addEventListener("click", this.handleButtonClick.bind(this));
  }

  /**
   * handle add remove
   * @param {MouseEvent} event
   */
  handleButtonClick(event) {
    const buttonElement = event.target;
    const isAdd = buttonElement.id === "buttonAdd";
    const fromSelectBox = isAdd ? this.leftSelectBox : this.rightSelectBox;
    const toSelectBox = isAdd ? this.rightSelectBox : this.leftSelectBox;

    const elementsToMove = [...fromSelectBox.childNodes]
      .filter((element) => element.selected === true)
      .map((element) => { // remove selection
        element.selected = false;
        return element;
      });
    elementsToMove.forEach((node) => {
      fromSelectBox.removeChild(node);
      toSelectBox.appendChild(node);
    });
  }
}

function onLoad() {
  const leftSelectBox = document.getElementById("lstBoxLeft");
  const rightSelectBox = document.getElementById("lstBoxRight");
  const buttonAdd = document.getElementById("buttonAdd");
  const buttonRemove = document.getElementById("buttonRemove");
  // init country multi select
  const countrySelecy = new MultiSelectElement({
    leftSelectBox, rightSelectBox, buttonAdd, buttonRemove, optionList: countriesList,
  });
}

window.addEventListener("load", onLoad);
