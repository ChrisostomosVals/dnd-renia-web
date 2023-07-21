type LocalStorageKey = 'characters' | 'locations' | 'worldObjects' | 'races' | 'classes';
export const getParsedLocalStorageItem = <T>(key: LocalStorageKey): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T: null;
};

export const removLocalStorageItems = (items: string[]) => {
    items.forEach(item => {
        localStorage.removeItem(item);
    })
}