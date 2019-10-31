import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common-comp/like";
import Pagination from "./common-comp/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common-comp/listGroup";
import { getGenres } from "../services/fakeGenreService";

class Movie extends Component {
  state = {
    movies: [],
    genre: [],
    currentPage: 1,
    pageSize: 4
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: 0 }, ...getGenres()];
    this.setState({ movies: getMovies(), genre: genres });
  }

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

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    // const pCount = this.state.movies.length;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies
    } = this.state;

    const filteredMovie =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filteredMovie, currentPage, pageSize);

    if (filteredMovie.length <= 0)
      return <p>There are no movies in the databases</p>;
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genre}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filteredMovie.length} movies in the databases</p>
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
            itemsCount={filteredMovie.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movie;
