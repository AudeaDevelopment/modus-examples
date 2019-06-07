import React, { Component } from 'react';
import styled from 'styled-components';

// placeholder
const searchTags = [
  'javaScript',
  'Java',
  'python',
  'react',
  'nodeJS',
  'C++',
  'Rust',
  'MATLAB',
  'styled-components',
  'Vue',
  'Sketch',
  'Wireframing',
  'Design',
];

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 2px solid #888;
  box-sizing: border-box;
  padding: 1em 1em 1em 0;
  background: #FFF;
  display: flex;
  position: relative;
`;

const Tags = styled.div`
  display: flex;
`;

const Tag = styled.div`
  border: 2px solid #888;
  box-sizing: border-box;
  background: #DDD;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding-left: 1em;
  margin-left: 1em;
`;

const TagContent = styled.div`
  font-size: 1.8em;
`;

const TagDeleteButton = styled.div`
  padding: 1em 1em;
  font-size: 1.8em;
  cursor: pointer;
  &:after {
    content: 'x';
  }
`;

const Input = styled.input`
  margin-left: 1em;
  border: none;
  outline: none;
  height: 100%;
  flex-grow: 1;
  font-size: 2.2em;
  color: #888;
`;

const SearchButton = styled.div`
  height: 100%;
  width: 4em;
  background: #DDD;
  border-radius: 4px;
  border: 2px solid #888;
  box-sizing: border-box;
  cursor: pointer;
`;

const Suggestions = styled.div`
  position: absolute;
  width: calc(100% + 4px);
  border: 2px solid #888;
  border-bottom: none;
  top: 100%;
  box-sizing: border-box;
  left: -2px;
  z-index: 1;
  background: #FFF;
`;

const Title = styled.div`
  border-bottom: 2px solid #888;
  background: #DDD;
  font-size: 2em;
  padding: .6em .5em;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div`
  font-size: 2em;
  padding: .6em .5em;
  cursor: pointer;
  border-bottom: 2px solid #888;
  &:hover {
    background: #DDD;
  }
`;

export default class SearchInput extends Component {
  inputRef = React.createRef();

  state = {
    tags: [],
    inputValue: '',
    suggestions: [],
  };

  handleSubmit = () => {
    const {
      state: { tags, inputValue },
      props: { onSearch },
    } = this;

    onSearch(tags, inputValue);
    this.setState({ inputValue: '', suggestions: [] }); // may want to handle this differently
  };

  handleInputChange = ({ target: { value: inputValue } }) => {
    const suggestions = inputValue ? searchTags.reduce((acc, tag) => {
      if (
        tag.toLowerCase().includes(inputValue.toLowerCase())
        && !this.state.tags.map(v => v.toLowerCase()).includes(tag.toLowerCase())
      ) {
        return acc.concat(tag);
      }
      return acc;
    }, []) : [];
    this.setState({ inputValue, suggestions });
  };

  handleTagDelete = value => {
    const tags = this.state.tags.filter(tag => tag !== value);
    this.setState({ tags });
    this.inputRef.current.focus();
  };

  handleSuggestionClick = suggestion => {
    const tags = this.state.tags.concat(suggestion);
    const suggestions = this.state.suggestions.filter(value => value !== suggestion);
    this.setState({ tags, suggestions });
    this.inputRef.current.focus();
  };

  renderTags = () => {
    const {
      state: { tags },
      handleTagDelete,
    } = this;

    return (
      <Tags>
        {tags.map(tag => (
          <Tag key={tag}>
            <TagContent>{tag}</TagContent>
            <TagDeleteButton onClick={() => handleTagDelete(tag)} />
          </Tag>
        ))}
      </Tags>
    );
  };

  maybeRenderSuggestions = () => {
    const {
      state: { suggestions },
      handleSuggestionClick,
    } = this;

    if (suggestions.length) {
      return (
        <Suggestions>
          <Title>Search Suggestions:</Title>
          <List>
            {suggestions.map(suggestion => (
              <ListItem
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </ListItem>
            ))}
          </List>
        </Suggestions>
      );
    }
    return null;
  };

  render() {
    const {
      state: { inputValue },
      props: { placeholder },
      handleInputChange,
      handleSubmit,
      renderTags,
      maybeRenderSuggestions,
    } = this;

    return (
      <Wrapper>
        {renderTags()}
        <Input
          placeholder={placeholder}
          autoFocus
          ref={this.inputRef}
          value={inputValue}
          onChange={handleInputChange}
        />
        <SearchButton onClick={handleSubmit} />
        {maybeRenderSuggestions()}
      </Wrapper>
    );
  }
}
