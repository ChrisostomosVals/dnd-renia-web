export type ColorVariantType = 'light' | 'dark';

export type ColorType = {
    [key in ColorVariantType]: {
        [colorVal: string]: string;
    };
};

export const color: ColorType = {
    light: {
        backgroundColor: '#ffffff',
        primary: '#eeeae6',
        secondary: '#03dac6',
        text: '#000000',
        error: '#ff3333',
        buttonPrimary: '#eeeae6',
        buttonPrimaryText: '#000000',
        buttonSecondary: '#000000',
        buttonSecondaryText: '#eeeae6',
        input: '#FFFFFF',
        box: `#FFFFFF`,
        border: '#202A33',
        header: '#eeeae6',
        modal: '#eeeae6',
        icon: '#000000',
        iconHover: '#b2afac',
        hover: '#b2afac',
        tableHeader: '#eeeae6',
        tableRowOdd: '#FFFFFF',
        tableRowEven: '#f5f5f5',
        sideBar: '#e6e6e6',
        link: '#000000'
    },
    dark: {
        backgroundColor: '#22252a',
        primary: '#5f6876',
        secondary: '#03dac6',
        text: '#FFFFFF',
        error: '#ff3333',
        buttonPrimary: '#5f6876',
        buttonPrimaryText: '#1F1B24',
        buttonSecondary: '#1F1B24',
        buttonSecondaryText: '#5f6876',
        input: '#332940',
        box: `#433e47`,
        border: '#202A33',
        header: '#433e47',
        modal: '#433e47',
        icon: '#FFFFFF',
        iconHover: '#5f6876',
        hover: '#5f6876',
        sideBar: '#1F1B24',
        tableHeader: '#433e47',
        tableRowOdd: '#202328',
        tableRowEven: '#22252a',
        link: '#FFFFFF'
    },
};