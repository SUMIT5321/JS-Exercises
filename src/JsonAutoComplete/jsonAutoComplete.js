const names = [
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
];

/**
 * class used to auto search from the list given an input
 */
class AutoCompleteSearchHelper {
  constructor(list) {
    this.list = list;
  }

  /**
   * matches input text with name list
   * @param {String} input
   * @returns {Array} list of matched items
   */
  search(input) {
    if (input === "") {
      return [];
    }
    return this.list.filter((term) => term.name.toLowerCase().includes(input.toLowerCase()));
  }

  static getHelper(list) {
    return new AutoCompleteSearchHelper(list);
  }
}

class AutoComplete {
  constructor({
    inputElement, autoResultWrapperElement, unorderedList, sampleListItem, searchHelper,
  }) {
    this.inputElement = inputElement;
    this.autoResultWrapperElement = autoResultWrapperElement;
    this.unorderedList = unorderedList;
    this.sampleListItem = sampleListItem;
    this.searchHelper = searchHelper;
  }

  /**
   * shows option list
   */
  showOptionList() {
    if (!this.autoResultWrapperElement.classList.contains("show")) {
      this.autoResultWrapperElement.classList.add("show");
    }
  }

  /**
   * hides option list
   */
  hideOptionList() {
    if (this.autoResultWrapperElement.classList.contains("show")) {
      this.autoResultWrapperElement.classList.remove("show");
    }
  }

  /**
   * Handles option click event
   * @param {MouseEvent} event
   */
  handleOptionClick(event) {
    const option = event.target;
    this.inputElement.value = option.dataset.value;
    this.hideOptionList();
  }

  /**
   * Shows the dropdown for given input
   * @param {MouseEvent} event
   */
  showResults(event) {
    const inputElement = event.target;
    const input = inputElement.value;
    const matchedNames = this.searchHelper.search(input);

    this.unorderedList.innerHTML = "";
    matchedNames.forEach((match) => {
      const li = this.sampleListItem.cloneNode(true);
      li.innerHTML = match.name;
      li.setAttribute("data-value", match.name);
      li.addEventListener("click", this.handleOptionClick.bind(this));
      this.unorderedList.appendChild(li);
    });

    if (matchedNames.length > 0) {
      this.showOptionList();
    } else {
      this.hideOptionList();
    }
  }

  init() {
    this.unorderedList.removeChild(this.sampleListItem);
    this.inputElement.addEventListener("input", this.showResults.bind(this));
  }

  /**
   * creates AutoComplete initializes it and returns the instance
   * @param {object}
   * @returns {AutoComplete}
   */
  static create({
    inputElement, autoResultWrapperElement, unorderedList, sampleListItem, searchHelper,
  }) {
    const autoComplete = new AutoComplete({
      inputElement, autoResultWrapperElement, unorderedList, sampleListItem, searchHelper,
    });
    autoComplete.init();
    return autoComplete;
  }
}

function createAutoComplete() {
  const inputElement = document.querySelector("[data-input='name']");
  const autoResultWrapperElement = document.querySelector("[data-autoResult='outerAutoResult']");
  const unorderedList = autoResultWrapperElement.querySelector("[data-autoResult='innerAutoResult']");
  const sampleListItem = unorderedList.querySelector("[data-name='sample']");
  const searchHelper = AutoCompleteSearchHelper.getHelper(names);

  AutoComplete.create({
    inputElement, autoResultWrapperElement, unorderedList, sampleListItem, searchHelper,
  });
}

window.addEventListener("load", createAutoComplete);
