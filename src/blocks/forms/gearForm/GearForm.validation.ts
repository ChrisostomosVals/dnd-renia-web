import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  gear: yup.array().of(
    yup.object().shape({
      id: yup.string().nullable(),
      name: yup.string().required('Name is required'),
      quantity: yup
        .number()
        .typeError('Quantity must be a number')
        .moreThan(0, 'Quantity must be a non-negative number')
        .required('Quantity is required'),
      weight: yup.string().nullable().required('Name is required'),
    })
  ),
  newGear: yup.array().of(
    yup.object().shape({
      id: yup.string().nullable(),
      name: yup.string().required('Name is required'),
      quantity: yup
        .number()
        .typeError('Quantity must be a number')
        .min(0, 'Quantity must be a non-negative number')
        .required('Quantity is required'),
      weight: yup.string().nullable().required('Name is required'),
    })
  ),
});