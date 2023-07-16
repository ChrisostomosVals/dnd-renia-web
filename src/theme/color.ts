export type ColorVariantType = 'light' | 'dark';

export type ColorType = {
    [key in ColorVariantType]: {
        [colorVal: string]: string;
    };
};

export const color: ColorType = {
    light: {
        backgroundColor: '#eeeae6',
        primary: '#6200ee',
        secondary: '#03dac6',
        text: '#000000',
        error: '#ff3333',
        buttonPrimary: '#10161B',
        buttonPrimaryText: '#FFFFFF',
        buttonSecondary: '#D2D3D3',
        buttonSecondaryText: '#FFFFFF',
        input: '#FFFFFF',
        box: `#FFFFFF`,
        border: '#202A33',
        header: '#6200ee',
        icon: '#FFFFFF',
        iconHover: '#018d80',
        hover: '#018d80',
        tableHeader: '#433e47',
        tableRowOdd: '#1f1b24',
        tableRowEven: '#121212',
        sideBar: '#9c00ff',
        link: '#FFFFFF'
    },
    dark: {
        backgroundColor: '#121212',
        primary: '#bb86fc',
        secondary: '#03dac6',
        text: '#FFFFFF',
        error: '#ff3333',
        buttonPrimary: '#c38fff',
        buttonPrimaryText: '#000000',
        buttonSecondary: '#D2D3D3',
        buttonSecondaryText: '#FFFFFF',
        input: '#332940',
        box: `#433e47`,
        border: '#202A33',
        header: '#433e47',
        icon: '#FFFFFF',
        iconHover: '#c38fff',
        hover: '#c38fff',
        sideBar: '#1F1B24',
        tableHeader: '#433e47',
        tableRowOdd: '#1f1b24',
        tableRowEven: '#121212',
        link: '#FFFFFF'
    },
};