import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Likes from "./common-comp/likes";

class Movie extends Component {
  state = {
    movies: getMovies(),
    likeStat: false
  };

  handleDelete(stateID) {
    // console.log(stateID);
    const newMovie = this.state.movies.filter(el => el._id !== stateID);
    this.setState({ movies: newMovie });
  }

  handleLike(movie) {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  }

  componentDidUpdate() {
    //console.log(this.state.movies);
  }

  render() {
    if (this.state.movies.length <= 0)
      return <p>There are no movies in the databases</p>;
    return (
      <React.Fragment>
        <p>Showing {this.state.movies.length} movies in the databases</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th />
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Likes
                    onClick={() => {
                      this.handleLike(movie);
                    }}
                    movies={movie}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.handleDelete(movie._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movie;
