import React from 'react'

const NotesContext = React.createContext({
    folders: [],
    notes: [],
    addFolder: () => {},
    deleteFolder: () => {},
    updateFolder: () => {},
    addNote: () => {},
    deleteNote: () => {},
    updateNote: () => {},
})

export default NotesContext