import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common-comp/like";

class Movie extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete(stateID) {
    // console.log(stateID);
    const newMovie = this.state.movies.filter(el => el._id !== stateID);
    this.setState({ movies: newMovie });
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    let index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
    console.log(movies[index].liked);
  };

  componentDidUpdate() {
    //console.log(this.state.movies);
  }

  render() {
    if (this.state.movies.length <= 0)
      return <p>There are no movies in the databases</p>;
    return (
      <React.Fragment>
        <p>Showing {this.state.movies.length} movies in the databases</p>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
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
                  {" "}
                  <Like
                    liked={movie.liked}
                    onLikeToggle={() => this.handleLike(movie)}
                  />{" "}
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
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
