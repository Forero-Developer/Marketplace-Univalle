import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light';

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') return;

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = () => {
    // Solo tema light, así que quitamos la clase 'dark'
    document.documentElement.classList.remove('dark');
};

export function initializeTheme() {
    applyTheme(); // No necesita argumento
}

export function useAppearance() {
    const [, setAppearance] = useState<Appearance>('light');

    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearance(mode);
        localStorage.setItem('appearance', mode);
        setCookie('appearance', mode);
        applyTheme(); // No necesita argumento
    }, []);

    useEffect(() => {
        updateAppearance('light');
    }, [updateAppearance]);

    return { updateAppearance } as const;
}
