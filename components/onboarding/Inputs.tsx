import { InputsOnChange, InputsValues } from "@/types/ui";

const cn = "border border-gray-300 rounded-md p-2 w-full mb-4";

export function EmailPasswordInput({value, onChange}: InputsProps) {
    return (
        <div>
            <input required className={cn} type="email" name="email" placeholder="Email" value={value.email} onChange={onChange} />
            <input required className={cn} type="password" name="password" placeholder="Password" value={value.password} onChange={onChange} />
        </div>
    );
}
EmailPasswordInput.displayName = 'EmailPasswordInput';

type InputsProps = {
    value: InputsValues;
    onChange: InputsOnChange;
}

export function AboutInput({value, onChange}: InputsProps) {
    return (
        <div>
            <textarea required className={cn} name="about" placeholder="About" value={value.about} onChange={onChange} />
        </div>
    );
}
AboutInput.displayName = 'AboutInput';

export function BirthdayInput({value, onChange}: InputsProps) {
    return (
        <div>
            <input required className={cn} type="date" name="birthday" value={value.birthday} onChange={onChange} />
        </div>
    );
}
BirthdayInput.displayName = 'BirthdayInput';

export function AddressInput({value, onChange}: InputsProps) {
    return (
        <div>
            <input required className={cn} type="text" name="address" placeholder="Address" value={value.address} onChange={onChange} />
            <input required className={cn} type="text" name="city" placeholder="City" value={value.city} onChange={onChange} />
            <input required className={cn} type="text" name="state" placeholder="State" value={value.state} onChange={onChange} />
            <input required className={cn} type="text" name="zip" placeholder="Zip" value={value.zip} onChange={onChange} />
        </div>
    );
}
AddressInput.displayName = 'AddressInput';