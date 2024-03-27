/* eslint-disable no-alert */
class DaysMultiSelect {
  constructor({ maxAllowedSelection, daysCheckboxes, noneCheckbox }) {
    this.maxAllowedSelection = maxAllowedSelection;
    this.daysCheckboxes = daysCheckboxes;
    this.noneCheckbox = noneCheckbox;
    this.selectedDays = [];
  }

  handleNoneCheckUncheck() {
    if (this.noneCheckbox.checked === true) {
      this.selectedDays = [];
      Array.prototype.filter.call(this.daysCheckboxes, (e) => e.checked)
        .forEach((element) => {
          // eslint-disable-next-line no-param-reassign
          element.checked = false;
        });
    }
  }

  /**
   * @param {EventTarget} view
   */
  handleDaysCheckUncheck(view) {
    if (view.checked === true) {
      if (this.selectedDays.length === this.maxAllowedSelection) {
        view.checked = false;
        alert(`Only ${this.maxAllowedSelection} days can be selected. You have already selected ${this.selectedDays[0]}, ${this.selectedDays[1]} and ${this.selectedDays[2]}`);
      } else {
        this.noneCheckbox.checked = false;
        this.selectedDays.push(view.value);
      }
    } else {
      const index = this.selectedDays.indexOf(view.value);
      this.selectedDays.splice(index, 1);
    }
  }

  init() {
    this.daysCheckboxes.forEach((v) => {
      v.addEventListener("click", () => this.handleDaysCheckUncheck(v));
    });
    this.noneCheckbox.addEventListener("click", () => this.handleNoneCheckUncheck());
  }

  static create({ maxAllowedSelection, daysCheckboxes, noneCheckbox }) {
    // allow number >= 2 and <=7
    const cleanedMaxAllowedSelection = Math.max(2, Math.min(7, maxAllowedSelection));

    const daysMultiSelect = new DaysMultiSelect({
      maxAllowedSelection: cleanedMaxAllowedSelection,
      daysCheckboxes,
      noneCheckbox,
    });
    daysMultiSelect.init();
  }
}

window.addEventListener("load", () => {
  const daysCheckboxes = document.querySelectorAll("input[data-day]:not([data-day='none'])");
  const noneCheckbox = document.querySelector("[data-day='none']");
  const maxAllowedSelection = 3;

  DaysMultiSelect.create({ maxAllowedSelection, daysCheckboxes, noneCheckbox });
});
