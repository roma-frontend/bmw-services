import * as Yup from "yup";

export const RegisterValidator = Yup.object().shape({
    first_name: Yup.string()
        .min(2, 'Should be min 2 char')
        .max(50, 'Should be max 50 char')
        .required('Required'),

    last_name: Yup.string()
        .min(2, 'Should be min 2 char')
        .max(50, 'Should be max 50 char')
        .required('Required'),

    email: Yup.string()
        .email('Invalid email')
        .required('Required'),

    password: Yup.string()
        .min(8, 'Should be min 8 char')
        .max(50, 'Should be max 50 char')
        .required('Required'),

    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
});
export const RegisterInitialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
};