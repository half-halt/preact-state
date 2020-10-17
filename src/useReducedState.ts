import { stateContext } from "./Store";
import { useCallback, useContext, useEffect, useState } from "preact/hooks";
import { Reducer } from "./types";

/**
 * Create or attaches to a state which is managed by a reducer.  This returns the state
 * and a function to dispatch to the reducer.  The reducer can be an asycnhrouns function 
 * or a function that returns a promise.
 * 
 * @param key  The name of the state
 * @param reducer The reducer for your state
 * @param initialState The initial state 
 */
export function useReducedState<A extends any, T extends any>(key: string, reducer: Reducer<A, T>, initialState?: T)
{
	const store = useContext(stateContext);
	if (!store) {
		throw new Error("useCompositeState can only appear under a <Store/>");
	}

	const entry = store.reducedState(key, reducer, initialState);
	const [state, setState] = useState<T>(entry.getState());

	useEffect(() => {
		const cookie = entry.AddListener(setState);
		return () => entry.RemoveListener(cookie);
	}, [key]);

	const set = useCallback(
		(state: Partial<T>) => {
			entry.update((state as T));
		}, []);

	return [state, set];
}