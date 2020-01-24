import React from "react";
import { Link } from "react-router-dom";
//import "./Folder.css";
import NotesContext from "../NotesContext";

class Folder extends React.Component {
  static contextType = NotesContext;

  render() {
    return (
      <div className="folder">
        <h4
          className="folder-name"
          onClick={() => this.context.updateFolderId(this.props.folderId)}
        >
          <Link
            style={{ textDecoration: "none" }}
            to={`/folder/${this.props.folderId}`}
          >
            {this.props.name}
          </Link>
        </h4>
      </div>
    );
  }
}

export default Folder;