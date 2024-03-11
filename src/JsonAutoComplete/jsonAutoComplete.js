const autoCompleteSearchHelper = {
  names: [
    { name: "Luigi Damiano" },
    { name: "Zenith Coboro" },
    { name: "Zig Ziglar" },
    { name: "Steve Costner" },
    { name: "Bill Grazer" },
    { name: "Timothy Frazer" },
    { name: "Boris Becker" },
    { name: "Glenn Gladwich" },
    { name: "Jim Jackson" },
    { name: "Aaron Kabin" },
    { name: "Roy Goldwin" },
    { name: "Jason Goldberg" },
    { name: "Tim Ferris" },
    { name: "Buck Singham" },
    { name: "Malcom Gladwell" },
    { name: "Joy Rabura" },
    { name: "Vid Luther" },
    { name: "Tom Glicken" },
    { name: "Ray Baxter" },
    { name: "Ari Kama" },
    { name: "Kenichi Suzuki" },
    { name: "Rick Olson" },
  ],
  /**
   * matches input text with name list
   * @param {String} input
   * @returns {Array} list of matched names
   */
  autocompleteSearch(input) {
    if (input === "") {
      return [];
    }
    return this.names.filter((term) => term.name.toLowerCase().includes(input.toLowerCase()));
  },
};

class AutoCompleteElement {
  constructor(inputElement, autoResultElement) {
    this.inputElement = inputElement;
    this.autoResultElement = autoResultElement;
  }

  /**
   * shows option list
   */
  showOptionList() {
    if (!this.autoResultElement.classList.contains("show")) {
      this.autoResultElement.classList.add("show");
    }
  }

  /**
   * hides option list
   */
  hideOptionList() {
    if (this.autoResultElement.classList.contains("show")) {
      this.autoResultElement.classList.remove("show");
    }
  }

  /**
   * Handles option click event
   * @param {MouseEvent} event
   */
  handleOptionClick(event) {
    const option = event.target;
    this.inputElement.value = option.innerHTML;
    this.hideOptionList();
  }

  /**
   * Shows the dropdown for given input
   * @param {MouseEvent} event
   */
  showResults(event) {
    const inputElement = event.target;
    const input = inputElement.value;
    const matchedNames = autoCompleteSearchHelper.autocompleteSearch(input);

    const ul = document.createElement("ul");
    matchedNames.forEach((match) => {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(match.name));
      li.addEventListener("click", this.handleOptionClick);
      ul.appendChild(li);
    });

    this.autoResultElement.innerHTML = "";
    this.autoResultElement.appendChild(ul);

    if (matchedNames.length > 0) {
      this.showOptionList();
    } else {
      this.hideOptionList();
    }
  }

  registerInputClickListener() {
    this.inputElement.addEventListener("input", this.showResults.bind(this));
  }
}

const autoCompleteElement = new AutoCompleteElement(document.getElementById("inputName"), document.getElementById("autoResult"));
autoCompleteElement.registerInputClickListener();
