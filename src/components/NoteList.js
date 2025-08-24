import React from 'react';
import NoteItem from './NoteItem';

class NoteList extends React.Component {
  render() {
    if (this.props.notes.length === 0) {
      return <p>нотаток немає</p>;
    }

    return (
      <div>
        <h3>список нотаток ({this.props.notes.length})</h3>
        {this.props.notes.map(note => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={this.props.onDeleteNote}
            onEdit={this.props.onEditNote}
          />
        ))}
      </div>
    );
  }
}
export default NoteList;