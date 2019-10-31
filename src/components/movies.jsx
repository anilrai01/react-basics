import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common-comp/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common-comp/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MovieTable from "./moviesTable";
import _ from "lodash";

class Movie extends Component {
  state = {
    movies: [],
    genre: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: 0 }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genre: genres,
      selectedGenre: genres[0]
    });
  }

  handleDelete = stateID => {
    // console.log(stateID);
    const newMovie = this.state.movies.filter(el => el._id !== stateID);
    this.setState({ movies: newMovie });
  };

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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    // const pCount = this.state.movies.length;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn
    } = this.state;

    const filteredMovie =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(
      filteredMovie,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    if (filteredMovie.length <= 0)
      return <p>There are no movies in the databases</p>;
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genre}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filteredMovie.length} movies in the databases</p>
          <MovieTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
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
