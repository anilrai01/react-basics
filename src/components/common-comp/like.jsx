import React, { Component } from "react";

class Like extends Component {
  render() {
    let iconClass = "fa fa-heart";
    if (!this.props.liked) iconClass += "-o";
    return (
      <i
        className={iconClass}
        aria-hidden="true"
        onClick={this.props.onLikeToggle}
        style={{
          cursor: "pointer"
        }}
      ></i>
    );
  }
}

export default Like;
