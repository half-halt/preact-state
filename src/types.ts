import { SimpleStateEntry } from "./SimpleStateEntry";
import { ReducedStateEntry } from "./ReducedStateEntry";
import { CompositeStateEntry } from "./CompsiteStateEntry"

// Constants for State Types
export const STATE_TYPE_PLAIN = "state-type-plain";
export const STATE_TYPE_COMPOSITE = "state-type-composite";
export const STATE_TYPE_REDUCED = "state-type-reduced";

// Other types
export type StateType = string;
export type Cookie = number;
export type Reducer<A extends any, T extends any> = (state: T, action: A, payload?: any) => (T | Promise<T>);
export type ChangeCallback<T extends any> = (state: T) => void;

// Store type
export interface IStore
{
	compositeState<T extends {}>(key: string, initialState?: Partial<T>): CompositeStateEntry<T>;
	reducedState<T extends any, A extends any = string,>(key: string, reducer: Reducer<A, T>, state?: T): ReducedStateEntry<A,T>;
	simpleState<T extends any>(key: string, state?: T): SimpleStateEntry<T>;
}