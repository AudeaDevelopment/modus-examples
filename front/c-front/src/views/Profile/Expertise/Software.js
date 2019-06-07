import React, { Component } from 'react';
import styled from 'styled-components';

import { Button } from '../../../common-styles';

import { CurrentWrapper } from './styles';

import {
  TextButton,
  StyledInputWrapper,
  StyledTextArea,
  Title,
  Form,
  FormRow,
  RowLabel,
  FormButtonBox,
  FormButton,
} from '../styles';

export const EditButton = styled(TextButton)`
  position: absolute;
  width: 4em;
  height: 2em;
  top: 2.5em;
  right: 2em;
`;

const List = styled.div`

`;

const ListItem = styled.div`
  padding: 3em;
  border-bottom: 2px solid #888;
  position: relative;
`;

const Experience = styled.div`
  font-size: 1.8em;
  color: #888;
  margin-bottom: 1.8em;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  margin-right: 1.5em;
  font-size: 1.5em;
  color: #BBB;
`;

const AddButtonBox = styled.div`
  padding: 3em;
  border-bottom: 2px solid #888;
`;

const AddButton = styled(Button).attrs(() => ({
  text: '+ Add New',
  fontSize: '1.2',
  width: '10',
  height: '3',
  background: '#666',
}))``;

const Stars = styled.div`
  display: flex;
  align-items: center;
`;

// placeholder
const Star = styled.div`
  height: 2em;
  width: 2em;
  margin-right: .4em;
  box-sizing: border-box;
  border: 1px solid blue;
  background: ${({ isActive }) => (isActive ? 'blue' : '#FFF')};
  cursor: pointer;
`;

// TODO: move methods from Profile/index into this component

export default class Software extends Component {
  state = {
    id: null,
    title: '',
    tags: '',
    experience: '',
    rating: 0,
  };

  handleInputChange = (name, value) => (
    this.setState({ [name]: value })
  );

  handleStarClick = rating => (
    this.setState({ rating })
  );

  handleSaveClick = () => {
    const {
      props: {
        isEditingSoftware,
        handleSoftwareSaveAddClick,
        handleSoftwareSaveEditClick,
      },
      state,
    } = this;

    if (isEditingSoftware) {
      return handleSoftwareSaveEditClick(state);
    }
    return handleSoftwareSaveAddClick(state);
  };

  handleEditClick = (content) => {
    const { handleSoftwareEditClick } = this.props;
    this.setState({ ...content });
    handleSoftwareEditClick();
  };

  handleCancelClick = () => {
    const { handleSoftwareCancelClick } = this.props;
    this.setState({
      id: null,
      title: '',
      tags: '',
      experience: '',
      rating: 0,
    });
    handleSoftwareCancelClick();
  };

  renderStars = () => {
    const {
      state: { rating },
      handleStarClick,
    } = this;

    const stars = [...Array(10).keys()];

    return (
      <Stars>
        {stars.map((_, index) => (
          <Star
            onClick={() => handleStarClick(index + 1)}
            isActive={(index + 1) <= rating}
            key={`star-key-${index}`}
          />
        ))}
      </Stars>
    );
  };

  renderForm = () => {
    const {
      state: {
        title,
        tags,
        experience,
      },
      handleInputChange,
      renderStars,
    } = this;

    return (
      <Form>
        <FormRow>
          <RowLabel text="Title" />
          <StyledInputWrapper>
            <input
              value={title}
              onChange={({ target: { value } }) =>
                handleInputChange('title', value)
              }
            />
          </StyledInputWrapper>
        </FormRow>
        <FormRow>
          <RowLabel text="Related tags" />
          <StyledInputWrapper>
            <input
              value={tags}
              onChange={({ target: { value } }) =>
                handleInputChange('tags', value)
              }
            />
          </StyledInputWrapper>
        </FormRow>
        <FormRow>
          <RowLabel text="Experience with this topic" />
          <StyledTextArea
            value={experience}
            onChange={({ target: { value } }) =>
              handleInputChange('experience', value)
            }
          />
        </FormRow>
        <FormRow>
          <RowLabel text="Self-rating (private)" />
          {renderStars()}
        </FormRow>
      </Form>
    );
  };

  maybeRenderEditButton = (content) => {
    const {
      props: { isOwner },
      handleEditClick,
    } = this;

    if (isOwner) {
      return (
        <EditButton
          onClick={() => handleEditClick(content)}
          text="Edit"
        />
      );
    }
    return null;
  };

  renderText = () => {
    const {
      props: { content },
      maybeRenderEditButton,
    } = this;

    return (
      <List>
        {content.map(({
          id, title, experience, tags,
        }) => (
          <ListItem key={id}>
            {maybeRenderEditButton({ id, title, experience, tags })}
            <Title>{title}</Title>
            <Experience>{experience}</Experience>
            <Tags>
              {tags.map((tag, index) => (
                <Tag key={`tag-key-${index}`}>{tag}</Tag>
              ))}
            </Tags>
          </ListItem>
        ))}
      </List>
    );
  };

  renderButtons = () => {
    const {
      props: {
        isOwner,
        isEditingSoftware,
        isCreatingSoftware,
        handleSoftwareAddNewClick,
      },
      handleCancelClick,
      handleSaveClick,
    } = this;

    if (!isOwner) return null;
    if (isEditingSoftware || isCreatingSoftware) {
      return (
        <FormButtonBox>
          <FormButton
            background="#DDD"
            text={isEditingSoftware ? 'Update' : 'Add'}
            onClick={handleSaveClick}
          />
          <FormButton
            text="Cancel"
            onClick={handleCancelClick}
          />
        </FormButtonBox>
      );
    }
    return (
      <AddButtonBox>
        <AddButton onClick={handleSoftwareAddNewClick} />
      </AddButtonBox>
    );
  };

  render() {
    const {
      props: {
        isEditingSoftware,
        isCreatingSoftware,
      },
      renderForm,
      renderText,
      renderButtons,
    } = this;

    return (
      <CurrentWrapper>
        {(isEditingSoftware || isCreatingSoftware) ? (
          renderForm()
        ) : (
          renderText()
        )}
        {renderButtons()}
      </CurrentWrapper>
    );
  }
}
