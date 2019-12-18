import React, { Component } from 'react';
import NotesContext from './NotesContext';
import ValidationError from './ValidationError';
import PropTypes from 'prop-types';

export default class AddNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notename: {
                value: '',
                touched: false,
            },
            notetext: {
                value: '',
                touched: false,
            },
            foldername: {
                value:  '',
                optionid: '',
            },
        }
    }

    static contextType = NotesContext;

    handleSubmit = (e) => {
        e.preventDefault();
        let uniqueId = Math.floor((Math.random() * 9999999) * (Math.random() * 9999999) * (Math.random() * 9999999))
        let currentDate = new Date();
        let datetime = "Last modified: " + currentDate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

        const note = {
            id: uniqueId.toString(),
            name: this.state.notename.value,
            modified: datetime,
            folderId: this.state.foldername.optionid,
            context: this.state.notetext.value,
        }

        fetch(`http://localhost:9090/notes/`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json',
            }
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(error => {
                    throw error
                })
            }
            return res.json()
        })
        .then(data => {
            this.setState({
                notename: {value: '', touched: false},
                notetext: {value: '', touched: false},
            });
            this.props.history.push('/')
            this.context.updateLists()
        })
        .catch(error => {
            alert(error.toString());
        })
    }

    updateName(name) {
        this.setState({notename: {value: name, touched: true}});
    }

    updateNoteText(text) {
        this.setState({notetext: {value: text, touched: true}});
    }

    updateFolder(e) {
        let index = e.target.selectedIndex;
        let optionElement = e.target.childNodes[index];
        let option = optionElement.getAttribute('id');
        this.setState({foldername: {value: e.target.value, optionid: option}});
    }

    validateNoteName(fieldValue) {
        const name = this.state.notename.value.trim();
        if(name.length === 0) {
            return 'Please enter a name';
        }
    }

    validateNoteText(fieldValue) {
        const text = this.state.notetext.value.trim();
        if(text.length === 0) {
            return 'Please enter a note';
        }
    }

    render() {
        const folderOptions = this.context.folders.map((folder, i) => {
            return (
                <option value={folder.name} key={folder.id} id={folder.id}>
                    {folder.name}
                </option>
            )
        })

        return (
            <section className="AddNote">
                <h3 className="AddNote-heading">Add a Note</h3>
                <form
                    className="AddNote-Form"
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <label htmlFor="NoteName">
                            * Note Title
                        </label>
                        <input
                            type="text"
                            name="NoteName"
                            id="NoteName"
                            placeholder="New Note"
                            required
                            onChange={e => this.updateName(e.target.value)}
                        />
                        {this.state.notename.touched && (
                            <ValidationError message={this.validateNoteName()} />
                        )}
                    </div>
                    
                    <div>
                        <label htmlFor="NoteText">
                            * Note Text
                        </label>
                        <textarea 
                            name="NoteText"
                            id="NoteText"
                            placeholder="Water plants at noon"
                            required
                            onChange={e => this.updateNoteText(e.target.value)}
                        />
                        {this.state.notetext.touched && (
                            <ValidationError message={this.validateNoteText()} />
                        )}
                    </div>

                    <div className="AddNote-Buttons">
                        <button
                            type="submit"
                            name="saveNote"
                            id="saveNote"
                            onClick={(e) => {this.handleSubmit(e)}}
                            disabled={
                                this.validateNoteName() ||
                                this.validateNoteText
                            }
                        >
                            Save Note
                        </button>
                        <button
                            type="button"
                            name="cancelNote"
                            id="cancelNote"
                            onClick={() => {this.props.history.push('/')}}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

NotesContext.propTypes = {
    value: PropTypes.object,
}