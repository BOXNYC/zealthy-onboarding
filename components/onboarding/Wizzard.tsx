'use client'

import React, { createElement, useCallback, useEffect, useState } from "react";
import * as Inputs from "@/components/onboarding/Inputs";
import { InputSteps } from "@/settings/config";
import { InputsChangeEvent, InputsValues } from "@/types/ui";

// Server
import { createUser, getUser, updateUserData } from "@/app/actions/api";
import { UserData } from "@/types/models";

const inputsValueDefaults: InputsValues = {
    email: '',
    password: '',
    about: '',
    birthday: '',
    address: '',
    city: '',
    state: '',
    zip: ''
};

type WizzardConfigProps = {
    sections: InputSteps;
}
export default function Wizzard({sections}: WizzardConfigProps) {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [userId, setUserId] = useState<number | null>(null);
    const [values, setValues] = useState<InputsValues>(inputsValueDefaults);
    const [message, setMessage] = useState<JSX.Element | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [complete, setComplete] = useState<boolean>(false);
    
    useEffect(() => {
        const storedStep: null | string = window.localStorage.getItem('currentStep');
        setCurrentStep( typeof storedStep === 'string' ? parseInt(storedStep) : 0 );
    }, []);

    useEffect(() => {
        const storedComplete: null | string = window.localStorage.getItem('complete');
        if (storedComplete === 'true') setComplete(true);
    }, []);

    useEffect(() => {
        const id: null | string = window.localStorage.getItem('userId');
        if (id === null) {
            setLoading(false);
            return;
        }
        const uid = parseInt(id);
        setUserId(uid);
        getUser(uid).then((user) => {
            if (user !== null) {
                const v = user.data !== null ? {...values, ...user.data} : {...values};
                if (user.email) v.email = user.email;
                if (user.password) v.password = user.password;
                setValues(v);
            }
            setLoading(false);
        }).catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const onChange = useCallback((e: InputsChangeEvent) => {
        const key = e.target.name;
        const value = e.target.value;
        setValues((prev) => ({...prev, [key]: value}));
    }, []);

    const nextStep = useCallback(() => {
        const newStep = currentStep + 1;
        setCurrentStep(newStep);
        window.localStorage.setItem('currentStep', newStep.toString());
    }, [currentStep]);

    const showComplete = useCallback(() => {
        setComplete(true);
        setCurrentStep(0);
        window.localStorage.setItem('complete', 'true');
    }, []);

    const reset = useCallback(() => {
        setComplete(false);
        setCurrentStep(0);
        setValues(inputsValueDefaults);
        window.localStorage.removeItem('userId');
        window.localStorage.removeItem('currentStep');
        window.localStorage.removeItem('complete');
    }, []);

    const onSubmit = useCallback((formData: FormData): void => {
        setMessage(null);
        const { email, password } = values as InputsValues;
        if (currentStep == 0 && email !== null && password !== null) {
            if (!email?.trim()) {
                setMessage(<Message type="error">Email empty</Message>);
                return;
            }
            if (!email.trim().match(/^[^\@]{1,}\@[^\.]{1,}\.[a-z]{2,}$/ig)) {
                setMessage(<Message type="error">Invalid Email</Message>);
                return;
            }
            if (!password?.trim() || password.trim().length < 6) {
                setMessage(<Message type="error">Password empty</Message>);
                return;
            }
            createUser(email, password).then((id: number | null) => {
                if (id !== null) {
                    setUserId(id);
                    window.localStorage.setItem('userId', String(id));
                    nextStep();
                } else {
                    console.error('Error creating user');
                }
            }).catch(console.error);
            return;
        }

        // If other fields than email and password...
        if (userId === null) return;
        const data = Object.fromEntries(formData) as UserData;
        updateUserData(userId, data).then((success) => {
            if (success) {
                if (currentStep==2) showComplete();
                else nextStep();
            } else {
                setMessage(<Message type="error">Error saving</Message>);
            }
        }).catch(console.error);
    }, [currentStep, values, nextStep, showComplete, userId]);
    
    // Waiting on local storage to be read
    if (loading) return <h3 className="w-full text-center text-[#666]">One moment...</h3>;
    
    // Render wizzard
    const components = sections[Object.keys(sections)[currentStep]];
    const w = ((currentStep + 1) * 100) / Object.keys(sections).length;
    return (<>
        
        {!complete && <>
            <div className="flex w-full relative border rounded-full mb-8">
                <div className={`block absolute h-full bg-[#666] rounded-full`} style={{
                    width: `${w}%`,
                    transition: 'width 0.5s ease-in-out'
                }}></div>
                {Object.keys(sections).map((step, index) => (<section
                    className={`relative inline-block w-full py-2 text-center ${index <= currentStep ? 'text-white' : 'text-gray-500'}`}
                    key={index}
                >
                    {step}
                </section>))}
            </div>
            <form action={onSubmit}>
                {!!components && components.map((component, i)=>createElement(Inputs[component as keyof typeof Inputs], {key: i, value: values, onChange: onChange}))}
                <div className="sm:flex sm:gap-4">
                    {!!message && <div className="w-full">{message}</div>}
                    <button className="text-nowrap border block ms-auto py-2 px-4 bg-[#00531b] rounded-2xl text-white">{currentStep < 2 ? 'Next' : 'Finish'}</button>
                </div>
            </form>
        </>}

        {!!complete && <div>
            <h2 className="text-3xl">Complete!</h2>
            <h3 className="text-2xl mb-8">Here is your profile</h3>
            <User values={values} />
        </div>}

        {currentStep > 0 && <div className="mt-8">
            <button onClick={reset} className="text-nowrap border inline-block py-2 px-4 bg-[#00531b] rounded-2xl text-white">Onboard another</button>
        </div>}
        
        {/* <pre>{typeof userId}</pre>
        <pre>{JSON.stringify(values, null, 2)}</pre> */}
    </>);
}

function Message({type, children}: {type?: string | undefined, children: JSX.Element | string}) {
    return <h3 className={`p-4 ${type === 'error' ? 'text-[#FF0000] border border-[#FF0000]' : 'bg-green-500'}`}>{children}</h3>
}

function User({values}: {values: InputsValues}) {
    return (<>
        <div>{Object.keys(values).map((key, index)=>{
            if (!values[key as keyof InputsValues]) return null;
            return <div key={index}>
                <span className="bg-[#DDD] rounded-full me-4 px-2">{key[0].toUpperCase()+key.substring(1)}</span>
                <span>{values[key as keyof InputsValues]}</span>
            </div>
        })}</div>
    </>);
}