import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common-comp/like";
import Pagination from "./common-comp/pagination";
import { paginate } from "./utils/paginate";

class Movie extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4
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
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  componentDidUpdate() {
    //console.log(this.state.movies);
  }

  render() {
    const pCount = this.state.movies.length;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    const movies = paginate(allMovies, currentPage, pageSize);

    if (pCount <= 0) return <p>There are no movies in the databases</p>;
    return (
      <React.Fragment>
        <p>Showing {pCount} movies in the databases</p>
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
            {movies.map(movie => (
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
        <Pagination
          itemsCount={pCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movie;
