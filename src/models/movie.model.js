const {randomUUID} = require("node:crypto");


let movieList = [
    {
    id: randomUUID(),
    title: "Prueba",
    runtime:"129 min",
    director:"tun tun sahur",
    imdbRating:"7.4",
    watched: false,
    }
];

//GET
function findAll(){
    return movieList;
}

//GET by ID
function findById(id){
    const index = movieList.findIndex(t=> t.id===id);
    if(index == -1)
        return false;
    return movieList[index];  
}

//POST
function addMovie(item){
    const movie = {
    id: randomUUID(),
    title: item.Title,
    runtime: item.Runtime,
    director:item.Director,
    imdbRating:item.imdbRating,
    watched: false,
    }
    movieList.push(movie);
    return movie;
}

//PUT
function updateMovie(id,data){
    const index = movieList.findIndex((u) => u.id == id);

    if(index == -1) return null;
    movieList[index] = {
        ...movieList[index],
        title: typeof data.title == "undefined" ? movieList[index].title:data.title,
        runtime: typeof data.runtime == "undefined" ? movieList[index].runtime:data.runtime,
        director: typeof data.director == "undefined" ? movieList[index].director:data.director,
        imdbRating: typeof data.imdbRating == "undefined" ? movieList[index].imdbRating:data.imdbRating,
        watched: typeof data.watched == "undefined" ? movieList[index].watched:data.watched,
    }

    return movieList[index];
}

function removeMovie(id){
    const index = movieList.findIndex(t=> t.id===id);
    if(index ==-1)
        return false;
    movieList.slice(index,1)
    return true;
}

module.exports = {
    addMovie, findAll, findById, removeMovie, updateMovie
}