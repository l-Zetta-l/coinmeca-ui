﻿import { css, styled } from "styled-components";
import { Root } from "lib/style";

const Thumb = (color: string) => css`
    appearance: none;
    background: rgba(${color}, var(--o1));
    width: 4em;
    height: 4em;
    border-radius: 2em;
    transition: 0.15s ease;
    backdrop-filter: blur(4em);

    &:hover {
        background: rgba(${color}, var(--o06));
        transform: scale(1.125);
    }
`;

const Style = styled.div<{ $color: string }>`
    ${({ $color }) => {
        const color = Root.Color($color);
        return css`
            font-size: 0.6667em;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            input[type="range"] {
                appearance: none;
                position: relative;
                font-size: 1em;
                width: 100%;
                height: 4em;
                background: none;
                z-index: 1;

                &:hover {
                    cursor: e-resize;
                }

                &:active {
                    cursor: grabbing;
                }

                &:focus {
                    outline: none;
                }

                &::-webkit-slider-thumb {
                    ${Thumb(color)}
                }

                &::-moz-range-thumb {
                }

                ::-ms-thumb {
                }
            }

            & > div:last-child {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;

                & > div {
                    position: absolute;
                    height: 100%;

                    &:first-child {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: calc(100% - 3em);
                        margin-left: -0.5em;
                        padding: 0 2em;

                        & > div {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            background: rgba(var(--white), var(--o015));
                            background-image: linear-gradient(rgb(${color}), rgb(${color}));
                            background-repeat: no-repeat;
                            background-position: left;
                            width: 100%;
                            height: 0.25em;

                            & > div {
                                background: rgba(var(--white), var(--o015));
                                width: 1em;
                                height: 1em;
                                border-radius: 1em;
                                backdrop-filter: blur(0.25em);

                                &:hover {
                                    background: rgba(var(--white), var(--o03));
                                }
                                &:active {
                                }
                            }

                            .on {
                                background: rgb(${color});
                            }
                        }
                    }

                    &:last-child {
                        position: relative;
                        left: 1em;
                        width: calc(100% - 4rem);
                    }

                    & > span {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 4em;
                        height: 4em;
                        border-radius: 4em;
                        transform: translateX(-1em);
                        z-index: 2;

                        & > span {
                            color: ${color === "white" ? "var(--white)" : "white"};
                            position: absolute;
                            font-size: 1.25em;
                            font-feature-settings: initial;
                            margin-top: -0.125em;
                        }
                    }
                }
            }
        `;
    }}
`;

export default Style;
