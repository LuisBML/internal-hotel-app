import styled from 'styled-components';
import useDarkModeContext from '../hooks/useDarkModeContext';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 10rem;
  width: auto;
`;

function Logo() {
  // get data from provider(DarkModeProvider)
  const { isDarkMode } = useDarkModeContext();

  const srcImg = isDarkMode ? '/logo-dark.png' : '/logo-light.png';

  return (
    <StyledLogo>
      <Img src={srcImg} alt='Logo' />
    </StyledLogo>
  );
}

export default Logo;
