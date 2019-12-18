import React, { Component } from 'react';
import NotesContext from './NotesContext';
import ValidationError from './ValidationError';
import PropTypes from 'prop-types';

class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foldername: {
                value: '',
                touched: false,
            },
        }
    }

    static contextType = NotesContext;

    handleSubmit = (e) => {
        e.preventDefault();
        let uniqueId = Math.floor((Math.random() * 9999999) * (Math.random() * 9999999) * (Math.random() * 9999999))
        const folder = {
            id: uniqueId.toString(),
            name: this.state.foldername.value,
        }
        fetch(`http://localhost:9090/folders/`, {
            method: 'POST',
            body: JSON.stringify(folder),
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
            this.setState({foldername: {value: '', touched: false}});
            this.context.updateLists();
            this.props.history.push('/');
        })
        .catch(error => {
            alert(error.toString());
        })
    }

    updateName(name) {
        this.setState({foldername: {value: name, touched: true}});
    }

    validateFolderName(fieldValue) {
        const name = this.state.foldername.value.trim();
        if(name.length === 0) {
            return 'Please provide a folder name';
        }
    }

    render() {

        return (
            <section className="Add-Folder">
                <h3 className="Add-FolderHeading">Add a Folder</h3>

                <form
                    className="Add-FolderForm"
                    onSubmit={this.handleSubmit}
                >
                    <div className="Add-FolderInput">
                        <label htmlFor="folderName">
                            * Folder Name
                        </label>
                        <input
                            type="text"
                            name="folderName"
                            id="folderName"
                            required
                            value={this.state.foldername.value}
                            onChange={e => this.updateName(e.target.value)}
                        />
                        {this.state.foldername.touched && (
                            <ValidationError message={this.validateFolderName()} />
                        )}
                    </div>
                    <div className="Add-FolderButtons">
                            <button
                                type="submit"
                                name="saveAddFolder"
                                id="saveAddFolder"
                                onClick={(e) => {this.handleSubmit(e)}}
                                disabled={this.validateFolderName()}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                name="cancelAddFolder"
                                id="cancelAddFolder"
                                onClick={() => {this.props.history.push('//')}}
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

export default AddFolder;