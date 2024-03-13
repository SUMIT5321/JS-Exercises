const childCheckBoxes = {
  color: ["Red", "Yellow", "Green", "Blue"],
  movie: ["Dar", "Sir"],
  drinks: ["Coke", "Pepsi", "Dew"],
  bikes: ["V-rod", "Pulsar", "cbz"],
};

class NestedCheckbox {
  constructor(parentCheckbox, chidrenData) {
    this.parentCheckbox = parentCheckbox;
    this.chidrenData = chidrenData;

    parentCheckbox.addEventListener("click", this.handleParentCheckboxSelection.bind(this));
  }

  handleParentCheckboxSelection() {
    const { parentElement } = this.parentCheckbox;

    if (this.parentCheckbox.checked === true) {
      this.addChildCheckboxes();
    } else {
      parentElement.removeChild(parentElement.lastChild);
    }
  }

  /**
  * Adds child checkboxes for given input checkbox
  */
  addChildCheckboxes() {
    const childContainer = document.createElement("div");
    childContainer.classList.add("childContainer");
    const children = this.chidrenData;

    children.forEach((element, position) => {
      childContainer.appendChild(this.createChildCheckbox(element, position));
    });

    this.parentCheckbox.parentElement.append(childContainer);
    this.parentCheckbox.scrollIntoView({ behavior: "smooth" });
  }

  /**
   * Creates a checkbox, returns it wrapped in a DocumentFragment
   * @param {String} data - data to be used to create child checkbox
   * @param {Number} position - postion of the checkbox in the list
   * @returns {DocumentFragment} - returns DocumentFragment wrapping checkbox with its lable
   */
  createChildCheckbox(data, position) {
    const fragment = document.createDocumentFragment();
    const checkbox = document.createElement("input");
    const spaceTextNode = document.createTextNode("\t");
    const br = document.createElement("br");
    checkbox.type = "checkbox";
    checkbox.name = data;
    checkbox.id = data;
    checkbox.value = data;
    checkbox.checked = true;
    checkbox.onclick = this.handleChildCheckboxClick.bind(this);

    const label = document.createElement("label");
    const tn = document.createTextNode(data);
    label.htmlFor = data;
    label.appendChild(tn);

    if (position !== 0) fragment.appendChild(br);
    fragment.appendChild(checkbox);
    fragment.appendChild(spaceTextNode);
    fragment.appendChild(label);
    return fragment;
  }

  /**
   * Handles child checkbox click
   * @param {MouseEvent} event
   */
  handleChildCheckboxClick(event) {
    const childView = event.target;
    const childContainer = childView.parentElement;

    const areAllChecked = [...childContainer.childNodes].reduce(
      ((previous, current) => current.checked || previous),
      false,
    );

    if (!areAllChecked) {
      const superParent = childContainer.parentElement;
      superParent.removeChild(childContainer);
      this.parentCheckbox.checked = false;
    }
  }
}

// add click listener to all parent checkboxes
document.getElementsByName("cb-parent").forEach((element) => new NestedCheckbox(element, childCheckBoxes[element.value]));
