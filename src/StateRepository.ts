import { IStore, Reducer, STATE_TYPE_COMPOSITE, STATE_TYPE_PLAIN, STATE_TYPE_REDUCED } from "./types";
import { StateEntry } from "./StateEntry";
import { ReducedStateEntry } from "./ReducedStateEntry";
import { SimpleStateEntry } from "./SimpleStateEntry";
import { CompositeStateEntry } from "./CompsiteStateEntry";

export class StateRepository implements IStore
{
	private states: Record<string, StateEntry<any>> ={};

	constructor() 
	{
		// If this is the first state repository, then hang it off the window
		// so it can be interrogated using the console.
		if (window && (typeof((window as any).PreactState) == "undefined")) {
			Object.defineProperty(window, "PreactState", {
				value: this,
				enumerable: true,
				writable: false,
				configurable: false,
			});
		}
	}

	compositeState<T extends {}>(key: string, initialState?: Partial<T>): CompositeStateEntry<T> 
	{
		let entry = this.states[key];
		if (!entry) {
			entry = new CompositeStateEntry(key, initialState);
			this.states[key] = entry;
		};
		
		entry.verifyType(STATE_TYPE_COMPOSITE);
		return (entry as CompositeStateEntry<T>);
	}
	
	// Get or create a reduced state entry
	reducedState<T extends any, A extends unknown = string>(key: string, reducer: Reducer<A, T>, state?: T): ReducedStateEntry<A, T> 
	{
		let entry = this.states[key];
		if (!entry) {
			entry = new ReducedStateEntry(key, reducer, state);
			this.states[key] = entry;
		}
		
		entry.verifyType(STATE_TYPE_REDUCED);
		return (entry as ReducedStateEntry<A, T>);
	}

	// Get or create a simple state entry
	simpleState<T extends any>(key: string, state?: T): SimpleStateEntry<T> 
	{
		let entry = this.states[key];
		if (!entry) {
			entry = new SimpleStateEntry<T>(key, state);
			this.states[key] = entry;
		}

		entry.verifyType(STATE_TYPE_PLAIN);
		return (entry as SimpleStateEntry<T>);
	}
}