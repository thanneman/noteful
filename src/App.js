import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import Nav from './Nav'
import NoteArea from './NoteArea'
import Note from './Note'
import NotesContext from './NotesContext'
import './App.css'

class App extends Component {
  state = {
    folders: [],
    notes: []
  };

  componentDidMount() {
    Promise.all([
      fetch('http://localhost:9090/folders'),
      fetch('http://localhost:9090/notes')
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

  deleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
    }

    return (
      <NotesContext.Provider value={contextValue}>
        <div className='App'>
          <Header />
          <Switch>
            <main>
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
            </main>
          </Switch>
        </div>
      </NotesContext.Provider>
    );
  }
}

export default App;