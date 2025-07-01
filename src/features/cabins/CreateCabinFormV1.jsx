import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

import { useForm } from 'react-hook-form';
import { createCabin } from '../../services/apiCabins';

function CreateCabinForm() {
  // Custom hook to manage the entire form.
  // Steps:
  // 1. Register all the input fields that we want React hook form to handle
  // 2. Use handleSubmit function
  // getValues(): get all the values from the form
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  // validation errors
  const { errors } = formState;

  const myQueryClient = useQueryClient();

  // Create a cabin and cause a re fetch of the data
  const { isLoading: isCreating, mutate } = useMutation({
    // mutationFn: (newCabin) => createCabin(newCabin) or this:
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New Cabin successfully created');
      // To cause a re fetch of the data after successfully creating a cabin
      myQueryClient.invalidateQueries({ queryKey: ['cabins'] });
      // reset form
      reset();
    },
    // gets access to the error thrown by the mutationFn (createCabin)
    onError: (err) => toast.error(err.message),
  });

  function onSubmitForm(data) {
    // data = data from the register fields
    mutate({ ...data, image: data.image[0] });
  }

  function onError(formErrors) {
    // formErrors = validation errors from the form
    console.log(formErrors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitForm, onError)}>
      <FormRow labelContent='Cabin name' errorMsg={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          type='number'
          id='description'
          disabled={isCreating}
          defaultValue=''
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow labelContent='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          disabled={isCreating}
          {...register('image', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute!, reset all the values on this form */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
