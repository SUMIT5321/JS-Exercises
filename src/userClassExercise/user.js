import formatText from "../util/stringUtils";
import strings from "./strings";

class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  compare(user) {
    if (this.age > user.age) return formatText(strings.isOlderText, this.name, user.name);
    if (this.age === user.age) return formatText(strings.sameAgeText, this.name, user.name);
    return formatText(strings.isOlderText, user.name, this.name);
  }
}

const user1 = new User("Sumit", 12);
const user2 = new User("Raj", 13);

console.log(user1.compare(user2));
