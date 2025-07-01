import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  // URL params
  const [searchParams, setSearchParams] = useSearchParams();
  // for controlled element (select)
  const sortByValue = searchParams.get('sortBy') || '';

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type='white'
      value={sortByValue}
      onChangeProp={handleChange}
    />
  );
}

export default SortBy;
