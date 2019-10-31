import React from "react";
import Like from "./common-comp/like";

const MoviesTable = props => {
  const { movies, onLike, onDelete } = props;

  return (
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
};

export default MoviesTable;
