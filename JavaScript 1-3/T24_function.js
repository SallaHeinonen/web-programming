
function askName() {
    let nimi = prompt("Kerro nimesi:"); // Nimi, joka saa arvon kun esiin tulee prompt-ilmoitus ja tekstikenttä

    if (nimi != null) { // Tarkistaa, ettei nimi ole tyhjä, muuten ei tapahdu mitään

        nimi = nimi.toUpperCase(); 
        // Muuttaa kyseisen nimen kaikki kirjaimet isoiksi

        document.getElementById("result").textContent = "Nimesi on: " + nimi;
        // Etsii HTML-tiedostosta tekstikentän, jonka ID on "result" ja muuttaa sen varsinaista tekstisisältöä

    }
    
}

