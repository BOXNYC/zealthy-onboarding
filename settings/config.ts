export const Inputs = {
    EMAIL_PASSWORD: 'EmailPasswordInput',
    ABOUT: 'AboutInput',
    BIRTHDAY: 'BirthdayInput',
    ADDRESS: 'AddressInput',
} as InputComponents;

export const defaults = {
    input: {
        steps: {
            'Signup': [Inputs.EMAIL_PASSWORD],
            'Personal Info': [Inputs.BIRTHDAY, Inputs.ABOUT],
            'Final Step': [Inputs.ADDRESS],
        } as InputSteps,
    },
};

type InputComponents = {
    EMAIL_PASSWORD: 'EmailPasswordInput',
    ABOUT: 'AboutInput',
    BIRTHDAY: 'BirthdayInput',
    ADDRESS: 'AddressInput',
} 

export type Settings = typeof defaults;

export type InputComponenets = 'EmailPasswordInput' | 'AboutInput' | 'BirthdayInput' | 'AddressInput';

export type InputSteps = {
    [key: string]: InputComponenets[];
};