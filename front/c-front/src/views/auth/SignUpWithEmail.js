import React, { Component } from "react";
import styled from "styled-components";

import {
  Wrapper,
  OrHR,
  Terms,
  FullHR,
  BottomSection,
  BottomSectionText,
  StyledLink
} from "./styles";

import { Button, InputWrapper } from "../../common-styles";

const LinkedInHeader = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkedInHeaderText = styled.div`
  font-size: 2em;
  color: #888;
`;

const LinkedInLink = styled.a`
  font-size: 2em;
  color: blue;
  text-decoration: none;
`;

export default class SignUpWithEmail extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  handleInputChange = (name, value) => this.setState({ [name]: value });

  handleSubmit = () => {
    const user = { ...this.state };
    this.props.handleSignUp(user);
  };

  render() {
    const {
      state: { firstName, lastName, email, password },
      handleInputChange,
      handleSubmit
    } = this;

    return (
      <Wrapper>
        <LinkedInHeader>
          <LinkedInHeaderText>Sign up with &nbsp;</LinkedInHeaderText>
          <LinkedInLink href="#">LinkedIn</LinkedInLink>
        </LinkedInHeader>
        <OrHR />
        <InputWrapper>
          <input
            value={firstName}
            onChange={({ target: { value } }) =>
              handleInputChange("firstName", value)
            }
            placeholder="First Name"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            value={lastName}
            onChange={({ target: { value } }) =>
              handleInputChange("lastName", value)
            }
            placeholder="Last Name"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            value={email}
            onChange={({ target: { value } }) =>
              handleInputChange("email", value)
            }
            placeholder="Institution Email"
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="password"
            value={password}
            onChange={({ target: { value } }) =>
              handleInputChange("password", value)
            }
            placeholder="Password"
          />
        </InputWrapper>

        <Button background="#000" text="Sign Up" onClick={handleSubmit} />
        <FullHR />
        <BottomSection>
          <BottomSectionText>Already have an account?</BottomSectionText>
          <Button isSmall background="#FFF" text="Log In">
            <StyledLink to="/login" />
          </Button>
        </BottomSection>
      </Wrapper>
    );
  }
}
