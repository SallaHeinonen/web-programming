class Student {
    constructor(name, dateOfBirth, address, phoneNumber) {
        this._name = name;
        this._dateOfBirth = dateOfBirth;
        this._address = address;
        this._phoneNumber = phoneNumber;
    }

    // Getterit ja setterit
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }

    get dateOfBirth() {
        return this._dateOfBirth;
    }
    set dateOfBirth(newDateOfBirth) {
        this._dateOfBirth = newDateOfBirth;
    }

    get address() {
        return this._address;
    }
    set address(newAddress) {
        this._address = newAddress;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(newPhoneNumber) {
        this._phoneNumber = newPhoneNumber;
    }

    // Metodit/functions
    print() {
        console.log("Oppilaan nimi on " + this.name + 
                    ", syntymäpäivä " + this.dateOfBirth + 
                    ", osoite " + this.address + 
                    " ja puhelinnumero " + this.phoneNumber);
    }
    countAge() {
        let birthDate = new Date(this.dateOfBirth);
        let currentDate = new Date();

        // Nykyinen vuosi - käyttäjän antama vuosi
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        console.log("Oppilaan ikä on", age, "vuotta");
    }
}

const student1 = new Student("Maija Meikäläinen", "1997-06-14", "Puijonkatu 45", "05012345678");

console.log("Oppilas: ", student1.name);

student1.print();
student1.countAge();