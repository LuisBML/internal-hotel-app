import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
    const { mutate: mutationSignup, isLoading: isSigningUp } = useMutation({
        mutationFn: signup,
        // onSuccess receives the newly created user
        // onSuccess: (createdUser)
        onSuccess: () => {
            toast.success('Account successfully created. Please verify your account in your email.')
        },
        // onError receives the error thrown by the mutationFn (signup)
        onError: () => toast.error('There was a problem while creating your account, try again later.')
    });

    return { mutationSignup, isSigningUp }
}