export const Inputs = {
    EMAIL_PASSWORD: 'EmailPasswordInput',
    ABOUT: 'AboutInput',
    BIRTHDAY: 'BirthdayInput',
    ADDRESS: 'AddressInput',
}

export const defaults = {
    input: {
        steps: {
            'Signup': [Inputs.EMAIL_PASSWORD],
            'Personal Info': [Inputs.BIRTHDAY, Inputs.ABOUT],
            'Final Step': [Inputs.ADDRESS],
        },
    },
};

export type Settings = typeof defaults;