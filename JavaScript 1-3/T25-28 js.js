
let tasks = [];

const generateNumber = numberGenerator();

// Generoidaan numeroita
function* numberGenerator() {
    let number = 1;
    while(true) {
        yield number++;
    }
}

// Määritellään tehtävän sisältämät tiedot ja lisätään listaan
function createAndAddTask() {
    let chore = document.getElementById("chore").value;
    let priority = document.getElementById("priority").value;
    let duedate = document.getElementById("duedate").value;

    if (!chore && !priority && !duedate) {
        window.alert("Tarkista, onko kaikki kentät täytetty ja oikein.");
        return;

    } else {

        if (!chore) { // Jos tehtävässä ei ole tietoja
            window.alert("Tehtäväkuvauksen tiedot tarvitaan.");
            return;
        }

        // parseInt(priority); ?
        if (!priority) { // Jos prioriteetissa ei ole tietoja
            window.alert("Prioriteetti tarvitaan.");
            return;
        }
        else if (isNaN(priority)) {
            window.alert("Syötä prioriteettiin lukuarvo.");
            return;
        } else if (priority < 1) {
            priority = 1;
        } else if (priority > 5) {
            priority = 5;
        }

        let currentDate = new Date();
        // Määritellään järjestelmän nykyinen päivämäärä
        currentDate.setHours(0, 0, 0, 0); // <- Tunnit, minuutit, sekunnit ja millisekunnit 
        // Määritellään tunnit keskiyöhön asti, jotta ohjelma hyväksyy 
        // myös nykyisen päivän, mutta ei eilistä.
        let inputDate;

        if (!duedate) { // Tarkistetaan onko päiväyksessä mitään
            let tomorrowDate = new Date();
            inputDate = new Date(tomorrowDate);
            inputDate.setDate(tomorrowDate.getDate() + 1);
        } else {
            inputDate = new Date(duedate);

            if (inputDate < currentDate) {
                window.alert("Päivämäärä ei voi olla menneisyydessä.");
                return;
            }
        }

        duedate = `${inputDate.getDate().toString().padStart(2, '0')}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate.getFullYear()}`;
        // TÄRKEÄ!
        // Tämä muuttaa päiväyksen muotoon pp.kk.vvvv ja näkyviin listaan

        let task = {
            chore: chore,
            priority: priority,
            duedate: duedate,
            number: generateNumber.next().value
        }

        tasks.push(task); // Laitetaan tehtävä listaan

        updateTasks(); // Päivitetään tehtävät
    }

}

let order = true; // Lajitellaan lista

function sortTasks() {
    tasks.sort((a, b) => {
        if (a.disabled < b.disabled) return 1;
        if (a.disabled > b.disabled) return -1;

        const dateA = new Date(a.duedate);
        const dateB = new Date(b.duedate);
        return dateA - dateB;
        });
    order = !order;

    updateTasks();
}

function updateTasks() {

    // Haetaan HTML-tiedostosta table-taulukko
    let array = document.getElementById("tasksarray");

    while (array.rows.length > 1) {
        array.deleteRow(1);
    }

    for(let i = 0; i < tasks.length; i++) {

            let task = tasks[i];

            // Yhden rivin lisääminen
            let row = array.insertRow();
            
            // Luodaan listaan ensimmäisenä prioriteettiosio ja sille rivi
            let cellPriority = row.insertCell(0);
            cellPriority.textContent = task.priority;

            // Päivämäärä ja rivi
            let cellDueDate = row.insertCell(1);
            cellDueDate.textContent = task.duedate;

            // Tehtävä
            let cellChore = row.insertCell(2);
            cellChore.textContent = task.chore;

            // Rivi Tilalle
            let cellStatus = row.insertCell(3);

            // Luodaan painike
            // Painike on alkuarvoltaan käytössä ja tekstinä on "Kesken"
            let changeStatus = document.createElement("button");
            changeStatus.textContent = "Kesken";
            changeStatus.disabled = false;

            // Kun sitä klikataan, painike poistuu käytöstä, tekstiksi tulee "Valmis" ja saa uuden tyylin
            changeStatus.addEventListener("click", function() {
                changeStatus.disabled = true;
                changeStatus.textContent = "Valmis";
                row.classList.add("disabled-row");
            })

        // Tämä lisää painikkeen Tila-riville listaan
        cellStatus.appendChild(changeStatus);

        let cellNumber = row.insertCell(4);
        cellNumber.textContent = task.number;
    }

}