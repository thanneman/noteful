import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NotesContext from './NotesContext'
import './NoteArea.css'

export default class NoteArea extends Component {
    static contextType = NotesContext;

    render() {
        const folderId = this.props.match.params.folderId;
        let filteredNotes = this.context.notes.filter((note) => {
            return note.folderId === folderId
        })

        return (
            (folderId === undefined)
            ?   <section className="noteArea">
                    <ul className="noteList">
                        {this.context.notes.map(note =>
                            <li className="note" key={note.id}>
                                <Link to={`/note/${note.id}`}>
                                    <h2 className="noteTitle">{note.name}</h2>
                                </Link>
                                <p className="noteInfo">Last modified: {note.modified}</p>
                                <button
                                    name="deleteNote"
                                    id="deleteNote"
                                    onClick={() => this.context.deleteNote(note.id)}
                                >
                                    Delete Note
                                </button>
                            </li>
                        )}
                    </ul>
                    <button name="addNote" id="addNote">Add Note</button>
                </section>

            :   <section className="noteArea">
                    <ul className="noteList">
                        {filteredNotes.map(note =>
                            <li className="note" key={note.id}>
                                <Link to={`/note/${note.id}`}>
                                    <h2 className="niteTitle">{note.name}</h2>
                                </Link>
                                <p className="noteInfo">Last modified: {note.modified}</p>
                                <button
                                    name="deleteNote"
                                    id="deleteNote"
                                    onClick={() => this.context.deleteNote(note.id)}
                                >
                                    Delete Note
                                </button>
                            </li>
                        )}
                    </ul>
                    <button name="addNote" id="addNote">Add Note</button>
                </section>
        )
    }
}