$(function() {

    function clickBox($box, contentPath, contentType) {
        // - luukun avaaminen animoidaan kahden sekunnin ajalla (show, fade, animate, tms..)

        // Animaatio, jossa kuva häivenee samalla kun sen leveys pienenee vasemmalle
        $box.animate({
            opacity: 0,
            width: 0
        }, 1000, function() { // Animaation kesto 1s
            $box.empty(); // Laatikon tyhjennys

            // Tarkistetaan mitä tyyppiä datapankissa on
            if (contentType === 'image') {
                let picture = $('<img>', {
                    src: contentPath,
                    width: 200,
                    height: 200
                });
    
                // Laitetaan datapankin kuva laatikkoon
                $box.append(picture);
    
            } else if (contentType === 'text') {
                // Tuodaan datateksti laatikkoon
                $box.text(contentPath);

            } else if (contentType === 'video') {
                let video = $('<video>', {
                    src: contentPath,
                    width: 200,
                    height: 200,
                    // Videoon ei omasta mielestä tarvita kontrolleja,
                    // näyttää paremmalle kun se käynnistyy ja pyörii itsestään loopilla.
                    controls: false,
                    autoplay: true,
                    loop: true
                });
                // Asetetaan video ruutuun
                $box.append(video);
            }

            // Tarkastuksen jälkeen suoritetaan sama animaatio, kun sisältö tuodaan esille
            $box.animate({
                opacity: 1,
                width: 200
            });
        });
    }

    $('.box').click(function() { // Määritellään mikä tahansa laatikoista
        let $box = $(this); // Juuri se kyseinen laatikko, mitä klikataan

        // Tarkistetaan, onko luukku jo avattu
        if (!$box.hasClass('open')) { // Kun laatikolla ei ole luokkaa "open"

            let contentPath;
            let contentType = '';

            // Onko luukussa datatyyppiä image, text tai video
            if ($box.data('image')) {
                contentPath = $box.data('image');
                contentType = 'image';
            } else if ($box.data('text')) {
                contentPath = $box.data('text');
                contentType = 'text';
            } else if ($box.data('video')) {
                contentPath = $box.data('video');
                contentType = 'video';
            }
            // Haetaan järjestelmän nykyinen päivä
            let currentDate = new Date();
            let currentDay = currentDate.getDate();

            // Jos nykyinen päivä on enemmän kuin 9 TAI luukun ID on vähemmän kuin nykyinen päivä
            if (currentDate >= 9 || parseInt($box.attr('id').substr(1)) <= currentDay) {
                $box.addClass('open'); // Lisätään ruutuun luokka 'open'

                // Ja toteutetaan ruudun klikkausfunktio.
                clickBox($box, contentPath, contentType);

            } else {
                alert("Voit avata vain tämän päivän tai aiempien päivien luukkuja.");
            }

        } else {
            alert('Tämä luukku on jo avattu.');
        }
    });

});