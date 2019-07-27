import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movie extends Component {
  state = {
    movies: getMovies()
  };

  handleDel(elem_id) {
    console.log(elem_id);
    console.log("Delete Pressed");
    const movies = this.state.movies.filter(el => el._id !== elem_id);
    this.setState({ movies });
  }

  render() {
    const { length } = this.state.movies;
    if (length < 1)
      return <p className="mt-5">There are no movies in the database</p>;
    return (
      <React.Fragment>
        <p className="mt-5">Showing {length} movies in the database</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(el => (
              <tr key={el._id}>
                <td>{el.title}</td>
                <td>{el.genre.name}</td>
                <td>{el.numberInStock}</td>
                <td>{el.dailyRentalRate}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.handleDel(el._id);
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
