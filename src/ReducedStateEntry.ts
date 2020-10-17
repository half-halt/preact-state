import { StateEntry } from "./StateEntry";
import { STATE_TYPE_REDUCED, Reducer } from "./types";

// Checks if the valus is a promise, and provides type narrowing
function isPromise(object: any): object is Promise<any> {
	return (object && (typeof(object.then) === "function"));
}

// Represents a simple global state in the store, a simple state is just
// global named value, it has no special handling.
export class ReducedStateEntry<A extends any, T extends any> extends StateEntry<T>
{
	private reducer: Reducer<A, T>;

	constructor(key: string, reducer: Reducer<A, T>, initialState?: any) {
		super(STATE_TYPE_REDUCED, key);
		this.reducer = reducer;
		this.update(initialState);
	}	

	Dispatch(action: A, payload?: T) {
		const oldState = this.getState();
		const newState = this.reducer(oldState, action, payload);
		if (isPromise(newState)) {
			newState.then((state: any) => this.update(state));
		} else {
			this.update(newState);
		}
	}
}