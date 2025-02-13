$(function() {

    $("a").click(function(event) {
        event.preventDefault(); // Estetään linkin alkuperäinen toiminta

        let articleId = $(this).data('article-id'); // Linkin data-article id ja artikkelin id samat

        $('#' + articleId).fadeIn(2000); // Article-elementti tulee esiin 2 sekunnin päästä
        $('article').fadeOut(3000); // ja häviää automaattisesti 3 sekunnin päästä.

        // Toiminto pätee kaikille kolmelle linkille ja artikkelille
    });


});