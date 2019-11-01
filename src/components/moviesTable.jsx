import React, { Component } from "react";
import Like from "./common-comp/like";
import TableHeader from "./common-comp/tableHeader";
import TableBody from "./common-comp/tableBody";
import "../moviesTable.css";

class MoviesTable extends Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like
          liked={movie.liked}
          onLikeToggle={() => this.props.onLike(movie)}
        />
      )
    },
    {
      key: "delete",
      content: movie => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            this.props.onDelete(movie._id);
          }}
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <table className="table table-striped ">
        <TableHeader
          column={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={movies} columns={this.columns} />
      </table>
    );
  }
}

export default MoviesTable;
