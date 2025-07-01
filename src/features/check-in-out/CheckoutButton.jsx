import Button from '../../ui/Button';
import { useCheckout } from './useCheckout';

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, mutationCheckout } = useCheckout();

  return (
    <Button
      variation='primary'
      size='small'
      onClick={() => mutationCheckout(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
