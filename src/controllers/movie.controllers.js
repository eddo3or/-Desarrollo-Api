const { response } = require('express');
const Movie = require('../models/movie.model')
const API_KEY = "5a8497c";




function findAll(req,res){
    const data = Movie.findAll();
    res.status(200).json(data);
}

function findById(req,res){
    const movie = Movie.findById(req.params.id);
    return movie ? res.status(200).json(movie) : res.status(404).json({message: "Pelicula no encontrada"})
}

function updateMovie (req, res){
    const id = req.params.id;
    const updated = Movie.updateMovie(id,req.body)

    if(!updated){
        return res.status(404).json({message:"Pelicula no encontrada"})
    }

    res.status(200).json(updated)
}

async function addMovie(req, res) {
    const title = req.params.title;
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${title}&plot=full`);
        const data = await response.json();

        if (!data || data.Response === "False") {
            return res.status(404).json({message: "PELICULA NO ENCONTRADA"});
        }

        const createdMovie = Movie.addMovie(data); 
        return res.status(201).json(createdMovie); 
    } catch (error) {
        return res.status(500).json({message: "Error del servidor"});
    }
}

function removeMovie(req,res) {
    const id = req.params.id;
    const ok = Movie.removeMovie(id);
    if(!ok){
        return res.status(404).json({message: "Pelicula no encontrada"});
    }
    res.status(200).json({message:'Pelicula eliminada de tu lista'});
}

module.exports = {
    findAll, findById, addMovie, updateMovie, removeMovie
}