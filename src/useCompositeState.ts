import { stateContext } from "./Store";
import { useCallback, useContext, useEffect, useState } from "preact/hooks";

/**
 * Create or attaches to the a composite state with the specific name, a composite state
 * provides merging (like React's Component.setState). The initial state can be a 
 * partial definition of the state, however, in that case you should use the type argument
 * to provide the full type. 
 * 
 * @param key The key for the global state
 * @param initialState The initial state
 */
export function useCompositeState<T extends {}>(key: string, initialState?: Partial<T>)
{
	const store = useContext(stateContext);
	if (!store) {
		throw new Error("useCompositeState can only appear under a <Store/>");
	}

	const entry = store.compositeState(key, initialState);
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