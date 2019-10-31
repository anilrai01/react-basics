import React, { Component } from "react";
import Like from "./common-comp/like";
import TableHeader from "./common-comp/tableHeader";
import "../moviesTable.css";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" }
  ];
  render() {
    const { movies, onLike, onDelete, onSort, sortColumn } = this.props;
    return (
      <table className="table table-striped ">
        <TableHeader
          column={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
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
                  onLikeToggle={() => onLike(movie)}
                />{" "}
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    onDelete(movie._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
