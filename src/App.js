import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  componentDidMount() {
    const stateString = localStorage.getItem("stateString");
    if (stateString) {
      const savedState = JSON.parse(stateString);
      this.setState(savedState);
    }
  }

  componentDidUpdate() {
    const stateString = JSON.stringify(this.state);
    localStorage.setItem("stateString", stateString);
  }

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };

    this.setState((state) => {
      const notes = [newNote, ...state.notes];
      return { notes: notes };
    });
  };

  removeNote = (noteID) => {
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteID);
    this.setState({ notes: updatedNotes });
  };

  onType = (noteID, updatedKey, updatedVal) => {
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== noteID) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedVal;
          return note;
        } else {
          note.description = updatedVal;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  onSearch = (text) => {
    const newSearchText = text.toLowerCase();

    const updatedNotes = this.state.notes.map((note) => {
      const noteTitle = note.title.toLowerCase();
      const noteDescription = note.description.toLowerCase();

      if (!newSearchText) {
        note.doesMatchSearch = true;
      } else if (
        noteTitle.includes(newSearchText) ||
        noteDescription.includes(newSearchText)
      ) {
        note.doesMatchSearch = true;
      } else {
        note.doesMatchSearch = false;
      }

      return note;
    });

    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };

  render() {
    return (
      <div className="App">
        <Header
          searchText={this.state.searchText}
          onSearch={this.onSearch}
          addNote={this.addNote}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          removeNote={this.removeNote}
        />
      </div>
    );
  }
}

export default App;
