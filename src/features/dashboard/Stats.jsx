import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1. Number of bookings
  const numBookings = bookings.length;

  // 2. Total sales
  const sales = bookings.reduce(
    (total, curBooking) => total + curBooking.totalPrice,
    0
  );

  // 3. Total check ins
  const checkins = confirmedStays.length;

  // 4. Occupancy rate
  const numNights = confirmedStays.reduce(
    (total, curStay) => total + curStay.numNights,
    0
  );

  const occupationRate = numNights / (numDays * cabinCount);

  return (
    <>
      <Stat
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title='Occupancy rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupationRate * 100)}%`}
      />
    </>
  );
}

export default Stats;
