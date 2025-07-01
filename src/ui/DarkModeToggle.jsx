import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import ButtonIcon from './ButtonIcon';
import useDarkModeContext from '../hooks/useDarkModeContext';

function DarkModeToggle() {
  // get data from provider(DarkModeProvider)
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
