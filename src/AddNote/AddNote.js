import React, { Component } from 'react';
import NotesContext from '../NotesContext';

export default class AddNote extends Component {
    static contextType = NotesContext;

    handleSubmit = (e) => {
        e.preventDefault();

        /*let currentDate = new Date();
        let datetime = currentDate.getDate() + "/"
            + (currentDate.getMonth()+1)  + "/" 
            + currentDate.getFullYear() + " @ "  
            + currentDate.getHours() + ":"  
            + currentDate.getMinutes() + ":" 
            + currentDate.getSeconds();*/

        const newNote = {
            note_name: e.target.noteName.value,
            folder_id: e.target.folderId.value,
            content: e.target.noteContent.value
        }

        this.context.addNote(newNote)
        this.setState(newNote);
        this.props.history.push('/')
    }

    folderOptions = () =>
    this.context.folders.map((folder, i) => {
      return (
        <option value={folder.id} key={i}>
          {folder.folder_name}
        </option>
      )
    })

    render() {
        return (
            <div className="note-form-container">
                <button
                className="back-button"
                onClick={() => this.props.history.push('/')}
                >
                Go Back
                </button>
                <form className="add-note" onSubmit={e => this.handleSubmit(e)}>
                <h2>Make a Note</h2>
                <div className="form-group">
                    <label htmlFor="noteName"> New Note Name: </label>
                    <br />
                    <input type="text" name="noteName" id="noteName" required />
                    <textarea
                    className="note-textbox"
                    aria-label="note content"
                    placeholder="Make a Note"
                    name="noteContent"
                    id="noteContent"
                    />
                    <div>
                    <label>
                        Select a folder:{" "}
                        <select className="selectbox" name="folderId" id="folderId">
                        {this.folderOptions()}
                        </select>
                    </label>
                    </div>
                </div>
                    <button className="submit-button" type="submit">
                    Save
                    </button>
                </form>
            </div>
        )
    }
}