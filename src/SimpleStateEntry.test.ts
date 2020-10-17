import { SimpleStateEntry } from './SimpleStateEntry';
import { STATE_TYPE_PLAIN } from "./types";

describe("SimpleStateEntry", () => {

	it("Initial state is correct", () => {
		const entry = new SimpleStateEntry('test-key', 11);
		expect(entry.getType()).toEqual(STATE_TYPE_PLAIN);
		expect(entry.getKey()).toEqual('test-key');
		expect(entry.getState()).toEqual(11);
	}),

	it("Fires a change when the state changes", () => {
		const entry = new SimpleStateEntry('test-key', 11);
		const fn = jest.fn();
		entry.AddListener(fn);
		entry.update(7);
		expect(fn).toHaveBeenCalledWith(7);
	})
})