import { StateEntry } from "./StateEntry";
import { STATE_TYPE_PLAIN } from "./types";

// Represents a simple global state in the store, a simple state is just
// global named value, it has no special handling.
export class SimpleStateEntry<T extends any> extends StateEntry<T>
{
	constructor(key: string, initialState?: T) {
		super(STATE_TYPE_PLAIN, key);
		if (initialState) {
			this.update(initialState);
		}
	}	

	setState(newState: T) {
		this.update(newState);
	}
}