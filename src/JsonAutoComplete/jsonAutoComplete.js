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
const autoResultBox = document.getElementById("autoResult");
const inputBox = document.getElementById("inputName");

/**
 * shows option list
 */
function showOptionList() {
  if (!autoResultBox.classList.contains("show")) {
    autoResultBox.classList.add("show");
  }
}

/**
 * hides option list
 */
function hideOptionList() {
  if (autoResultBox.classList.contains("show")) {
    autoResultBox.classList.remove("show");
  }
}

/**
 * Handles option click event
 * @param {MouseEvent} event
 */
function handleOptionClick(event) {
  const option = event.target;
  inputBox.value = option.innerHTML;
  hideOptionList();
}

/**
 * matches input text with name list
 * @param {String} input
 * @returns {Array} list of matched names
 */
function autocompleteMatch(input) {
  if (input === "") {
    return [];
  }
  return names.filter((term) => term.name.toLowerCase().includes(input.toLowerCase()));
}

/**
 * Shows the dropdown for given input
 * @param {MouseEvent} event
 */
function showResults(event) {
  const inputElement = event.target;
  const input = inputElement.value;
  const matchedNames = autocompleteMatch(input);

  const ul = document.createElement("ul");
  matchedNames.forEach((match) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(match.name));
    li.addEventListener("click", handleOptionClick);
    ul.appendChild(li);
  });

  autoResultBox.innerHTML = "";
  autoResultBox.appendChild(ul);

  if (matchedNames.length > 0) {
    showOptionList();
  } else {
    hideOptionList();
  }
}

inputBox.addEventListener("input", showResults);
