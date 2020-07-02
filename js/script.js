$(document).ready(function() {
// 13feba4bc2e448e7522d3eaca8987928
// https://api.themoviedb.org/3/search/movie?api_key=13feba4bc2e448e7522d3eaca8987928&query=ritorno al futuro&language=it-IT

  // al click del bottone cerco i film che vengono scritti sull'input
  $('#search').click(function() {
    var inputSearch = $('#input-search').val();
    filmSearch(inputSearch);
    tvShowSearch(inputSearch);
  });

  // al click del tasto invia sull'input cerco i film
  $('#input-search').keydown(function(event) {
      if (event.which === 13 || event.keyCode === 13) {
        var inputSearch = $('#input-search').val();
        filmSearch(inputSearch);
        tvShowSearch(inputSearch);
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

        if (film.length > 0) {
          printFilm(film);
        } else {
          messageError('Scrivi qualcosa di sensato cretino...');
        }
      },

      error: function() {
        messageError('Ricerca non avvenuta, forse dovresti scrivere qulacosa, non ti pare?');
      }

    }
  );
}

//////////////////////////////////////////////////////
// FUNZIONE RICERCA SERIE TV
function tvShowSearch(tvShowQuery) {

  $.ajax(
    {
      url: 'https://api.themoviedb.org/3/search/tv',
      method: "GET",
      data : {
        api_key: '13feba4bc2e448e7522d3eaca8987928',
        language: 'it-IT',
        query: tvShowQuery
      },

      success: function(data) {
        var tvShow = data.results;

        if (tvShow.length > 0) {
          printTvShow(tvShow);
        } else {
          messageError('Scrivi qualcosa di sensato cretino...');
        }

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

    var context = {
      title: thisFilm.title,
      originalTitle: thisFilm.original_title,
      language: thisFilm.original_language,
      vote: thisFilm.vote_average,
      tipology: 'Film'
    };

    var html = template(context);

    $('.film-list').append(html);
  }
}

//////////////////////////////////////////////////////
// FUNZIONE STAMPA SERIE TV
function printTvShow(tvShow) {

  var source = $("#film-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < tvShow.length; i++) {

    var thisTvShow = tvShow[i];

    var context = {
      title: thisTvShow.name,
      originalTitle: thisTvShow.original_name,
      language: thisTvShow.original_language,
      vote: thisTvShow.vote_average,
      tipology: 'Serie TV'
    };

    var html = template(context);

    $('.film-list').append(html);
  }
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
