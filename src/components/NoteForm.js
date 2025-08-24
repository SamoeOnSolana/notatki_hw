import React from 'react';

class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      tags: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.title.trim() && this.state.description.trim()) {
      const tags = this.state.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      this.props.onAddNote({
        title: this.state.title,
        description: this.state.description,
        tags: tags
      });
      this.setState({ title: '', description: '', tags: '' });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h3>ддати нотатку</h3>
        <div style={{ marginBottom: '10px' }}>
          <label>назва: </label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            style={{ width: '100%', padding: '5px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>опис: </label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            style={{ width: '100%', padding: '5px', height: '80px' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>теги (через кому): </label>
          <input
            type="text"
            name="tags"
            value={this.state.tags}
            onChange={this.handleChange}
            style={{ width: '100%', padding: '5px' }}
            placeholder="важливо, робота, особисте"
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px' }}>
          додати
        </button>
      </form>
    );
  }
}

export default NoteForm;