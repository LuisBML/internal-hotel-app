// Styled Components: take a regular HTML element and then using the
// styled function create a brand new React component
// with some CSS styles applied to it. It's possible reuse that new component

import styled, { css } from 'styled-components';

// Styled Components work similar to an HTML element, e.g. we can use the onClick property.
const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    
    ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    
  line-height: 1.4;
`;

export default Heading;
