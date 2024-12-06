export type User = {
    id?: string;
    email: string;
    password?: string;
    data?: UserData;
};
export type UserData = {
    about: string;
    birthday: string;
    address: string;
    city: string;
    state: string;
    zip: string;
}