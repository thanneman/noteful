import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import NotesContext from './NotesContext';
import PropTypes from 'prop-types';
import './Nav.css';

class Nav extends Component {
    static contextType = NotesContext;

    render() {
        const noteId = this.props.match.params.noteId;
        let selectedNote = this.context.notes.filter((note) => {
            return note.id === noteId
        })
        const folderId = this.props.match.params.folderId;

        return (
            (selectedNote[0] === undefined)
            ?   <nav className="nav">
                    <ul className="folderList">
                        {this.context.folders.map(folder =>
                            (folderId === folder.id)
                            ?   <li className="selectedFolder" key={folder.id}>
                                    <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
                                </li>
                            :   <li className="folder" key={folder.id}>
                                    <Link to={`/folder/${folder.id}`}>{folder.name}</Link>
                                </li>
                        )}
                    </ul>
                    <Link to={'/add-folder'} className="addFolder-btn">
                        Add Folder
                    </Link>
                </nav>

            :   <nav className="nav">
                    <ul className="folderList">
                        {selectedNote.map(note =>
                            <li className="folder" key={note.folderId}>
                                {this.context.folders.find(folder => folder.id === selectedNote[0].folderId).name}
                            </li>
                        )}
                    </ul>
                    <button type="button" name="backButton" id="backButton" onClick={() => {this.props.history.push('/')}}>Back</button>
                </nav>
        )
    }
}

Nav.defaultProps = {
    noteId: '1',
    folderId: '1',
}

Nav.propTypes = {
    noteId: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
}

NotesContext.Consumer.propTypes = {
    value: PropTypes.object,
}

export default withRouter(Nav);