'use client'

import React, { createElement, useCallback, useEffect, useState } from "react";
import { InputSteps } from "@/types/config";
import * as Inputs from "@/components/onboarding/Inputs";

type WizzardConfigProps = {
    sections: InputSteps;
}
export default function Wizzard({sections}: WizzardConfigProps) {
    const [currentStep, setCurrentStep] = useState<number>(0);
    
    useEffect(() => {
        const storedStep: null | string = window.localStorage.getItem('currentStep')
        setCurrentStep( typeof storedStep === 'string' ? parseInt(storedStep) : 0 );
    }, [currentStep]);

    const onSubmit = useCallback((formData: FormData) => {
        console.log(formData)
        const newStep = currentStep + 1;
        setCurrentStep(newStep);
        window.localStorage.setItem('currentStep', newStep.toString());
    }, [currentStep]);

    const components = sections[Object.keys(sections)[currentStep]];
    const w = ((currentStep + 1) * 100) / Object.keys(sections).length;
    return (<>
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
            {!!components && components.map((component, i)=>createElement(Inputs[component as keyof typeof Inputs], {key: i}))}
            <button className="border block ms-auto p-4 bg-[#00531b] rounded-2xl text-white">{currentStep < 2 ? 'Next >' : 'Finish'}</button>
        </form>
    </>);
}