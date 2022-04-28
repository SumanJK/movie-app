async function searchMovies() {
  try {
    var movieName = document.getElementById("movieSearch").value;
    if (movieName.length == 0) {
      document.getElementById("main").innerHTML = "";
      document.getElementById("searchedMovie").innerHTML = "";
    } else {
      var res = await fetch(
        `https://www.omdbapi.com/?apikey=592615f&s=${movieName}`
      );
      var data = await res.json();
      console.log("data:", data);

      var arr2 = [];
      for (var i = 0; i < data.Search.length; i++) {
        getRating(data.Search[i].imdbID, arr2);
      }
    }
    // appendData(data.Search)
  } catch (err) {
    console.log(err);
  }
}

async function getRating(id, arr2) {
  try {
    var response = await fetch(
      `http://www.omdbapi.com/?apikey=592615f&i=${id}`
    );
    var k = await response.json();

    if (k === undefined) {
      return false;
    }
    arr2.push(k);
    showMovie(arr2);
    // console.log('rating:', rating.imdbRating)
  } catch (err) {
    console.log("err:", err);
  }
}
var displayResult = document.createElement("div");
displayResult.setAttribute("id", "displayTitles");

function showMovie(movies) {
  console.log("movies:", movies);

  displayResult.innerHTML = "";
  var seachedTitles = document.getElementById("seachedTitles");

  movies.map(function (elem) {
    var movienames = document.createElement("p");
    movienames.textContent = elem.Title;
    movienames.onclick = function () {
      appendData(elem);
    };

    displayResult.append(movienames);
  });
  seachedTitles.append(displayResult);

  //! movie boxes---------->>>>>>>>>>>>>>>>>>>>

  let trendBox = document.getElementById("main");
  trendBox.innerHTML = "";
  movies.map((elem) => {
    console.log('elem:', elem)

    let movie = document.createElement("div");
    movie.setAttribute("class", "movie");

    let img = document.createElement("img");
    img.src = `${elem.Poster}`;

    let movie_info = document.createElement("div");
    movie_info.setAttribute("class", "movie_info");

    let movieTitle = document.createElement("h3");
    movieTitle.textContent = elem.Title;

    let rating = document.createElement("span");
    rating.setAttribute("class", "green");
    rating.innerHTML = `${elem.imdbRating}<i class="fa-solid fa-star"></i>`;


    let releaseDate = document.createElement("p");
    releaseDate.textContent = `Release date-${elem.Released}`;

    let overview = document.createElement("div");
    overview.setAttribute("class", "overview");

    let h3 = document.createElement("h3");
    h3.textContent = "overview";

    let description = document.createElement("p");
    description.textContent = elem.Plot;

    if (elem.imdbRating > 8.5) {
        let recomand = document.createElement("div");
        recomand.setAttribute("class", "recomanded");

      var rec = document.createElement("h3");
      rec.textContent = "RECOMANDED";

      trendBox.append(movie);
      movie.append(img, movie_info, releaseDate,recomand,overview);
      recomand.append(rec)
      movie_info.append(movieTitle, rating);
      overview.append(h3, description);
    } else {
      trendBox.append(movie);
      movie.append(img, movie_info, releaseDate, overview);
      movie_info.append(movieTitle, rating);
      overview.append(h3, description);
    }
  });
}

function appendData(movies) {
  document.getElementById("searchedMovie").innerHTML = "";

  var div = document.createElement("div");

  var div1 = document.createElement("div");

  var div2 = document.createElement("div");

  var img = document.createElement("img");
  img.src = movies.Poster;

  var name = document.createElement("h4");
  name.textContent = movies.Title;

  var year = document.createElement("p");
  year.innerHTML = `Year:${movies.Year}`;

  var type = document.createElement("p");
  type.innerHTML = `Type:${movies.Type}`;

  var genre = document.createElement("p");
  genre.innerHTML = `Genre:${movies.Genre}`;

  var actors = document.createElement("p");
  actors.innerHTML = `Actors:${movies.Actors}`;

  var awards = document.createElement("p");
  awards.innerHTML = `Awards:${movies.Awards}`;

  var language = document.createElement("p");
  language.innerHTML = `Language:${movies.Language}`;

  var runtime = document.createElement("p");
  runtime.innerHTML = `Runtime:${movies.Runtime}`;


  var rating = document.createElement("h5");
  rating.innerHTML = `IMDb Rating:${movies.imdbRating} <i class="fas fa-star"></i>`;

    document.getElementById("searchedMovie").append(div);

    div.append(div1, div2);
    div1.append(img);
    div2.append(name, year, type,genre,actors,awards,language,runtime, rating);
  
}
var timerId;
function debounce(func, delay) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(function () {
    func();
  }, delay);
}
