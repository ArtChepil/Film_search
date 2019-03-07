'use strict';

let APIKEY = '49b89c92701bcf329307e3f8cd4a0c65';
let baseURL = 'https://api.themoviedb.org/3/';
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const container = document.querySelector('.show_block');
let addedMovies =[];
form.addEventListener("submit", getValue);

function getValue(evt) {
    evt.preventDefault();
    resetContainer();
    const value = input.value;
    runSearch(value);
}

function runSearch(keyword) {
    let url = `${baseURL}search/movie?api_key=${APIKEY}&query=${keyword}`;
    fetch(url)
    .then(result=> result.json())
    .then((data)=>{
    let arr = data.results;
    let id = 0;
    arr.forEach(item =>{
        id ++;
    const movie = {
        id: id,
        title: item.title,
        overview: item.overview,
        poster_path: item.poster_path,
        popularity: item.popularity,
    };
    addedMovies.push(movie);
    })
    updateGrid(addedMovies); 

    })
}

function updateGrid(items) {
    if (items.length > 0) {
        const markup = createItems(items);
        container.innerHTML = markup;
    } else {
        container.innerHTML = ''; 
    }
}

function resetContainer(){
    addedMovies = [];
}

function createItems(movies) {
    return movies.reduce((acc, item) =>
        acc +
        `<div class="box">
            <div class="in_box_1">
                <img class="item-img" src=https://image.tmdb.org/t/p/w300${item.poster_path} alt="pic">
                    <p class="popularity">popularity ${item.popularity}</p> 
            </div>
            <div class="in_box_2">
                <h1 class="title">${item.title}</h1>
                    <p class="overview">${item.overview}</p>
                    <hr>
            </div>
        </div>`
        , '');
}


var scrolled;
var timer;

document.getElementById('top').onclick = function(){
	scrolled = window.pageYOffset;	
	scrollToTop();
}
function scrollToTop(){
	if (scrolled > 0) {
		window.scrollTo(0, scrolled);
		scrolled = scrolled - 70; 
		timer = setTimeout(scrollToTop, 10);
	}
	else {
		clearTimeout(timer);
		window.scrollTo(0,0);
	}
}