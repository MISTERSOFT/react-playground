import { useEffect, useState } from "react";

type UseFetchResult<T> = {
    items: T[],
    loading: boolean,
    error: string
};

// https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar

/**
 * Fetch data from url API
 * @param url 
 * @returns data
 */
export function useFetch<T = any>(url: string): [boolean, T[], string] {
    const [state, setState] = useState<UseFetchResult<T>>({
        items: [],
        loading: true,
        error: ''
    });

    useEffect(() => {
        (async () => {
            setState(s => ({ ...s, items: [], loading: true  }));
            const response = await fetch(url);
            const data: T[] = await response.json();
            await wait(3);
            if (response.ok) {
                setState(s => ({ ...s, items: data, loading: false  }));
            } else {
                setState(s => ({ ...s, error: 'todo' }));
            }
        })();
    }, [url]);

    return [
        state.loading,
        state.items,
        state.error
    ];
}

function wait(second: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 1000 * second);
    });
}