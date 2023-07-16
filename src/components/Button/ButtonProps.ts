import { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonSizes, ButtonVariant } from "./Button.types";

export type ButtonProps = {
    onClick?: () => void;
    variant?: ButtonVariant;
    size?: ButtonSizes;
    fullWidth: boolean;
}& ButtonHTMLAttributes<HTMLButtonElement>;