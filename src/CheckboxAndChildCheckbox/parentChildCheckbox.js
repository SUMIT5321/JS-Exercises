const checkBoxData = {
  color: ["Red", "Yellow", "Green", "Blue"],
  movie: ["Dar", "Sir"],
  drinks: ["Coke", "Pepsi", "Dew"],
  bikes: ["V-rod", "Pulsar", "cbz"],
};

class NestedCheckbox {
  constructor({ containerId, data }) {
    this.container = document.querySelector(containerId);
    this.data = data;
    this.#init();
  }

  #init() {
    const checkboxInnerContainer = document.createElement("div");
    checkboxInnerContainer.classList.add("checkBoxContainer");
    Object.keys(this.data).forEach((key) => {
      const cb = this.createCheckbox(key, false, this.handleParentCheckboxSelection.bind(this));
      checkboxInnerContainer.appendChild(cb);
    });
    this.container.appendChild(checkboxInnerContainer);
  }

  createCheckbox(label, checked, handleChange) {
    const cbInput = document.createElement("input");
    cbInput.type = "checkbox";
    cbInput.id = `id-${label}`;
    cbInput.value = label;
    cbInput.dataset.key = label;
    cbInput.checked = checked;
    cbInput.onchange = (event) => handleChange(event);

    const spaceTextNode = document.createTextNode("\t");

    const cbLabel = document.createElement("label");
    const tn = document.createTextNode(label);
    cbLabel.htmlFor = cbInput.id;
    cbLabel.appendChild(tn);

    const parentDiv = document.createElement("div");
    parentDiv.appendChild(cbInput);
    parentDiv.appendChild(spaceTextNode);
    parentDiv.appendChild(cbLabel);
    return parentDiv;
  }

  /**
   * Handle parent checkbox selection
   * @param {MouseEvent} event
   */
  handleParentCheckboxSelection(event) {
    const parentCb = event.target;
    if (parentCb.checked === true) {
      this.addChildCheckboxes(parentCb);
    } else {
      parentCb.parentElement.removeChild(parentCb.parentElement.lastChild);
    }
  }

  /**
  * Adds child checkboxes for given input checkbox
  */
  addChildCheckboxes(parentCb) {
    const childContainer = document.createElement("div");
    childContainer.classList.add("childContainer");
    const children = this.data[parentCb.dataset.key];

    children.forEach((element) => {
      childContainer.appendChild(
        this.createCheckbox(element, true, this.handleChildCheckboxClick.bind(this)),
      );
    });

    parentCb.parentElement.append(childContainer);
    parentCb.scrollIntoView({ behavior: "smooth" });
  }

  /**
   * Handles child checkbox click
   * @param {MouseEvent} event
   */
  handleChildCheckboxClick(event) {
    const childView = event.target;
    const childContainer = childView.parentElement.parentElement;

    const areAllChecked = [...childContainer.childNodes].some((element) => element.querySelector("input").checked);

    if (!areAllChecked) {
      const superParent = childContainer.parentElement;
      superParent.removeChild(childContainer);
      superParent.querySelector("input").checked = false;
    }
  }

  static create(params) {
    const nestedCheckBox = new NestedCheckbox(params);
    return nestedCheckBox;
  }
}

window.addEventListener("load", () => {
  const params = {
    containerId: "[data-container='nestedCheckbox']",
    data: checkBoxData,
  };
  NestedCheckbox.create(params);
});
