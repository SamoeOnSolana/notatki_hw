import React from 'react';

class NoteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      title: props.note.title,
      description: props.note.description,
      tags: props.note.tags.join(', ')
    };
  }

  handleEdit = () => {
    this.setState({ isEditing: true });
  }

  handleSave = () => {
    const tags = this.state.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    this.props.onEdit(this.props.note.id, {
      title: this.state.title,
      description: this.state.description,
      tags: tags
    });
    this.setState({ isEditing: false });
  }

  handleCancel = () => {
    this.setState({
      isEditing: false,
      title: this.props.note.title,
      description: this.props.note.description,
      tags: this.props.note.tags.join(', ')
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div style={{ border: '1px solid #ddd', margin: '10px 0', padding: '15px', borderRadius: '5px' }}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <textarea
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
              style={{ width: '100%', padding: '5px', height: '60px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              name="tags"
              value={this.state.tags}
              onChange={this.handleChange}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
          <button onClick={this.handleSave} style={{ marginRight: '10px', padding: '5px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px' }}>
            Зберегти
          </button>
          <button onClick={this.handleCancel} style={{ padding: '5px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px' }}>
            Скасувати
          </button>
        </div>
      );
    }

    return (
      <div style={{ border: '1px solid #ddd', margin: '10px 0', padding: '15px', borderRadius: '5px' }}>
        <h4>{this.props.note.title}</h4>
        <p>{this.props.note.description}</p>
        <div style={{ marginBottom: '10px' }}>
          {this.props.note.tags.map((tag, index) => (
            <span key={index} style={{ backgroundColor: '#e9ecef', padding: '2px 8px', marginRight: '5px', borderRadius: '10px', fontSize: '12px' }}>
              {tag}
            </span>
          ))}
        </div>
        <button onClick={this.handleEdit} style={{ marginRight: '10px', padding: '5px 15px', backgroundColor: '#ffc107', color: 'black', border: 'none', borderRadius: '3px' }}>
          Редагувати
        </button>
        <button onClick={() => this.props.onDelete(this.props.note.id)} style={{ padding: '5px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}>
          Видалити
        </button>
      </div>
    );
  }
}

export default NoteItem;
