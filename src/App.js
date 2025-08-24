import React from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import TagFilter from './components/TagFilter';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      selectedTags: []
    };
  }

  addNote = (note) => {
    this.setState(prevState => ({
      notes: [...prevState.notes, { ...note, id: Date.now() }]
    }));
  }

  deleteNote = (id) => {
    this.setState(prevState => ({
      notes: prevState.notes.filter(note => note.id !== id)
    }));
  }

  editNote = (id, updatedNote) => {
    this.setState(prevState => ({
      notes: prevState.notes.map(note => 
        note.id === id ? { ...note, ...updatedNote } : note
      )
    }));
  }

  filterByTags = (tags) => {
    this.setState({ selectedTags: tags });
  }

  getFilteredNotes = () => {
    if (this.state.selectedTags.length === 0) {
      return this.state.notes;
    }
    return this.state.notes.filter(note => 
      this.state.selectedTags.some(tag => note.tags.includes(tag))
    );
  }

  render() {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1>Список нотаток</h1>
        <NoteForm onAddNote={this.addNote} />
        <TagFilter 
          notes={this.state.notes} 
          onFilterChange={this.filterByTags}
          selectedTags={this.state.selectedTags}
        />
        <NoteList 
          notes={this.getFilteredNotes()}
          onDeleteNote={this.deleteNote}
          onEditNote={this.editNote}
        />
      </div>
    );
  }
}

export default App;
