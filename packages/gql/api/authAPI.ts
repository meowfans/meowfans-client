import { graphql } from '../generated';

export const ISSUE_IMPERSONATE_TOKEN_MUTATION = graphql(`
  mutation IssueImpersonationTokenMutation($creatorId: String!) {
    issueImpersonationToken(creatorId: $creatorId)
  }
`);

export const GENERATE_OTP_MUTATION = graphql(`
  mutation GenerateOtpMutation($email: String!) {
    generateOtp(email: $email)
  }
`);

export const VALIDATE_OTP_QUERY = graphql(`
  query ValidateOtpQuery($input: ValidateOtpInput!) {
    validateOtp(input: $input)
  }
`);

export const FORGOT_AND_RESET_PASSWORD_MUTATION = graphql(`
  mutation ForgotAndResetPasswordMutation($input: LoginInput!) {
    forgotAndResetPassword(input: $input)
  }
`);
