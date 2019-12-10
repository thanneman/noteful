import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import dummyStore from '../dummy-store';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    setTimeout(() => this.setState(dummyStore), 600);
  }

  renderNavRoutes() {
    const {notes, folders} = this.state;
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <NoteListNav
                folders={folders}
                notes={notes}
                {...routeProps}
              />
            )}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
            const {noteId} = route.Props.match.params;
            const note = findNote(notes, noteId) || {};
            const folder = findFolder(folders, note.folderId);
            return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        <Route
          exact
          path={}
          component={}
        />
        <Route
          path="/note/:noteId"
          component={}
        />
      </>
    );
  }

  render() {
    return (
      <div className='App'>
        <nav className="App-nav">{this.renderNavRoutes()}</nav>
        <header className="App-header">
          <h1>
            <Link to="/">Noteful</Link>
          </h1>
        </header>
        <main className="App-main">{this.renderMainRoutes()}</main>
      </div>
    );
  }
}

export default App;