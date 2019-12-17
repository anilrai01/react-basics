import React from "react";
import Form from "./common-comp/form";
import Joi from "joi-browser";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      number: "",
      rate: ""
    },

    errors: {},
    genres: []
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),

    genre: Joi.string()
      .required()
      .label("Genre"),

    number: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),

    rate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      number: movie.numberInStock,
      rate: movie.dailyRentalRate
    };
  }

  reDirect = () => {
    this.props.history.push("/");
  };

  afterSubmit = () => {
    // if(this)
    saveMovie(this.state.data);
    this.props.history.push("/movies");
    console.log("Edited");
  };

  render() {
    // const { id } = this.props.match.params;
    // console.log("Inside Render",this.state.movieID)
    console.log(this.state.data);
    console.log(this.state.genres);
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("number", "Number In Stock", "number")}
          {this.renderInput("rate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
