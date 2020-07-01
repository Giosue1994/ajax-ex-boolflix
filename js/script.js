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
      },

      error: function() {
        alert("Errore");
      }

    }
  );
}
