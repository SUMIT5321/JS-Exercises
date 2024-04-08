// regex
const REGEX_VALUE_AND_OPERATORS = /[\d.*+\-/]/;

// calculator constants
const CAL_AC = "AC";
const CAL_DE = "DE";
const CAL_DOT = ".";
const CAL_DIVIDE = "/";
const CAL_MUL = "*";
const CAL_MINUS = "-";
const CAL_PLUS = "+";
const CAL_EQUAL = "=";

// Calculator class
class Calculator {
  constructor({ containerId }) {
    this.container = document.querySelector(containerId);
    this.#init();
  }

  #init() {
    const createFirstRow = () => {
      const displayDiv = document.createElement("div");
      displayDiv.classList.add("display");
      const displayInput = document.createElement("input");
      displayDiv.appendChild(displayInput);
      return { displayDiv, displayInput };
    };

    const createRow = (...buttons) => {
      const rowDiv = document.createElement("div");
      buttons.forEach((element) => {
        const button = document.createElement("input");
        button.type = "button";
        button.value = element;
        button.onclick = this.handleClick.bind(this);
        rowDiv.appendChild(button);
      });
      return rowDiv;
    };

    const createLastRow = () => {
      const lastRow = createRow("00", 0, CAL_EQUAL);
      lastRow.lastElementChild.classList.add("equal");
      return lastRow;
    };

    // create innerContainer
    const innerContainer = document.createElement("div");
    innerContainer.classList.add("calculator");

    // create all rows in the calculator
    const { displayDiv, displayInput } = createFirstRow();
    this.display = displayInput;
    innerContainer.appendChild(displayDiv);
    innerContainer.appendChild(createRow(CAL_AC, CAL_DE, CAL_DOT, CAL_DIVIDE));
    innerContainer.appendChild(createRow(7, 8, 9, CAL_MUL));
    innerContainer.appendChild(createRow(4, 5, 6, CAL_MINUS));
    innerContainer.appendChild(createRow(1, 2, 3, CAL_PLUS));
    innerContainer.appendChild(createLastRow());

    // add inner container to the calculator container
    this.container.appendChild(innerContainer);
  }

  /**
   * Handles click on form element
   * @param {MouseEvent} event
   * @returns nothing
   */
  handleClick(event) {
    const view = event.target;

    if (view.type !== "button") return;
    const { value } = view;

    if (value === CAL_AC) {
      this.display.value = "";
      return;
    }

    if (value === CAL_DE) {
      this.display.value = this.display.value.toString().slice(0, -1);
      return;
    }

    if (value === CAL_EQUAL) {
      try {
        // eslint-disable-next-line no-eval
        this.display.value = eval(this.display.value);
      } catch (error) {
        this.display.value = "error";
      }
      return;
    }

    if (REGEX_VALUE_AND_OPERATORS.test(value)) {
      this.display.value += value;
    }
  }

  // static helper method to create calculator
  static create({ containerId }) {
    const calculator = new Calculator({ containerId });
    return calculator;
  }
}

window.addEventListener("load", () => {
  Calculator.create({ containerId: "[data-container='calculator']" });
});
