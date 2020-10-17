import { stateContext } from "./Store";
import { useCallback, useContext, useEffect, useState } from "preact/hooks";

/**
 * Creates or attaches a global state that is a simple state, meaning the
 * value is just saved and retrieved.
 * 
 * @param key The name of the state
 * @param initialState The initial value of the state
 */
export function useSimpleState<T extends any>(key: string, initialState?: T)
{
	const store = useContext(stateContext);
	if (!store) {
		throw new Error("useSimpleState can only appear under a <Store/>");
	}

	const entry = store.simpleState(key, initialState);
	const [state, setState] = useState<T>(entry.getState());

	useEffect(() => {
		const cookie = entry.AddListener(setState);
		return () => entry.RemoveListener(cookie);
	}, [key]);

	const set = useCallback(
		(state: T) => {
			entry.update(state);
		}, []);

	return [state, set];
}