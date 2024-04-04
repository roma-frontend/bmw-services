import * as Yup from "yup";

export const LoginValidator = Yup.object().shape({

    email: Yup.string()
        .email('Invalid email')
        .required('Required'),

    password: Yup.string()
        .min(8, 'Should be min 8 char')
        .max(50, 'Should be max 50 char')
        .required('Required'),
});
export const LoginInitialValues = {
    email: 'test@test.com',
    password: 'qwerty1234',
};