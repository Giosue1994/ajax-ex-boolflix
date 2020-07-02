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
      url: 'https://api.themoviedb.org/3/search/multi',
      method: "GET",
      data : {
        api_key: '13feba4bc2e448e7522d3eaca8987928',
        language: 'it-IT',
        query: filmQuery
      },

      success: function(data) {
        var film = data.results;

        // eseguo un ciclo for in per ciclare gli oggetti
        for (var key in film) {
          var thisFilm = film[key];

          // se il media_type è uuale a tv aggiungo un valore title che è uguale a name
          if (thisFilm.media_type == 'tv') {
            var thisFilmTitle = thisFilm['title']=thisFilm.name;
            var thisFilmOriginalTitle = thisFilm['original_title']=thisFilm.original_name;
          };

        }

        if (film.length > 0) {
          printFilm(film);
        } else {
          messageError('Scrivi qualcosa di sensato cretino...');
        };
      },

      error: function() {
        messageError('Ricerca non avvenuta, forse dovresti scrivere qulacosa, non ti pare?');
      }

    }
  );
}


//////////////////////////////////////////////////////
// FUNZIONE STAMPA FILM
function printFilm(film) {
  reset();

  var source = $("#film-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < film.length; i++) {
    var thisFilm = film[i];

    if(thisFilm['media_type'] != 'person') {

      var context = {
        title: thisFilm.title,
        originalTitle: thisFilm.original_title,
        language: thisFilm.original_language,
        flag: 'img/' + thisFilm.original_language + '.png',
        vote: thisFilm.vote_average,
        tipology: thisFilm.media_type
      };

      var html = template(context);

      $('.film-list').append(html);
    }
    };


}

//////////////////////////////////////////////////////
// FUNZIONE RESET
function reset() {
  $('.film-list').html('');
}

//////////////////////////////////////////////////////
// FUNZIONE MESSAGGIO DI ERRORE
function messageError(message) {
  reset();
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);

  var context = {
    message: message,
  };

  var html = template(context);

  $('.film-list').append(html);

}
