import { useLazyQuery, useMutation } from '@apollo/client/react';
import { FORGOT_AND_RESET_PASSWORD_MUTATION, GENERATE_OTP_MUTATION, VALIDATE_OTP_QUERY } from '../api';
import { LoginInput, ValidateOtpInput } from '../generated/graphql';

export const useAuthActions = () => {
  const [generateOtp] = useMutation(GENERATE_OTP_MUTATION);
  const [validateOtp] = useLazyQuery(VALIDATE_OTP_QUERY);
  const [forgotAndResetPassword] = useMutation(FORGOT_AND_RESET_PASSWORD_MUTATION);

  const generateOtpMutation = (email: string) => {
    return generateOtp({ variables: { email } });
  };

  const validateOtpMutation = (input: ValidateOtpInput) => {
    return validateOtp({ variables: { input } });
  };

  const forgotAndResetPasswordMutation = (input: LoginInput) => {
    return forgotAndResetPassword({ variables: { input } });
  };

  return {
    generateOtpMutation,
    validateOtpMutation,
    forgotAndResetPasswordMutation
  };
};
