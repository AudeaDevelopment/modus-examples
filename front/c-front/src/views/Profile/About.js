import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import TimezonePicker, { timezones } from 'react-timezone';

import Dropdown from '../../components/Dropdown';

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
} from './styles';

const languageOptions = ['English', 'Russian', 'Spanish', 'Chinese'];

const TimezonePickerWrapper = styled.div`
  position: relative;
  width: 50em;
  div {
    z-index: 1;
    width: 100%;
    input {
      border: 2px solid #888;
      border-radius: 0;
      height: 2em;
      cursor: pointer;
      color: #888;
    }
    ul {
      border: 2px solid #888;
      border-top: 1px solid #888;
      border-radius: 0;
      li {
        color: #888;
      }
    }

  }
`;

const Wrapper = styled.div`
  width: 100em;
  max-width: 100%;
  margin: 6em auto;
  position: relative;
`;

export const EditButton = styled(TextButton)`
  position: absolute;
  width: 4em;
  height: 2em;
  top: 0;
  right: 2em;
`;

const ContentWrapper = styled.div`
  border: 2px solid #888;
  border-bottom: none;
`;

const MentorStats = styled.div`
  width: 100%;
  height: 8em;
  border-bottom: 2px solid #DDD;
  display: flex;
  justify-content: space-evenly;
`;

const StatCell = styled.div`
  height: 8em;
  width: 33.3%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:nth-child(2) {
    border-right: 2px solid #DDD;
    border-left: 2px solid #DDD;
  }
`;

const Stat = styled.div`
  font-size: 2.1em;
  margin: .4em 0;
`;

const StatLabel = styled.div`
  font-size: 1.5em;
  color: #BBB;
`;

const Bio = styled.div`
  margin: 0 3em;
  border-bottom: 2px solid #DDD;
  display: flex;
  align-items: center;
  padding: 2em 0;
`;

const BioText = styled.div`
  flex-grow: 1;
  font-size: 1.8em;
  color: #BBB;
  margin-right: 1em;
  ${({ bioToggled }) => bioToggled ? '' : `
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `}
`;

const BioButton = styled(TextButton)`
  color: #444;
  width: 4em;
  height: 2em;
`;

const DetailsList = styled.div`
  padding: 3em;
  border-bottom: 2px solid #888;
`;

const ListRow = styled.div`
  display: flex;
  align-items: center;
  margin: 1em;
`;

const CircleIcon = styled.div`
  border: 2px solid #BBB;
  height: 1.6em;
  width: 1.6em;
  border-radius: 50%;
`;

const Detail = styled.div`
  margin-left: 1em;
  font-size: 1.7em;
  color: #888;
`;

const DropdownWrapper = styled.div`
  width: 31em;
  height: 2em;
  font-size: 1.6em;
`;

const EmptyWrapper = styled.div`
  border: 2px solid #888;
  height: 20em;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptySpan = styled.span`
  display: flex;
  font-size: 1.8em;
`;

const EmptyText = styled.div`
  margin-left: .3em;
`;

const EmptyTextButton = styled.div`
  color: blue;
  cursor: pointer;
`;

export default class About extends Component {
  state = {
    bioToggled: false,
    language: '',
    isLoaded: false,
  };

  componentDidMount() {
    const {
      bio,
      timezone,
      city,
    } = this.props.profile;

    const timeZone = timezone ? timezone.name : '';
    const languages = this.props.profile.languages || [];

    this.setState({
      bio,
      timeZone,
      languages,
      city,
      isLoaded: true,
    });
  }

  handleInputChange = (name, value) => (
    this.setState({ [name]: value })
  );

  handleBioToggleClick = () => (
    this.setState({ bioToggled: !this.state.bioToggled })
  );

  handleCancelClick = () => {
    const { handleAboutCancelClick } = this.props;
    this.setState({
      bio: '',
      timeZone: '',
      languages: [],
      city: '',
    });
    handleAboutCancelClick();
  };

  handleUpdateClick = () => {
    const {
      state: { bio, timeZone, languages, city },
      props: { handleAboutUpdateClick },
    } = this;

    const timezone = timezones.find(({ name }) => name === timeZone);

    handleAboutUpdateClick(bio, timezone, languages, city);
  };

  handleLanguageSelect = (language) => {
    const { languages: oldLanguages } = this.state;
    const languages = oldLanguages.concat(language);
    this.setState({ languages });
  };

  handleTimeZoneSelect = timeZone => (
    this.setState({ timeZone })
  );

  maybeRenderEditButton = () => {
    const {
      isOwner,
      isEditingAbout,
      handleAboutEditClick,
      profile: { bio },
    } = this.props;

    if (isOwner && !isEditingAbout && bio) {
      return <EditButton onClick={handleAboutEditClick} text="Edit" />;
    }
  };

  renderForm = () => {
    const {
      state: {
        bio,
        timeZone,
        languages,
        city,
      },
      handleInputChange,
      handleLanguageSelect,
      handleTimeZoneSelect,
    } = this;

    return (
      <Form>
        <FormRow>
          <RowLabel>Bio</RowLabel>
          <StyledTextArea
            value={bio}
            onChange={({ target: { value } }) =>
              handleInputChange('bio', value)
            }
          />
        </FormRow>
        <FormRow>
          <RowLabel>Time zone</RowLabel>
          <TimezonePickerWrapper>
            <TimezonePicker
              onChange={handleTimeZoneSelect}
              value={timeZone}
              inputProps={{
                placeholder: 'Select Timezone...',
                name: 'timezone',
              }}
            />
          </TimezonePickerWrapper>
        </FormRow>
        <FormRow>
          <RowLabel>Languages</RowLabel>
          <DropdownWrapper>
            <Dropdown
              isLanguageSelect
              value={languages}
              onSelect={value => handleLanguageSelect(value)}
              options={languageOptions}
            />
          </DropdownWrapper>
        </FormRow>
        <FormRow>
          <RowLabel>City</RowLabel>
          <StyledInputWrapper>
            <input
              value={city}
              onChange={({ target: { value } }) =>
                handleInputChange('city', value)
              }
            />
          </StyledInputWrapper>
        </FormRow>
      </Form>
    );
  };

  maybeRenderMentorStats = () => {
    const {
      isMentor,
      recommendations,
      averageResponseTime,
      rate,
    } = this.props.profile;

    if (isMentor) {
      return (
        <MentorStats>
          <StatCell>
            <Stat>{recommendations}</Stat>
            <StatLabel>Recommendations</StatLabel>
          </StatCell>
          <StatCell>
            <Stat>{averageResponseTime}</Stat>
            <StatLabel>Average Response Time</StatLabel>
          </StatCell>
          <StatCell>
            <Stat>{`$${rate.toString()}.00`}</Stat>
            <StatLabel>For 15 minutes</StatLabel>
          </StatCell>
        </MentorStats>
      );
    }
    return null;
  };

  renderText = () => {
    const {
      state: { bioToggled },
      props: {
        profile: {
          bio,
          city,
          timezone: {
            label, name, offset,
          }
        }
      },
      maybeRenderMentorStats,
      handleBioToggleClick,
    } = this;

    const languages = this.props.profile.languages || [];
    const timezoneString = `${label} (${name}) (${offset}:00)`;

    return (
      <Fragment>
        {maybeRenderMentorStats()}
        <Bio>
          <BioText bioToggled={bioToggled}>{bio}</BioText>
          <BioButton
            fontSize="1.2"
            text={bioToggled ? 'Less' : 'More'} // TODO hide this button if the text is not overflowing
            onClick={handleBioToggleClick}
          />
        </Bio>
        <DetailsList>
          <ListRow>
            <CircleIcon />
            <Detail>{timezoneString}</Detail>
          </ListRow>
          <ListRow>
            <CircleIcon />
            <Detail>{languages.join(', ')}</Detail>
          </ListRow>
          <ListRow>
            <CircleIcon />
            <Detail>{city}</Detail>
          </ListRow>
        </DetailsList>
      </Fragment>
    );
  };

  maybeRenderButtons = () => {
    const {
      props: {
        isEditingAbout,
      },
      handleUpdateClick,
      handleCancelClick,
    } = this;
    if (isEditingAbout) {
      return (
        <FormButtonBox>
          <FormButton text="Update" onClick={handleUpdateClick} />
          <FormButton text="Cancel" onClick={handleCancelClick} />
        </FormButtonBox>
      );
    }
    return null;
  };

  renderEmpty = () => {
    const { handleAboutEditClick } = this.props;

    return (
      <EmptyWrapper>
        <EmptySpan>
          <EmptyTextButton
            onClick={handleAboutEditClick}
          >
            Introduce yourself
          </EmptyTextButton>
          <EmptyText>to the community</EmptyText>
        </EmptySpan>
      </EmptyWrapper>
    );
  };

  renderContent = () => {
    const {
      props: {
        profile: { bio },
        isEditingAbout,
      },
      renderForm,
      renderText,
      maybeRenderButtons,
      renderEmpty,
    } = this;

    if (bio || isEditingAbout) {
      return (
        <ContentWrapper>
          {isEditingAbout ? (
            renderForm()
          ) : (
            renderText()
          )}
          {maybeRenderButtons()}
        </ContentWrapper>
      );
    }
    return renderEmpty();
  };

  render() {
    const {
      maybeRenderEditButton,
      renderContent,
      state: { isLoaded },
    } = this;

    if (!isLoaded) return null;

    return (
      <Wrapper>
        <Title>About</Title>
        {maybeRenderEditButton()}
        {renderContent()}
      </Wrapper>
    );
  }
}
