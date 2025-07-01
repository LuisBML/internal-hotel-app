import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, mutationUpdateSetting } = useUpdateSetting();

  if (isLoading) {
    return <Spinner />;
  }

  function handleUpdate(event, field) {
    const { value } = event.target;
    if (!value) return;

    // e.g. mutationUpdateSetting({ 'minBookingLength': 7 })
    mutationUpdateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow labelContent='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={settings.minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow labelContent='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={settings.maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow labelContent='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={settings.maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>

      <FormRow labelContent='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={settings.breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
