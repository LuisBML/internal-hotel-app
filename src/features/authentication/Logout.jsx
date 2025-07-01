import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';
import { useLogout } from './useLogout';

function Logout() {
  const { mutationLogout, isLogginOut } = useLogout();

  return (
    <ButtonIcon disabled={isLogginOut} onClick={mutationLogout}>
      {!isLogginOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
