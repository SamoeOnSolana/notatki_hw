import React from 'react';

class TagFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableTags: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notes !== this.props.notes) {
      const allTags = new Set();
      this.props.notes.forEach(note => {
        note.tags.forEach(tag => allTags.add(tag));
      });
      this.setState({ availableTags: Array.from(allTags) });
    }
  }

  handleTagToggle = (tag) => {
    const newSelectedTags = this.props.selectedTags.includes(tag)
      ? this.props.selectedTags.filter(t => t !== tag)
      : [...this.props.selectedTags, tag];
    this.props.onFilterChange(newSelectedTags);
  }

  clearFilters = () => {
    this.props.onFilterChange([]);
  }

  render() {
    if (this.state.availableTags.length === 0) {
      return null;
    }

    return (
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h4>фільтр за тегами</h4>
        <div style={{ marginBottom: '10px' }}>
          {this.state.availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => this.handleTagToggle(tag)}
              style={{
                margin: '2px',
                padding: '5px 10px',
                backgroundColor: this.props.selectedTags.includes(tag) ? '#007bff' : '#e9ecef',
                color: this.props.selectedTags.includes(tag) ? 'white' : 'black',
                border: 'none',
                borderRadius: '15px',
                cursor: 'pointer'
              }}
            >
              {tag}
            </button>
          ))}
        </div>
        {this.props.selectedTags.length > 0 && (
          <button onClick={this.clearFilters} style={{ padding: '5px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '3px' }}>
            Очистити фільтри
          </button>
        )}
        {this.props.selectedTags.length > 0 && (
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            Показано нотатки з тегами: {this.props.selectedTags.join(', ')}
          </p>
        )}
      </div>
    );
  }
}

export default TagFilter;
