import * as React from 'react';
import styled from 'styled-components';
import squiggle from 'assets/squiggle.png';
import { colors } from '@leapeasy/ui-kit';
import rectangle from 'assets/rectangle.png';

export default function Background(props) {
  return (
    <Container
      background={colors.purple[700]}
    >
      <img src={squiggle} />

      <RightContainer
        style={{

        }}
      >
        <img src={rectangle} style={{ minWidth: '100%', minHeight: '100%' }} />
        <div
          style={{
            width: '100%',
            height: '100%',
            background: '#2E0F40',
            opacity: 0.04,
            backdropFilter: 'blur(4px)',
          }}
        />
      </RightContainer>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: ${(props) => props.background};

  & > img {
    max-height: 100%;
    position: relative;
    top: -6%;
    @media screen and (max-width: ${({ theme }) => theme['2xl']}) {
      width: 100%;
    }
  }
`

const RightContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  right: 0;
  height: 100vh;
  overflow: hidden;

  @media screen and (max-width: ${({ theme }) => theme['2xl']}) {
    display: none;
  }
`