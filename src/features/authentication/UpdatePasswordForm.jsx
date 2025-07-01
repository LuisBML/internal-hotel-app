import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUpdateUser } from './useUpdateUser';

function UpdatePasswordForm() {
  // Custom hook to manage the entire form.
  // Steps:
  // 1. Register all the input fields that we want React hook form to handle
  // 2. Use handleSubmit function
  // getValues(): get all the values from the form
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  // validation errors
  const { errors } = formState;

  const { isUpdatingUser, mutationUpdateUser } = useUpdateUser();

  function onSubmit(data) {
    // data: information coming from the form below
    const { password } = data;

    mutationUpdateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        labelContent='New password (min 8 chars)'
        errorMsg={errors?.password?.message}
      >
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          disabled={isUpdatingUser}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        labelContent='Confirm password'
        errorMsg={errors?.passwordConfirm?.message}
      >
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          disabled={isUpdatingUser}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (currentValue) =>
              getValues().password === currentValue ||
              'Passwords need to match',
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute!, reset all the values on this form */}
        <Button onClick={reset} type='reset' variation='secondary'>
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
