import React, { Component } from 'react';
import styled from 'styled-components';

import Filter from './Filter';
import SearchInput from './SearchInput';
import { getMentors } from '../../util/db';

import { Button, Avatar } from '../../common-styles';

const Wrapper = styled.div`
  padding-top: 3em;
  width: 100%;
`;

const Main = styled.div`
  width: 74%;
  border: 2px solid #888;
  box-sizing: border-box;
  border-bottom: none;
  float: right;
`;

const Nav = styled.div`
  display: flex;
  height: 8em;
  border-bottom: 2px solid #888;
  box-sizing: border-box;
  padding: 2.6em 0 0 3em;
`;

const NavItem = styled.div`
  color: #444;
  cursor: pointer;
  pointer-events: ${({ isActive }) => (isActive ? 'none' : 'auto')};
  border-bottom: ${({ isActive }) => (isActive ? '2px solid #888' : 'none')};
  box-sizing: border-box;
  color: ${({ isActive }) => (isActive ? '#444' : '#888')};
  font-size: 2em;
  padding: 0 .5em;
  margin-right: 2em;
  height: 1.8em;
`;

const InputWrapper = styled.div`
  background: #DDD;
  border-bottom: 2px solid #888;
  box-sizing: border-box;
  padding: 3em;
  height: 13em;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Profile = styled.div`
  border-bottom: 2px solid #888;
  box-sizing: border-box;
  position: relative;
  padding: 4em 6em;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const TopBox = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  margin-left: 1em;
  font-size: 2.2em;
`;

const Headline = styled.div`
  font-size: 2em;
  color: #888;
  margin: 1.5em 0 .9em 0;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  margin: .6em .6em 0 0;
  height: 2em;
  background: #DDD;
  border: 2px solid #888;
  text-align: center;
  line-height: 2em;
  font-size: 1.8em;
  color: #444;
  padding: 0 1em;
`;

const Footer = styled.div`
  border-bottom: 2px solid #888;
  text-align: center;
  padding: 1.5em 0;
`;

const ViewProfileButton = styled.a.attrs(({ id }) => ({
  href: `/profile/${id}`,
}))`
  text-decoration: none;
  border: 2px solid #888;
  box-sizing: border-box;
  position: absolute;
  top: 6em;
  right: 6em;
  height: 4.5em;
  width: 15em;
  &:after {
    content: 'View Profile';
    position: absolute;
    color: #888;
    width: 100%;
    line-height: 2.4em;
    text-align: center;
    font-size: 1.7em;
  }
`;

const LoadMoreButton = styled(Button).attrs(() => ({
  text: 'Load More',
  height: '3',
  width: '10',
  color: 'blue',
}))`
  border: none;
`;

export default class Search extends Component {
  state = {
    timeZone: null,
    languages: {
      English: true,
      Spanish: false,
      French: false,
      German: false,
      Chinese: false,
    },
    rate: '30-60',
    tags: [],
    mode: 'Search', // Search or Favorites
    profiles: [],
    user: null,
    isLoaded: false,
  };

  componentDidMount() {
    getMentors()
      .then(profiles => this.setState({ profiles, isLoaded: true }))
      .catch(e => {
        console.log('error fetching mentor profiles', e);
        this.setState({ isLoaded: true });
      });
  }

  filterByTimezone = (profiles) => {
    const { timeZone } = this.state;
    const { offset: myTimezoneOffset } = this.props.user.timezone;

    switch (timeZone) {
      case 'Only in my time zone':
        return profiles.filter(({ timezone: { offset } }) =>
          offset === myTimezoneOffset
        );
      case '± 4 hrs of my time zone':
        return profiles.filter(({ timezone: { offset } }) =>
          Math.abs(offset - myTimezoneOffset) <= 4
        );
      case '± 8 hrs of my time zone':
        return profiles.filter(({ timezone: { offset } }) =>
          Math.abs(offset - myTimezoneOffset) <= 8
        );
      default:
        return profiles;
    }
  };

  filterByLanguages = (profiles) => {
    const { languages: selected } = this.state;
    return profiles.filter(({ languages }) => {
      let containsSelected = false;
      for (let i = 0; i < languages.length; i++) {
        if (selected[languages[i]]) {
          containsSelected = true;
          break;
        }
      }
      return containsSelected;
    });
  };

  filterByRate = (profiles) => {
    const [min, max] = this.state.rate.split('-');
    return profiles.filter(({ rate }) =>
      (rate > parseInt(min, 10)) && (rate < parseInt(max, 10))
    );
  };

  filterBySearchTags = (profiles) => {
    const { tags: selected } = this.state;
    return profiles.filter(({ software }) => {
      const softwareTags = software.reduce((acc, { title, tags }) => {
        acc.push(title);
        return acc.concat(tags);
      }, []);
      let containsSelected = false;
      for (let i = 0; i < softwareTags.length; i++) {
        if (selected.includes(softwareTags[i])) {
          containsSelected = true;
          break;
        }
      }
      return containsSelected;
    });
  };

  filterByVacationMode = profiles =>
    profiles.filter(({ vacationMode }) => !vacationMode);

  applyFilters = (profiles) => {
    const {
      filterByTimezone,
      filterByLanguages,
      filterByRate,
      filterBySearchTags,
      filterByVacationMode,
    } = this;

    return filterByVacationMode(filterBySearchTags(filterByRate(filterByLanguages(filterByTimezone(profiles)))));
  };

  handleSearch = (tags, inputValue) => {
    // TODO: make this more robust -- arrow keys for navigating list, enter key performs search action. Delete the input text after all possible tags are selected
    // Search button applies tags to state for filtering.

    this.setState({ tags });
  };

  handleTimeZoneClick = timeZone => (
    this.setState({ timeZone })
  );

  handleLanguageClick = name => (
    this.setState({
      languages: {
        ...this.state.languages,
        [name]: !this.state.languages[name],
      }
    })
  );

  handleRateClick = rate => (
    this.setState({ rate })
  );

  handleNavClick = mode => (
    this.setState({ mode })
  );

  // TODO
  handleLoadMoreClick = () => null;

  renderNav = () => {
    const {
      state: { mode },
      handleNavClick,
    } = this;

    return (
      <Nav>
        {['Search', 'Favorite'].map(link => (
          <NavItem
            key={link}
            onClick={() => handleNavClick(link)}
            isActive={mode === link}
          >
            {link}
          </NavItem>
        ))}
      </Nav>
    );
  };

  renderTags = (software) => {
    const allTags = Array.from(new Set(software.reduce((acc, { title, tags }) => {
      acc.push(title);
      return acc.concat(tags);
    }, [])));

    return (
      <Tags>
        {allTags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
    );
  };

  renderList = () => {
    const {
      state: { profiles: unfiltered },
      applyFilters,
      renderTags,
    } = this;

    const filtered = applyFilters(unfiltered);

    return (
      <List>
        {filtered.map(({
          uid,
          firstName,
          lastName,
          headline,
          avatar,
          software,
        }) => (
          <Profile key={uid}>
            <TopBox>
              <Avatar size="6" avatar={avatar} disabled />
              <Name>{`${firstName} ${lastName}`}</Name>
            </TopBox>
            <Headline>{headline}</Headline>
            {renderTags(software)}
            <ViewProfileButton id={uid} />
          </Profile>
        ))}
      </List>
    );
  };

  render() {
    const {
      state: { timeZone, languages, rate, mode, isLoaded },
      renderNav,
      renderList,
      handleLanguageClick,
      handleTimeZoneClick,
      handleRateClick,
      handleLoadMoreClick,
      handleSearch,
    } = this;

    // TODO: add loader
    if (!isLoaded) return null;

    const placeholder = mode === 'Search' ? 'Search for mentors' : 'Search favorite mentors';

    return (
      <Wrapper>
        <Filter
          timeZone={timeZone}
          languages={languages}
          rate={rate}
          handleTimeZoneClick={handleTimeZoneClick}
          handleLanguageClick={handleLanguageClick}
          handleRateClick={handleRateClick}
        />
        <Main>
          {renderNav()}
          <InputWrapper>
            <SearchInput
              onSearch={handleSearch}
              placeholder={placeholder}
            />
          </InputWrapper>
          {renderList()}
          <Footer>
            <LoadMoreButton onClick={handleLoadMoreClick} />
          </Footer>
        </Main>
      </Wrapper>
    );
  }
}
