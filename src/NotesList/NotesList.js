import React from "react";
import Note from "../Note/Note";
import "./NotesList.css";
import NotesContext from "../NotesContext";
import { Link } from 'react-router-dom'

class NotesList extends React.Component {
  static contextType = NotesContext;

  render() {
    const noteList = this.context.folderId
      ? this.context.notes.filter(
          note => note.folder_id === this.context.folderId
        )
      : this.context.notes

    const notes = () => {
      if(noteList.length > 0) {
        return noteList.map((note, i) => {
            return (
              <Note name={note.note_name} title={note.note_name} modified={note.modified} id={note.id} key={i} />
            )
        })
      } else {
        return (
          <h1>No notes!</h1>
        )
      }
    }

    return (
      <div className="notes-container">
        {notes()}
        <Link to='/addNote'>
        <button className="add-note-button" type="button">
          Add a note
        </button>
        </Link>
      </div>
    );
  }
}

export default NotesList;