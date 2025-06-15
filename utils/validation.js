import * as Yup from 'yup';

export const signupValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full Name is required'),

  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),

  acceptTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
});
