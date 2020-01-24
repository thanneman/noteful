import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import './NoteDetail.css';
import NotesContext from '../NotesContext'

class NoteDetail extends React.Component {
    static contextType = NotesContext;
    render() {
        const note = this.context.notes.find(note => note.id === parseInt(this.props.match.params.noteId))
        const folders = this.context.folders.find(folder => folder.id === note.folder_id)
        return (
            <div className="note-detail-container">
                <div className="left-sidebar">
                    <Link to="/">
                        <button 
                            type="button" 
                            className="go-back-button" 
                            onClick={this.props.goBack}
                        >
                            Go Back
                        </button>
                    </Link>
                    <h2>Folder: {folders.folder_name}</h2>
                </div>
                <div className="note-details">
                    <Note 
                        id={this.props.match.params.noteId} 
                        name={note.note_name} 
                        modified={note.modified}
                        content={note.content} 
                    />
                </div>
            </div>
        )
         
    }
}

export default NoteDetail;