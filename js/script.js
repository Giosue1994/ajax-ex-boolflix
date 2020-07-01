$(document).ready(function() {
// 13feba4bc2e448e7522d3eaca8987928
// https://api.themoviedb.org/3/search/movie?api_key=13feba4bc2e448e7522d3eaca8987928&query=ritorno al futuro&language=it-IT

  // al click del bottone cerco i film che vengono scritti sull'input
  $('#search').click(function() {
    var inputSearch = $('#input-search').val();
    filmSearch(inputSearch);
  });

  // al click del tasto invia sull'input cerco i film
  $('#input-search').keydown(function(event) {
      if (event.which === 13 || event.keyCode === 13) {
        var inputSearch = $('#input-search').val();
        filmSearch(inputSearch);
      }
    });

});

//////////////////////////////////////////////////////
// FUNZIONE RICERCA FILM
function filmSearch(filmQuery) {

  $.ajax(
    {
      url: 'https://api.themoviedb.org/3/search/movie',
      method: "GET",
      data : {
        api_key: '13feba4bc2e448e7522d3eaca8987928',
        language: 'it-IT',
        query: filmQuery
      },

      success: function(data) {
        var film = data.results;
        // stampo i film su schermo
        printFilm(film);
      },

      error: function() {
        alert("Errore");
      }

    }
  );
}


//////////////////////////////////////////////////////
// FUNZIONE STAMPA FILM
function printFilm(film) {
  $('.film-list').html('');

  var source = $("#film-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < film.length; i++) {

    var thisFilm = film[i];

    var context = {
      title: thisFilm.title,
      originalTitle: thisFilm.original_title,
      language: thisFilm.original_language,
      vote: thisFilm.vote_average
    };

    var html = template(context);

    $('.film-list').append(html);
  }
}
