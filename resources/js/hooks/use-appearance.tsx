import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light';

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = (appearance: Appearance) => {
    // Solo tema light, así que quitamos la clase 'dark'
    document.documentElement.classList.remove('dark');
};

export function initializeTheme() {
    // Siempre light, no hace falta leer localStorage
    applyTheme('light');
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('light');

    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearance(mode);

        localStorage.setItem('appearance', mode);
        setCookie('appearance', mode);

        applyTheme(mode);
    }, []);

    useEffect(() => {
        // Ignoramos localStorage, forzamos a 'light'
        updateAppearance('light');
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
}
