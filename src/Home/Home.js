import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import NotesList from '../NotesList/NotesList';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

class Home extends React.Component {

    render() {
        return (
            <main className="main-container">
                <ErrorBoundary message="Could not find the folders list. Please make a folder.">
                    <Sidebar />
                </ErrorBoundary>
                <ErrorBoundary message="Could not find the notes list. Please make a note.">
                    <NotesList />
                </ErrorBoundary>
            </main>
        )
    }
}

export default Home;