import React, { Component } from "react";

class MoviesDetails extends Component {
  // state = {  }
  reDirect = () => {
    this.props.history.push("/");
  };
  render() {
    const { id } = this.props.match.params;

    return (
      <div>
        {" "}
        <h1>Movie {id}</h1>{" "}
        <button className="btn btn-primary" onClick={this.reDirect}>
          Save
        </button>
      </div>
    );
  }
}

export default MoviesDetails;
