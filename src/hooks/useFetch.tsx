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
            const response = await fetch(url);
            const data: T[] = await response.json();
            if (response.ok) {
                setState({ ...state, items: data, loading: false  });
            } else {
                setState({ ...state, error: 'todo' });
            }
        })();
    }, []);

    return [
        state.loading,
        state.items,
        state.error
    ];
}