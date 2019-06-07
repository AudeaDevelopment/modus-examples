import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { timezones } from 'react-timezone';
import { getUser, getProfile, setUserData, setUserAvailability } from '../../util/db';

import Session from './Session/index';
import Payment from './Payment/index';
import Head from './Head';
import Expertise from './Expertise/index';
import About from './About';
import Availability from './Availability/index';

const Wrapper = styled.div`
  width: 100%;
  color: #444;
  position: relative;
`;

class Profile extends Component {
  state = {
    isLoaded: false,
    isOwner: false,
    isEditingHeadline: false,
    isCreatingSoftware: false,
    isEditingSoftware: false,
    isEditingAbout: false,
    isBooking: false,
    isEditingAvailability: false,
    // placeholder:
    paymentConfigured: true,
  };

  componentDidMount() {
    const {
      props: {
        user: { uid },
        match: { params: { id } },
      },
      loadOwnerProfile,
      loadOtherProfile,
    } = this;

    uid === id ? loadOwnerProfile() : loadOtherProfile(id);
  }

  loadOwnerProfile = () =>
    getUser()
      .then(profile =>
        this.setState({
          profile,
          isOwner: true,
          isLoaded: true,
        })
      )
      .catch(e => console.log('error loading owner profile', e));

  loadOtherProfile = (id) =>
    getUser()
      .then(user =>
        getProfile(id)
          .then(profile =>
            this.setState({
              user,
              profile,
              isOwner: false,
              isLoaded: true,
            })
          )
          .catch(e => console.log('error loading other profile', e))
      )
      .catch(e => console.log('error loading user profile', e));

  handleSessionModalClose = () => (
    this.setState({ isBooking: false })
  );

  handleTimeZoneSave = (timeZone) => {
    const { user } = this.state;
    const timezone = timezones.find(({ name }) => name === timeZone);

    return new Promise((resolve, reject) => {
      setUserData({ timezone })
        .then(() => {
          this.setState({
            user: { ...user, timezone },
          });
          resolve();
        })
        .catch(e => {
          console.log('error updating user timezone', e);
          reject();
        });
    });
  };

  handlePaymentOkClick = () => (
    this.setState({ paymentConfigured: true })
  );

  handleBookClick = () => (
    this.setState({ isBooking: true })
  );

  handleHeadlineEditClick = () => (
    this.setState({ isEditingHeadline: true })
  );

  handleHeadlineCancelClick = () => {
    this.setState({ isEditingHeadline: false });
  };

  handleHeadlineSaveClick = headline => {
    const { profile } = this.state;

    setUserData({ headline })
      .then(() => {
        this.setState({
          profile: { ...profile, headline },
          isEditingHeadline: false,
        });
      })
      .catch(e => console.log('error updating profile headline', e));
  };

  handleSoftwareAddNewClick = () => (
    this.setState({ isCreatingSoftware: true })
  );

  handleSoftwareEditClick = () => (
    this.setState({ isEditingSoftware: true })
  );

  handleSoftwareCancelClick = () => (
    this.setState({
      isEditingSoftware: false,
      isCreatingSoftware: false,
    })
  );

  handleSoftwareSaveAddClick = (content) => {
    const { profile } = this.state;
    const software = this.state.profile.software || [];
    content.id = Date.now();
    content.tags = content.tags.split(', ');
    const updatedSoftware = software.concat(content);

    setUserData({ software: updatedSoftware })
      .then(() => {
        this.setState({
          profile: { ...profile, software: updatedSoftware },
          isCreatingSoftware: false,
        });
      })
      .catch(e => console.log('error updating profile software', e));
  };

  handleSoftwareSaveEditClick = (content) => {
    const { profile, profile: { software } } = this.state;

    const updatedSoftware = software.map(value =>
      value.id === content.id ? content : value);

    setUserData({ software: updatedSoftware })
      .then(() => {
        this.setState({
          profile: { ...profile, software: updatedSoftware },
          isEditingSoftware: false,
        });
      })
      .catch(e => console.log('error updating profile software', e));
  };

  handleAboutEditClick = () => (
    this.setState({ isEditingAbout: true })
  );

  handleAboutCancelClick = () => (
    this.setState({ isEditingAbout: false })
  );

  handleAboutUpdateClick = (bio, timezone, languages, city) => {
    const { profile } = this.state;

    setUserData({ bio, timezone, languages, city })
      .then(() => {
        this.setState({
          profile: { ...profile, bio, timezone, languages, city },
          isEditingAbout: false,
        });
      })
      .catch(e => console.log('error updating profile about', e));
  };

  handleAvailabilityClick = () => (
    this.setState({ isEditingAvailability: true })
  );

  handleAvailabilitySaveClick = (availability, vacationMode) => {
    const { profile, profile: { uid } } = this.state;

    setUserAvailability(uid, availability, vacationMode)
      .then(() => (
        this.setState({
          profile: { ...profile, availability, vacationMode },
          isEditingAvailability: false,
        })
      ))
      .catch(e => console.log('error updating profile availability', e));
  };

  handleAvailabilityCancelClick = () => (
    this.setState({ isEditingAvailability: false })
  );

  maybeRenderModal = () => {
    const {
      state: {
        isBooking,
        profile: {
          firstName,
          avatar, uid:
          mentorId,
          avatar: mentorAvatar,
          firstName: mentorFirstName,
          lastName: mentorLastName,
          timezone: { label: mentorTimezone }
        },
        user,
        paymentConfigured,
      },
      handleSessionModalClose,
      handleTimeZoneSave,
      handlePaymentOkClick,
    } = this;

    if (!isBooking) return null;

    const {
      timezone,
      uid: menteeId,
      avatar: menteeAvatar,
      firstName: menteeFirstName,
      lastName: menteeLastName,
    } = user;

    const timeZoneComplete = !!timezone;
    const menteeName = `${menteeFirstName} ${menteeLastName}`;
    const mentorName = `${mentorFirstName} ${mentorLastName}`;
    const software = this.state.profile.software || [];
    const uniqueTags = Array.from(new Set(software.reduce(
      (acc, { tags }) => acc.concat(tags),
      [],
    )));

    if (timeZoneComplete && paymentConfigured) {
      const menteeTimezone = timezone.label;

      return (
        <Session
          menteeTimezone={menteeTimezone}
          mentorTimezone={mentorTimezone}
          menteeName={menteeName}
          mentorName={mentorName}
          menteeAvatar={menteeAvatar}
          mentorAvatar={mentorAvatar}
          menteeId={menteeId}
          mentorId={mentorId}
          name={firstName}
          avatar={avatar}
          tags={uniqueTags}
          handleModalClose={handleSessionModalClose}
        />
      );
    }

    return (
      <Payment
        timeZoneComplete={timeZoneComplete}
        handleTimeZoneSave={handleTimeZoneSave}
        paymentConfigured={paymentConfigured}
        handlePaymentOkClick={handlePaymentOkClick}
      />
    );
  };

  maybeRenderAvailabilityModal = () => {
    const {
      state: {
        isEditingAvailability,
        profile: { availability, vacationMode },
      },
      handleAvailabilitySaveClick,
      handleAvailabilityCancelClick,
    } = this;

    if (!isEditingAvailability) return null;
    return (
      <Availability
        availability={availability}
        vacationMode={vacationMode}
        onSaveClick={handleAvailabilitySaveClick}
        onCancelClick={handleAvailabilityCancelClick}
      />
    );
  };

  render() {
    if (!this.state.isLoaded) {
      // TODO add loader
      return null;
    }

    const {
      state: {
        isOwner,
        isEditingHeadline,
        isEditingSoftware,
        isCreatingSoftware,
        isEditingAbout,
        profile,
        profile: {
          headline,
          avatar,
          onlineStatus,
          name,
          isMentor,
          availability,
          vacationMode,
        },
      },
      maybeRenderModal,
      maybeRenderAvailabilityModal,
      handleBookClick,
      handleHeadlineSaveClick,
      handleHeadlineCancelClick,
      handleHeadlineEditClick,
      handleSoftwareEditClick,
      handleSoftwareAddNewClick,
      handleSoftwareCancelClick,
      handleSoftwareSaveAddClick,
      handleSoftwareSaveEditClick,
      handleAboutEditClick,
      handleAboutCancelClick,
      handleAboutUpdateClick,
      handleAvailabilityClick,
    } = this;

    const software = profile.software || [];

    return (
      <Wrapper>
        {maybeRenderModal()}
        {maybeRenderAvailabilityModal()}
        <Head
          isMentor={isMentor}
          isOwner={isOwner}
          avatar={avatar}
          name={name}
          onlineStatus={onlineStatus}
          headline={headline}
          availability={availability}
          vacationMode={vacationMode}
          isEditingHeadline={isEditingHeadline}
          handleBookClick={handleBookClick}
          handleHeadlineSaveClick={handleHeadlineSaveClick}
          handleHeadlineCancelClick={handleHeadlineCancelClick}
          handleHeadlineEditClick={handleHeadlineEditClick}
          handleAvailabilityClick={handleAvailabilityClick}
        />
        <Expertise
          isOwner={isOwner}
          software={software}
          isEditingSoftware={isEditingSoftware}
          isCreatingSoftware={isCreatingSoftware}
          handleSoftwareEditClick={handleSoftwareEditClick}
          handleSoftwareAddNewClick={handleSoftwareAddNewClick}
          handleSoftwareCancelClick={handleSoftwareCancelClick}
          handleSoftwareSaveAddClick={handleSoftwareSaveAddClick}
          handleSoftwareSaveEditClick={handleSoftwareSaveEditClick}
        />
        <About
          isOwner={isOwner}
          profile={profile}
          isEditingAbout={isEditingAbout}
          handleAboutEditClick={handleAboutEditClick}
          handleAboutCancelClick={handleAboutCancelClick}
          handleAboutUpdateClick={handleAboutUpdateClick}
        />
      </Wrapper>
    );
  }
}

export default withRouter(Profile);
