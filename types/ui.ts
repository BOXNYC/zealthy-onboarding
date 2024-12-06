export type Text = string | JSX.Element;

export type InputsValues = {
    email?: string;
    password?: string;
    about?: string;
    birthday?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
}

export type InputsChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type InputsOnChange = (e: InputsChangeEvent) => void;