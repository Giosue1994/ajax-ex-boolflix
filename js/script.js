$(document).ready(function() {

  // al click del bottone cerco i media che vengono scritti nell'input
  $('#search').click(function() {
    var inputSearch = $('#input-search').val();
    reset();
    mediaSearch(inputSearch);
  });

  // al click del tasto invia nell'input cerco i media
  $('#input-search').keydown(function(event) {
      if (event.which === 13 || event.keyCode === 13) {
        var inputSearch = $('#input-search').val();
        reset();
        mediaSearch(inputSearch);
      }
    });

});


//////////////////////////////////////////////////////
// FUNZIONE RICERCA MEDIA
function mediaSearch(mediaQuery) {

  // variabili ajax
  var url = 'https://api.themoviedb.org/3/search/multi';
  var apiKey = '13feba4bc2e448e7522d3eaca8987928';
  var language = 'it-IT';

  $.ajax(
    {
      url: url,
      method: "GET",
      data : {
        api_key: apiKey,
        language: language,
        query: mediaQuery
      },

      success: function(data) {
        var media = data.results;

        // eseguo un ciclo for in per ciclare gli oggetti
        for (var key in media) {
          var thisMedia = media[key];

          // se il media_type è uguale a 'tv' aggiungo un valore 'title' che è uguale a 'name'
          if (thisMedia.media_type == 'tv') {
            var thisMediaTitle = thisMedia['title']=thisMedia.name;
            var thisMediaOriginalTitle = thisMedia['original_title']=thisMedia.original_name;
          };

        }

        // se la lunghezza di quello che scrivo è maggiore di 0 stampo sullo schermo
        if (media.length > 0) {
          printMedia(media);
        } else {
          var errorMessagge = 'Scrivi qualcosa di sensato cretino...';
          messageError(errorMessagge);
        };
      },

      error: function() {
        var errorMessagge = 'Ricerca non avvenuta, forse dovresti scrivere qulacosa, non ti pare?';
        messageError(errorMessagge);
      }

    }
  );
}


//////////////////////////////////////////////////////
// FUNZIONE STAMPA MEDIA
function printMedia(media) {

  var source = $("#media-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < media.length; i++) {
    var thisMedia = media[i];
    var poster = posterPath(thisMedia.poster_path);

    // se il 'media_type' è diverso da 'person' stampa su schermo
    if(thisMedia['media_type'] != 'person') {

      var context = {
        posterPath: poster,
        title: thisMedia.title,
        originalTitle: thisMedia.original_title,
        language: thisMedia.original_language,
        vote: voteInStar(thisMedia.vote_average),
        overview: printOverview(thisMedia.overview),
        tipology: thisMedia.media_type
      };

      var html = template(context);

      $('.media-list').append(html);
    }
  };

}

//////////////////////////////////////////////////////
// FUNZIONE VOTO IN STELLE
function voteInStar(vote) {
  var voteFive = Math.round(vote / 2);

  var stars = '';

  for (var i = 1; i <= 5; i++) {
    if (i <= voteFive) {
      stars += '<i class="fas fa-star"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }

  return stars;
}

//////////////////////////////////////////////////////
// FUNZIONE IMMAGINE MOVIE
function posterPath(poster) {
  var posterPath = 'img/img_not_found.png';

  if (poster != undefined) {
    posterPath = 'https://image.tmdb.org/t/p/w342' + poster;
  }

  return posterPath;
}

//////////////////////////////////////////////////////
// FUNZIONE OVERVIEW
function printOverview(overview) {

  var thisOverview = overview;

  if (thisOverview == '') {
    thisOverview = 'Descrizione non disponbile';
  }

  return thisOverview;
}



//////////////////////////////////////////////////////
// FUNZIONE RESET
function reset() {
  $('.media-list').html('');
}

//////////////////////////////////////////////////////
// FUNZIONE MESSAGGIO DI ERRORE
function messageError(message) {
  var source = $("#error-template").html();
  var template = Handlebars.compile(source);

  var context = {
    message: message,
  };

  var html = template(context);

  $('.media-list').append(html);

}
