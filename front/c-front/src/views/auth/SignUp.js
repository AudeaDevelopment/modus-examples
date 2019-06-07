import React from "react";
import { linkedInSignUp } from "../../util";
import {
  Wrapper,
  OrHR,
  StyledLink,
  Terms,
  FullHR,
  BottomSection,
  BottomSectionText
} from "./styles";

import { Button } from "../../common-styles";

export default () => (
  <Wrapper>
    <Button
      onClick={linkedInSignUp}
      background="darkblue"
      text="Sign up with LinkedIn"
    />
    <OrHR />
    <Button background="#FFF" text="Sign up with Email">
      <StyledLink to="/signup-with-email" />
    </Button>

    <FullHR />
    <BottomSection>
      <BottomSectionText>Already have an account?</BottomSectionText>
      <Button isSmall background="#FFF" text="Log In">
        <StyledLink to="/login" />
      </Button>
    </BottomSection>
  </Wrapper>
);
