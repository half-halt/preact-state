import { StateEntry } from "./StateEntry";
import { STATE_TYPE_COMPOSITE } from "./types";

// Represents a composite state entry, which composites state, meaning 
// the state is addative.
export class CompositeStateEntry<T extends {}> extends StateEntry<T>
{
	// Constructor
	constructor(key: string, initialState?: Partial<T>) 
	{
		super(STATE_TYPE_COMPOSITE, key);
		this.update(initialState as T);
	}	

	// Handling merging the changes into the current state, provides an abstraction
	// in case object.assign() doesn't exist.
	private mergeState(current: Partial<T>, changes: Partial<T>): Partial<T>
	{
		// If Object.assign exists, we can simply use it.
		if (typeof(Object.assign) === "function") {
			return Object.assign({}, current, changes);
		}

		// Handle the merge ourself as we don't have object.assign
		// to do the work for us.
		var state = Object(current);
		for (let property in changes) {
			if (Object.prototype.hasOwnProperty.call(changes, property)) {
				state[property] = changes[property];
			}
		}

		return state;
	}

	// Modify the state, by merging the argument into the new state
	Set(state: Partial<T>) 
	{
		const oldState = this.getState();
		const newState = this.mergeState(oldState, state);
		this.update(newState as T);
	}

	// Replace the entire state value
	Replace(state: T)
	{
		this.update(state);
	}
}