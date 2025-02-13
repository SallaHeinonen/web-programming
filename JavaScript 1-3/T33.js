/*
33. Lisää oppilas-luokalle getteri

    arvosanatMuutetullaAsteikolla,

joka palauttaa arvosanataulukon niin, että arvosanat on muutettu asteikolle 0-5 (logiikalla 1 ja 2 = I, 3-4 = II, 5-6=III, 7-8=IV ja 9-10=V). 
Käytä tehtävässä map() metodia. 
*/

class Student {
    constructor(name, dateOfBirth, address, phoneNumber) {
        this._name = name;
        this._dateOfBirth = dateOfBirth;
        this._address = address;
        this._phoneNumber = phoneNumber;
        this._grades = []; // Tyhjä array, jossa kaikki arvosanat
    }

    // Lisätään arvosana tuomalla luokka parametreineen.
    addGrade(subject, number, executionDate) {

        let newGrade = new Grade(subject, number, executionDate);

        // Tämä tarkistaa numeron setteristä arvon ja asettaa sen arvosanaan
        newGrade.number = number;

        // Lisätään kaikki Arvosana-luokan tiedot taulukkoon push-toiminnolla
        this._grades.push(newGrade);
    }
    
    // Arvosanan tulostus
    printGrades() {
        console.log("Oppilaan arvosanat");

        this._grades.forEach(newGrade => {
            console.log(`Oppiaine: ${newGrade.subject}, arvosana ${newGrade.number}, suorituspäivämäärä ${newGrade.executionDate.getDate()}.${newGrade.executionDate.getMonth() + 1}.${newGrade.executionDate.getFullYear()}`);
        });
    }

    get modifiedGradeValues() {
        const gradeMapping = {
            0: 0,
            1: "I",
            2: "I",
            3: "II",
            4: "II",
            5: "III",
            6: "III",
            7: "IV",
            8: "IV",
            9: "V",
            10: "V",
        };

        return this._grades.map(grade => ({
            subject: grade.subject,
            number: gradeMapping[grade.number],
            executionDate: grade.executionDate
        }));
    }

    printModifiedGrades() {
        console.log("Oppilaan muokatut arvosanat");

        this._grades.forEach(newGrade => {
            console.log(`Oppiaine: ${newGrade.subject}, arvosana ${newGrade.number}, suorituspäivämäärä ${newGrade.executionDate.getDate()}.${newGrade.executionDate.getMonth() + 1}.${newGrade.executionDate.getFullYear()}`);
        });
    }


    print() {
        console.log("Oppilaan nimi on " + this._name + 
                    ", syntymäpäivä " + this._dateOfBirth + 
                    ", osoite " + this._address + 
                    " ja puhelinnumero " + this._phoneNumber);
    }
    countAge() {
        let birthDate = new Date(this.dateOfBirth);
        let currentDate = new Date();

        // Nykyinen vuosi - käyttäjän antama vuosi
        const age = currentDate.getFullYear() - birthDate.getFullYear();
        console.log("Oppilaan ikä on", age, "vuotta");
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

}

// Arvosana-luokka
class Grade {
    constructor(subject, number, executionDate) {
        this._subject = subject;
        this._number = number;
        this._executionDate = new Date(executionDate); // Suorituspvm Date-muodossa
    }

    get subject() {
        return this._subject;
    }
    set subject(newSubject) {
        this._subject = newSubject;
    }

    get number() {
        return this._number;
    }

    // Tarkistetaan arvosana
    set number(newNumber) {
        if (newNumber === 0) {
            this._number = "Hylätty";
        } else if (newNumber >= 1 && newNumber <= 10) {
            this._number = newNumber;
        } else {
            this._number = "Virheellinen arvosana";
        }
    }

    get executionDate() {
        return this._executionDate;
    }
    set executionDate(newExecutionDate) {
        this._executionDate = newExecutionDate;
    }
}

const student1 = new Student("Mikko Mallikas", "1996-10-02", "Puijonkatu 45", "05012345678");

console.log("Oppilas:", student1.name);

student1.print();
student1.countAge();

student1.addGrade("Matematiikka", 7, "2023-02-19");
student1.addGrade("Historia", 11, "2022-06-27");
student1.addGrade("Englanti", 9, "2021-12-04");
student1.addGrade("Ruotsi", 0, "2023-11-14");
student1.addGrade("Äidinkieli", -1, "2022-10-10");
student1.addGrade("Maantieto", 8, "2021-05-23");
student1.addGrade("Kuvaamataito", 10, "2023-02-16");
student1.addGrade("Terveystieto", 5, "2021-09-30");
student1.addGrade("Yhteiskuntaoppi", 2, "2023-03-01");

student1.printGrades();

let modifiedGrades = student1.modifiedGradeValues;

console.log("Muutetut arvosanat:", modifiedGrades);
// Ei toiminut ihan niin kuin toivoi.. 