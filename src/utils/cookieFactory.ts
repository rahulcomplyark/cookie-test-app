export interface CookieOptions {
    name: string;
    value: string;
    days?: number;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
    path?: string;
}

export const CookieFactory = {
    set: (options: CookieOptions) => {
        let cookieString = `${encodeURIComponent(options.name)}=${encodeURIComponent(options.value)}`;

        if (options.days) {
            const date = new Date();
            date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000));
            cookieString += `; expires=${date.toUTCString()}`;
        }

        if (options.path) {
            cookieString += `; path=${options.path}`;
        } else {
            cookieString += `; path=/`;
        }

        if (options.secure) {
            cookieString += `; Secure`;
        }

        if (options.sameSite) {
            cookieString += `; SameSite=${options.sameSite}`;
        }

        document.cookie = cookieString;
        console.log(`[CookieFactory] Set cookie: ${options.name}`);
    },

    get: (name: string): string | null => {
        const nameEQ = encodeURIComponent(name) + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    },

    getAll: (): Record<string, string> => {
        const cookies: Record<string, string> = {};
        const ca = document.cookie.split(';');
        if (document.cookie === "") return cookies;

        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim();
            const separatorIndex = c.indexOf('=');
            if (separatorIndex > 0) {
                const key = decodeURIComponent(c.substring(0, separatorIndex));
                const value = decodeURIComponent(c.substring(separatorIndex + 1));
                cookies[key] = value;
            }
        }
        return cookies;
    },

    delete: (name: string, path: string = '/') => {
        document.cookie = `${encodeURIComponent(name)}=; Max-Age=-99999999; path=${path}`;
        console.log(`[CookieFactory] Deleted cookie: ${name}`);
    },

    deleteAll: () => {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            // Attempt to clear from current domain too if path mismatch
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        console.log('[CookieFactory] All cookies cleared');
    }
};
