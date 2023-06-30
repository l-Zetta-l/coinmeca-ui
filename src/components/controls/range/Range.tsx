﻿"use client";
import React, { useState, useEffect, useRef } from "react";
import Style from "./Range.styled";
import { Format } from "lib/utils";

export interface Slider {
    color?: string;
    value?: number;
    onChange?: Function;
    step?: number;
    snap?: boolean;
    min?: number;
    max?: number;
    device?: string;
    disabled?: boolean;
}

export default function Range(props: Slider) {
    const [value, setValue] = useState<number>(props?.value || 0);
    const [percent, setPercent] = useState<number>(0);

    const color = props?.color || "white";
    const step = (props?.step && (props?.step > 2 ? props?.step : 2)) || 2;
    const snap = props?.snap || false;
    const min = props?.min || 0;
    const max = props?.max || 100;
    const disabled = props?.disabled || false;

    useEffect(() => {
        if (typeof props?.value === "number" && props?.value > -1) props?.value > 100 ? setValue(100) : props?.value < 0 ? setValue(0) : setValue(props?.value);
    }, []);

    useEffect(() => {
        if (typeof props?.value === "number" && !isNaN(props?.value)) setValue(props?.value < min ? min : props?.value);
    }, [props?.value]);

    useEffect(() => {
        setPercent(value === min ? 0 : ((value - min) / (max - min)) * 100);
    }, [value]);

    const onChange = (e: any) => {
        const value = parseFloat(e.target.value);
        const range = max - min;
        if (!snap) {
            const percent = Math.round((value / range) * 100);
            setValue(percent);
            props?.onChange && props?.onChange(percent);
        } else {
            const dot = range / (step - 1);
            const dots = Math.round(value / dot);
            const percent = Math.round(dot * dots);
            setValue(percent);

            props?.onChange && props?.onChange(percent);
        }
    };

    return (
        <>
            {/* <Style onClick={(e) => handler(e)} onDrag={(e) => handler(e)} draggable={true}> */}
            <Style draggable={false} $color={color}>
                <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(e)} />
                <div>
                    <div>
                        <div style={{ backgroundSize: `${percent}% 100%` }}>
                            {[...Array(step)].map((_, i) => (
                                <div key={i} className={percent >= (max / (step - 1)) * i ? "on" : ""} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <span style={{ left: `${percent}%` }}>
                            <span>{value.toFixed(0)}%</span>
                        </span>
                    </div>
                </div>
            </Style>
        </>
    );
}
