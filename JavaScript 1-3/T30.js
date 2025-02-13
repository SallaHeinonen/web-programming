

function Student(name, dateOfBirth, address, phoneNumber) {
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.print = function() {
        console.log(`Oppilaan nimi on ${this.name}, syntymäpäivä ${this.dateOfBirth}, osoite ${this.address} ja puhelinnumero ${this.phoneNumber}`);
    }
    this.countAge = function() {
        let birthDate = new Date(this.dateOfBirth);
        let currentDate = new Date();

        const age = currentDate.getFullYear() - birthDate.getFullYear();
        console.log("Oppilaan ikä on " + age + " vuotta.");
    }

}

let student = new Student("Rae Higgins", "6-10-1987", "Haapamäentie 34 A 8", "05012345678");

student.print();
student.countAge();



