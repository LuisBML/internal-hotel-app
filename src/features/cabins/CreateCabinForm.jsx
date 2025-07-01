import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  // using form for creating or editing
  const isEditSession = Boolean(editId);

  // Custom hook to manage the entire form.
  // Steps:
  // 1. Register all the input fields that we want React hook form to handle
  // 2. Use handleSubmit function
  // getValues(): get all the values from the form
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  // validation errors
  const { errors } = formState;

  const { isCreating, mutationCreateCabin } = useCreateCabin();
  const { isEditing, mutationEditCabin } = useEditCabin();

  // If is loading or doing a mutation
  const isWorking = isCreating || isEditing;

  function onSubmitForm(data) {
    // data: information coming from the form below

    // If using a supabase stored image or the user uploaded a new one
    const imageFile =
      typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      mutationEditCabin(
        {
          newCabinData: { ...data, image: imageFile },
          id: editId,
        },
        {
          onSuccess: () => {
            // reset form
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      mutationCreateCabin(
        { ...data, image: imageFile },
        {
          onSuccess: () => {
            // reset form
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  // function onError(formErrors) {
  //   console.log(formErrors);
  // }

  return (
    <Form
      onSubmit={handleSubmit(onSubmitForm)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow labelContent='Cabin name' errorMsg={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow
        labelContent='Maximum capacity'
        errorMsg={errors?.maxCapacity?.message}
      >
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow
        labelContent='Regular price'
        errorMsg={errors?.regularPrice?.message}
      >
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Price should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow labelContent='Discount' errorMsg={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues().regularPrice ||
              'Discount needs to be less than the regular price',
          })}
        />
      </FormRow>

      <FormRow
        labelContent='Description for website'
        errorMsg={errors?.description?.message}
      >
        <Textarea
          id='description'
          disabled={isWorking}
          defaultValue=''
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow labelContent='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          disabled={isWorking}
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute!, reset all the values on this form */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
