import React, { Component } from "react";
import './AddFolder.css'
import NotesContext from '../NotesContext'

class AddFolder extends Component {

  static contextType = NotesContext;


  handleSubmit = (e) => {
    e.preventDefault()
    this.context.addFolder(e.target.folderName.value, e.target.id.value)
    this.props.history.push('/')
  }

  render() {
    return (
     <div className='form-container'>
      <button className='back-button' onClick={() => this.props.history.push('/')} >
        Go Back
      </button>
      <form className="add-folder" onSubmit={ e => this.handleSubmit(e)} >
        <h2>Add a folder</h2>
        <div className="form-group">
          <label htmlFor="folderName"> New Folder Name: </label>
          <br />
          <input type="text" name="folderName" id="name" required/>
        </div>  
              
          <button 
            className='submit-button' 
            type="submit"           
            >
            Save
          </button>
      </form>
   </div>
    );
  }
}

export default AddFolder;