import { useCabins } from './useCabins';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  // fetch and store data in the cache
  const { isLoading, cabins } = useCabins();

  // URL params for Client-Side filtering and sorting
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName='cabins' />;

  // 1. Filter
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2. Sort
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [sortField, sortDirection] = sortBy.split('-');
  // modifier to sort by asc or desc
  const modifier = sortDirection === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (cabinA, cabinB) => (cabinA[sortField] - cabinB[sortField]) * modifier
  );

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {/* Render Props Pattern */}
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
