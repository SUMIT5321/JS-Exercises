/* eslint-disable no-alert */
class FormClickHandler {
  constructor(daysCheckboxes, noneCheckbox) {
    this.daysCheckboxes = daysCheckboxes;
    this.noneCheckbox = noneCheckbox;
    this.selectedDays = [];
  }

  handleNoneCheckUncheck() {
    if (this.noneCheckbox.checked === true) {
      this.selectedDays.splice(0, this.selectedDays.length);
      this.daysCheckboxes.forEach((element) => {
      // eslint-disable-next-line no-param-reassign
        element.checked = false;
      });
    }
  }

  /**
   *
   * @param {EventTarget} view
   */
  handleDaysCheckUncheck(view) {
    if (view.checked === true) {
      if (this.selectedDays.length === 3) {
        view.checked = false;
        alert(`Only 3 days can be selected. You have already selected ${this.selectedDays[0]}, ${this.selectedDays[1]} and ${this.selectedDays[2]}`);
      } else {
        this.noneCheckbox.checked = false;
        this.selectedDays.push(view.value);
      }
    } else {
      const index = this.selectedDays.indexOf(view.value);
      this.selectedDays.splice(index, 1);
    }
  }

  /**
  * @param {MouseEvent} event
  */
  handleFormClick(event) {
    const view = event.target;

    if (view.type !== "checkbox") {
      return;
    }

    if (view.value === "None") { // none checked/unchecked
      this.handleNoneCheckUncheck();
    } else { // days checked / unchecked
      this.handleDaysCheckUncheck(view);
    }
  }
}

const formClickHandler = new FormClickHandler(document.getElementsByName("days"), document.getElementsByName("days-none")[0]);
document.forms[0].addEventListener("click", formClickHandler.handleFormClick.bind(formClickHandler));
