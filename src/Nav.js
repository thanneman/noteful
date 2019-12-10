import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import './Nav.css'

class Nav extends Component {
    render() {
        const noteId = this.props.match.params.noteId;
        let selectedNote = this.props.notes.filter((note) => {
            return note.id === noteId
        })
        const folderId = this.props.match.params.folderId;

        return (
            (selectedNote[0] === undefined)
            ?   <nav className="nav">
                    <ul className="folderList">
                        {this.props.folders.map(folder =>
                            (folderId === folder.id)
                            ?   <li className="selectedFolder" key={folder.id}>
                                    <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
                                </li>
                            :   <li className="folder" key={folder.id}>
                                    <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
                                </li>
                        )}
                    </ul>
                    <button name="addFolder" id="addFolder">Add Folder</button>
                </nav>

            :   <nav className="nav">
                    <ul className="folderList">
                        {selectedNote.map(note =>
                            <li className="folder" key={note.folderId}>
                                {this.props.folders.find(folder => folder.id === selectedNote[0].folderId).name}
                            </li>
                        )}
                    </ul>
                    <button type="button" name="backButton" id="backButton" onClick={() => {this.props.history.push('/')}}>Back</button>
                </nav>
        )
    }
}

export default withRouter(Nav);