import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';
import NoteArea from './NoteArea';
import Note from './Note';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import NotesContext from './NotesContext';
import FolderError from './FolderError';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [
      ],
      notes: [
      ]
    };
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter (note => note.id !== noteId)
    let deleteUrl = `http://localhost:9090/notes/${noteId}`;

    fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'applicaion/json'
      },
    })
    .then(res => {
      if(!res.ok) {
        throw new Error(res.status)
      }
      return res.json()
    })
    .catch(error => this.setState({ error }))

    this.setState({
      notes: newNotes
    })
  }

  componentDidMount() {
    let foldersUrl = 'http://localhost:9090/folders';
    let notesUrl = 'http://localhost:9090/notes';

    Promise.all([
      fetch(foldersUrl),
      fetch(notesUrl)
    ])
    .then(([foldersRes, notesRes]) => {
      if (!foldersRes.ok)
        return foldersRes.json().then(e => Promise.reject(e));
      if (!notesRes.ok) 
        return notesRes.json().then(e => Promise.reject(e));

      return Promise.all([foldersRes.json(), notesRes.json()]);
    })
    .then(([folders, notes]) => {
      this.setState({folders, notes});
    })
    .catch(error => {
      console.log({error});
    })
  }

  updateLists = () => {
    let foldersUrl = 'http://localhost:9090/folders';
    let notesUrl = 'http://localhost:9090/notes';

    Promise.all([
      fetch(foldersUrl),
      fetch(notesUrl)
    ])
    .then(([foldersRes, notesRes]) => {
      if (!foldersRes.ok)
        return foldersRes.json().then(e => Promise.reject(e));
      if (!notesRes.ok) 
        return notesRes.json().then(e => Promise.reject(e));

      return Promise.all([foldersRes.json(), notesRes.json()]);
    })
    .then(([folders, notes]) => {
      this.setState({folders, notes});
    })
    .catch(error => {
      console.log({error});
    })
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      updateLists: this.updateLists,
    }

    return (
      <NotesContext.Provider value={contextValue}>
        <div className='App'>
          <Header />
            <main>
              <FolderError>
              <Route 
                exact path='/'
                component={Nav}
              />
              <Route 
                exact path='/'
                component={NoteArea}
              />
              <Route 
                path='/folder/:folderId'
                component={Nav}
              />
              <Route
                path='/folder/:folderId'
                component={NoteArea}
              >  
              </Route>
              <Route 
                path='/note/:noteId'
                component={Nav}
              />
              <Route 
                path='/note/:noteId'
                component={Note}
              />
              <Route
                path='/add-folder'
                component={Nav}
              />
              <Route
                path='/add-folder'
                component={AddFolder}
              />
              <Route
                path='/add-note'
                component={Nav}
              />
              <Route
                path='/add-note'
                component={AddNote}
              />
              </FolderError>
            </main>
        </div>
      </NotesContext.Provider>
    );
  }
}

NotesContext.Provider.propTypes = {
  value: PropTypes.object,
}

export default App;