import { CompositeStateEntry } from './CompsiteStateEntry';
import { STATE_TYPE_COMPOSITE } from "./types";

interface State 
{
	one: string;
	two: number;
};

describe("CompositeStateEntry", () => {

	it("Initial state is correct", () => {
		const entry = new CompositeStateEntry<State>('test-key', { one: 'test' });
		expect(entry.getType()).toEqual(STATE_TYPE_COMPOSITE);
		expect(entry.getKey()).toEqual('test-key');
		expect(entry.getState()).toMatchObject({ one: 'test' });
	}),

	it("Correctly merges state", () => {
		const entry = new CompositeStateEntry<State>('test-key', { one: 'test' });
		entry.Set({ two:11 });
		expect(entry.getState()).toMatchObject({ one: 'test', two: 11 });
	})
})