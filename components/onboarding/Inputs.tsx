const cn = "border border-gray-300 rounded-md p-2 w-full mb-4";

export function EmailPasswordInput() {
    return (
        <div>
            <input className={cn} type="email" name="email" placeholder="Email" />
            <input className={cn} type="password" name="password" placeholder="Password" />
        </div>
    );
}
EmailPasswordInput.displayName = 'EmailPasswordInput';

export function AboutInput() {
    return (
        <div>
            <textarea className={cn} name="about" placeholder="About" />
        </div>
    );
}
AboutInput.displayName = 'AboutInput';

export function BirthdayInput() {
    return (
        <div>
            <input className={cn} type="date" name="birthday" />
        </div>
    );
}
BirthdayInput.displayName = 'BirthdayInput';

export function AddressInput() {
    return (
        <div>
            <input className={cn} type="text" name="address" placeholder="Address" />
            <input className={cn} type="text" name="city" placeholder="City" />
            <input className={cn} type="text" name="state" placeholder="State" />
            <input className={cn} type="text" name="zip" placeholder="Zip" />
        </div>
    );
}
AddressInput.displayName = 'AddressInput';