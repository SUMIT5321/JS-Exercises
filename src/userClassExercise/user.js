const MAX_AGE = 125;
const MIN_AGE = 0;

const texts = {
  isOlderText: (older, younger) => `${older} is older than ${younger} and`,
  sameAgeText: (name1, name2) => `${name1} and ${name2} are of same age.`,
};

/**
 * User class
 * @param {String} name - user name
 * @param {Number} age - user age
 */
class User {
  constructor(name, age) {
    // check valid age
    if (age < MIN_AGE || age > MAX_AGE) {
      throw Error("Age must be between 0 and 125");
    }

    // check valid name
    if (name.trim().length === 0) {
      throw Error("Name must not be empty");
    }

    this.name = name;
    this.age = age;
  }

  /**
   * @param {User} user - another user to compare this user with
   * @returns String message
   */
  compare(user) {
    if (this.age > user.age) return texts.isOlderText(this.name, user.name);
    if (this.age === user.age) return texts.sameAgeText(this.name, user.name);
    return texts.isOlderText(user.name, this.name);
  }
}

const user1 = new User("Sumit", 15);
const user2 = new User("Raj", 15);

console.log(user1.compare(user2));
