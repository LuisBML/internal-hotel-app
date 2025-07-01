import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignUp } from './useSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { isSigningUp, mutationSignup } = useSignUp();

  // Custom hook to manage the entire form.
  // Steps:
  // 1. Register all the input fields that we want React hook form to handle
  // 2. Use handleSubmit function

  // getValues(): get all the values from the form
  const { register, handleSubmit, getValues, reset, formState } = useForm();

  // validation errors
  const { errors } = formState;

  function onSubmitForm(data) {
    // data: information coming from the form below
    const { fullName, email, password } = data;

    mutationSignup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <FormRow labelContent='Full name' errorMsg={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          disabled={isSigningUp}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow labelContent='Email address' errorMsg={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isSigningUp}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid Email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        labelContent='Password (min 8 characters)'
        errorMsg={errors?.password?.message}
      >
        <Input
          type='password'
          id='password'
          disabled={isSigningUp}
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
        labelContent='Repeat password'
        errorMsg={errors?.passwordConfirm?.message}
      >
        <Input
          type='password'
          id='passwordConfirm'
          disabled={isSigningUp}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (currentValue) =>
              currentValue === getValues().password ||
              'Passwords need to match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          disabled={isSigningUp}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
