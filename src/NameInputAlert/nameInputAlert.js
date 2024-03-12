const pageCreator = {
  forcePrompt(msg) {
    const value = prompt(msg);

    if (value && value.trim()) return value;
    return this.forcePrompt(msg);
  },
  createPage() {
    const firstName = this.forcePrompt("Enter first name");
    const lastName = this.forcePrompt("Enter last name");

    document.write(`Hello, ${firstName} ${lastName}`);
  },
};

pageCreator.createPage.call(pageCreator);
