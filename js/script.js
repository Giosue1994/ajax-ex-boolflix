$(document).ready(function() {

  // 13feba4bc2e448e7522d3eaca8987928
  // https://api.themoviedb.org/3/search/movie?api_key=13feba4bc2e448e7522d3eaca8987928&query=ritorno al futuro&language=it-IT

  // al click del bottone cerco i film che vengono scritti sull'input
  $('#search').click(function() {

    var inputSearch = $('#input-search').val();
    console.log(inputSearch);

    filmSearch(inputSearch);
  });

});

// funzione ricerca film
function filmSearch(filmName) {

  $.ajax(
    {
      url: 'https://api.themoviedb.org/3/search/movie',
      method: "GET",
      data : {
        api_key: '13feba4bc2e448e7522d3eaca8987928',
        language: 'it-IT',
        query: filmName
      },

      success: function(data) {
        var film = data.results;
        console.log(film);

        printFilm(film);
      },

      error: function() {
        alert("Errore");
      }

    }
  );
}


// funzione stampa film
function printFilm(film) {
  $('.film-list').html('');

  var source = $("#film-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < film.length; i++) {

    var context = {
      title: film.title,
      originalTitle: film.original_title,
      language: film.original_language,
      vote: film.vote_average
    };

    console.log(context);

    var html = template(context);

    $('.film-list').append(html);
  }
}
