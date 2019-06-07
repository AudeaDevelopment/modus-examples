import React, { Component } from 'react';
import styled from 'styled-components';
import { createSession } from '../../../util/db';

import SuggestedTimes from './SuggestedTimes';
import TagDeselector from './TagDeselector';
import ButtonGroup from '../../../components/ButtonGroup';
import { Avatar, Button } from '../../../common-styles';
import { StyledTextArea } from '../styles';

const Wrapper = styled.div`
  position: absolute;
  top: 2em;
  width: 70em;
  border: 2px solid #888;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  color: #444;
  background: #FFF;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 10em;
  border-bottom: 2px solid #BBB;
  padding-left: 2em;
  box-sizing: border-box;
`;

const HeadText = styled.div`
  margin-left: 1em;
  font-size: 2.2em;
`;

const Main = styled.div`
  padding: 0 2em;
  box-sizing: border-box;
`;

const SectionHeader = styled.div`
  margin: 3em 0 .6em;
  font-size: 2em;
`;

const DetailsTextArea = styled(StyledTextArea)`
  width: 100%;
  margin: .6em 0 2em;
`;

const ButtonBox = styled.div`
  width: 100%;
  border-top: 2px solid #888;
  display: flex;
  justify-content: flex-end;
  padding: 1em 2em;
  box-sizing: border-box;
`;

const StyledButton = styled(Button)`
  font-size: 1em;
  margin-left: 1em;
`;

// placeholders
const defaultDates = ['Feb 25 2019', 'Feb 26 2019', 'Feb 27 2019'];
const defaultTimes = ['1200', '1230', '1300'];

export default class Session extends Component {
  state = {
    dateOne: defaultDates[0],
    dateTwo: defaultDates[1],
    dateThree: defaultDates[2],
    timeOne: defaultTimes[0],
    timeTwo: defaultTimes[1],
    timeThree: defaultTimes[2],
    lengthOption: null,
    tags: this.props.tags,
  };

  handleInputChange = (name, value) => (
    this.setState({ [name]: value })
  );

  handleLengthClick = lengthOption => (
    this.setState({ lengthOption })
  );

  handleTagClick = (tag) => {
    const tags = this.state.tags.filter(v => v !== tag);
    this.setState({ tags });
  };

  handleSubmitClick = () => {
    const {
      props: {
        handleModalClose,
        menteeId,
        mentorId,
        menteeAvatar,
        mentorAvatar,
        menteeName,
        mentorName,
        mentorTimezone,
        menteeTimezone,
      },
      state,
    } = this;

    createSession({
      ...state,
      menteeId,
      mentorId,
      menteeAvatar,
      mentorAvatar,
      menteeName,
      mentorName,
      mentorTimezone,
      menteeTimezone,
      createdOn: Date.now(),
      status: 'Awaiting Confirmation',
      confirmedDate: null,
    })
      .then(() =>
        handleModalClose()
        // TODO: give user feedback that session was created successfully
      )
      .catch(e =>
        console.log('error creating session', e)
      );
  };

  render() {
    const {
      props: {
        avatar,
        name,
        handleModalClose,
      },
      state: {
        dateOne,
        dateTwo,
        dateThree,
        timeOne,
        timeTwo,
        timeThree,
        lengthOption,
        tags,
        details,
      },
      handleInputChange,
      handleLengthClick,
      handleTagClick,
      handleSubmitClick,
    } = this;

    return (
      <Wrapper>
        <Head>
          <Avatar
            size="5"
            avatar={avatar}
            disabled
          />
          <HeadText>{`Schedule a session with ${name}`}</HeadText>
        </Head>
        <Main>
          <SectionHeader>
            Suggest times when you&#39;re free to talk
          </SectionHeader>
          <SuggestedTimes
            dateOne={dateOne}
            dateTwo={dateTwo}
            dateThree={dateThree}
            timeOne={timeOne}
            timeTwo={timeTwo}
            timeThree={timeThree}
            handleChange={handleInputChange}
          />
          <SectionHeader>
            Set estimated length
          </SectionHeader>
          <ButtonGroup
            handleClick={handleLengthClick}
            activeOption={lengthOption}
            options={['< 30 min', '> 30 min', 'Not sure']}
          />
          <SectionHeader>
            What do you need help with?
          </SectionHeader>
          <TagDeselector
            tags={tags}
            handleClick={handleTagClick}
          />
          <DetailsTextArea
            placeholder="Provide details (optional)"
            value={details}
            onChange={({ target: { value } }) =>
              handleInputChange('details', value)
            }
          />
        </Main>
        <ButtonBox>
          <StyledButton
            onClick={handleModalClose}
            text="Cancel"
            background="#FFF"
            width="8"
            height="3.5"
          />
          <StyledButton
            onClick={handleSubmitClick}
            text="Schedule session"
            background="#000"
            width="16"
            height="3.5"
          />
        </ButtonBox>
      </Wrapper>
    );
  }
}
