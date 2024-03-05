const Strings = {
  isOlderText: '%s is older than %s.',
  sameAgeText: '%s and %s are of same age.',
};

function formatText(text, ...args) {
  return args.reduce((prevVal, currentVal) => prevVal.replace(/%s/, currentVal), text);
}

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  compare(user) {
    if (this.age > user.age) return formatText(Strings.isOlderText, this.name, user.name);
    if (this.age === user.age) return formatText(Strings.sameAgeText, this.name, user.name);
    return formatText(Strings.isOlderText, user.name, this.name);
  }
}

const user1 = new User('Sumit', 12);
const user2 = new User('Raj', 13);

console.log(user1.compare(user2));
