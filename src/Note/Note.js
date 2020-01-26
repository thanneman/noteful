import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css';
import NotesContext from '../NotesContext'

class Note extends React.Component {
    static contextType = NotesContext;


    render() {
        const d = new Date(this.props.modified);
        const day = d.getDate();
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        
        return (
            <div className="note">
                <h2 className="note-title">
                    <Link to={`/note/${this.props.id}`} 
                        style={{ textDecoration: 'none' }}>
                        {this.props.name}
                    </Link>
                    </h2>
                <p className="modified-text">Date modified: {month} {day}, {year}</p>
                <p className="note-content">{this.props.content}</p>
                <Link to="/">
                    <button
                        onClick={ () => this.context.handleDelete(parseInt(this.props.id))}
                        className="delete-button">
                        Delete Note
                    </button>
                </Link>

            </div>
        )
    }
}

export default Note;