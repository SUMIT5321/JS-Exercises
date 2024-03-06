const countriesList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Côte d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)"];
const leftSelectBox = document.getElementById("lstBoxLeft");
const rightSelectBox = document.getElementById("lstBoxRight");

/**
 *
 * @param {MouseEvent} event
 */
function handleButtonClick(event) {
  const buttonElement = event.target;
  const isAdd = buttonElement.id === "buttonAdd";
  const fromSelectBox = isAdd ? leftSelectBox : rightSelectBox;
  const toSelectBox = isAdd ? rightSelectBox : leftSelectBox;

  const elementsToMove = [...fromSelectBox.childNodes]
    .filter((element) => element.selected === true);
  elementsToMove.forEach((node) => {
    fromSelectBox.removeChild(node);
    toSelectBox.appendChild(node);
  });
}

function onLoad() {
  countriesList.forEach((country) => {
    const countryOption = new Option(country, country);
    leftSelectBox.add(countryOption, undefined);
  });
}

window.addEventListener("load", onLoad);
document.getElementById("buttonAdd").addEventListener("click", handleButtonClick);
document.getElementById("buttonRemove").addEventListener("click", handleButtonClick);
