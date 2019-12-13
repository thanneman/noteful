import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NotesContext from './NotesContext'
import './Note.css';

export default class Note extends Component {
    static defaultProps = {
        onDeleteNote: () => {},
    }
    static contextType = NotesContext;

    handleClickDelete = e => {
        e.preventDefault()
        const noteId = this.props.id
    
        fetch(`http://localhost:9090/notes/${noteId}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
        })
        .then(res => {
        if (!res.ok)
            return res.json().then(e => Promise.reject(e))
        return res.json()
        })
        .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
        })
        .catch(error => {
        console.error({ error })
        })
    }

    render() {
        const noteId = this.props.match.params.noteId;
        let selectedNote = this.context.notes.filter((note) => {
            return note.id === noteId
        })

        return (
            <section className="noteArea">
                <ul className="noteList">
                    {selectedNote.map(note =>
                        <li className="note" key={note.id}>
                            <Link to={`/note/${note.id}`}>
                                <h2 className="noteTitle">{note.name}</h2>
                            </Link>
                            <p className="noteInfo">Last modified: {note.modified}</p>
                            <p className="noteText">{note.content}</p>
                            <button
                                name="deleteNote"
                                id="deleteNote"
                                onClick={this.handleClickDelete}
                            >
                                Delete Note
                            </button>
                        </li>
                    )}
                </ul>
            </section>
        )
    }
}