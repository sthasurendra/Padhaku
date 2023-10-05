import * as Yup from 'yup';

export const regValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/\d/, 'Password must contain atleast one number')
    .matches(/[a-zA-Z]/, 'Password must contain atleast one letter'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Confirm password must match with Password')
    .required('Confirm Password is required'),
  dateOfBirth: Yup.date().max(new Date(), 'Date of Birth not valid'),
  phoneNumber: Yup.string().min(10, 'Phone Number must be 10 digit'),
});

export const logValidationSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
});
export const onlyEmailValidation = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
});
export const resetPasswordValidation = Yup.object().shape({
  token: Yup.string().required('token is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/\d/, 'Password must contain atleast one number')
    .matches(/[a-zA-Z]/, 'Password must contain atleast one letter'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});
export const forceResetPasswordValidation = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/\d/, 'Password must contain atleast one number')
    .matches(/[a-zA-Z]/, 'Password must contain atleast one letter'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/\d/, 'Password must contain atleast one number')
    .matches(/[a-zA-Z]/, 'Password must contain atleast one letter')
    .notOneOf([Yup.ref('currentPassword'), null], 'New Password cannot be same as Old Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const addBookValidationSchema = Yup.object().shape({
  bookTitle: Yup.string().required('Please enter book title'),
  author: Yup.string().required('Authors name is required'),
  publication: Yup.string().required('publication is required'),
  genre: Yup.array().required('Please select genre of your book.'),
  description: Yup.string().required('Please describe your book.'),
  rating: Yup.number().required('Please Rate the book.'),
  review: Yup.string().required('Please write a short review of the book.'),
  price: Yup.number().required('Please specify price of the book.'),
  condition: Yup.number().required('Please select condition of the book.'),
  dateofbought: Yup.date().required('Please specify estimated date when you bought the book.'),
});
