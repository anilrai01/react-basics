import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common-comp/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common-comp/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MovieTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";

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

  getPagedData = () => {
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

    return { totalCount: sorted.length, data: movies };
  };

  render() {
    // const pCount = this.state.movies.length;
    const { pageSize, currentPage } = this.state;
    const { totalCount, data: movies } = this.getPagedData();

    if (totalCount <= 0) return <p>There are no movies in the databases</p>;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genre}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <Link to="/movies/new">
              <button className="btn btn-primary mb-3 mt-2">New Movie</button>
            </Link>
            <p>Showing {totalCount} movies in the databases</p>
            <MovieTable
              movies={movies}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              sortColumn={this.state.sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movie;
