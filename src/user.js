class User {
  /**
   * @param {string} firstname 
   * @param {string} lastname 
   * @param {string} email 
   * @param {Date} birthdate 
   * @param {string} password
   */
  constructor(firstname, lastname, email, birthdate, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.birthdate = birthdate;
    this.password = password;
  }

  get age() {
    return new Date().getFullYear() - this.birthdate.getFullYear();
  }

  isValid() {
    if (this.firstname.length < 2 || this.firstname.length > 20) {
      return false;
    }

    if (this.lastname.length < 2 || this.lastname.length > 20) {
      return false;
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(this.email)) {
      return false;
    }

    if (this.age < 13) {
      return false;
    }

    // Numbers regex
    const numbersRegex = /[0-9]+/;

    // Uppercase regex
    const uppercaseRegex = /[A-Z]+/;

    // lowercase regex
    const lowercaseRegex = /[a-z]+/;

    if (
      this.password.length < 8
      || this.password.length > 40
      || !this.password.match(numbersRegex)
      || !this.password.match(uppercaseRegex)
      || !this.password.match(lowercaseRegex)
    ) {
      return false;
    }

    return true;
  }
}

export default User;