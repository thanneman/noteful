import React from "react";
import {Link} from 'react-router-dom'
import Folder from "../Folder/Folder";
//import "./Sidebar.css";
import NotesContext from "../NotesContext";

class Sidebar extends React.Component {
  static contextType = NotesContext;

  render() {
    const folders = this.context.folders.map((folder, i) => {
      return (
        <Folder
          name={folder.folder_name}
          key={i}
          folderId={folder.id}
        />
      );
    });

    return (
      <div className="folders-list">
        {folders}
        <Link to='/addFolder'>
          <button 
            onClick={() => this.setState({ folderId: null })}
            className="add-folder-button" 
            type="button"
            >
            Add a folder
          </button>
        </Link>
      </div>
    );
  }
}

export default Sidebar;