import { ReducedStateEntry } from './ReducedStateEntry';
import { STATE_TYPE_REDUCED } from "./types";

describe("ReducedStateEntry", () => {

	it("Initial state is correct", () => {
		const reducer= jest.fn();
		const entry = new ReducedStateEntry('test-key', reducer, 11);
		expect(entry.getType()).toEqual(STATE_TYPE_REDUCED);
		expect(entry.getKey()).toEqual('test-key');
		expect(entry.getState()).toEqual(11);
	}),

	it("Calls the reducer on Dispatch", () => {
		const reducer = jest.fn();
		const entry = new ReducedStateEntry('test-key', reducer, "state1");
		reducer.mockReturnValue("state2");
		entry.Dispatch("state2");
		expect(reducer).toHaveBeenLastCalledWith("state1", "state2", undefined);
		expect(entry.getState()).toEqual("state2");
	}),

	it("Handles async reducers", () => {
		const reducer = jest.fn();
		reducer.mockResolvedValue("state3");
		const entry = new ReducedStateEntry('test-key', reducer, "state1");
		entry.Dispatch("state3");
		expect(reducer).toHaveBeenLastCalledWith("state1", "state3", undefined);
	})	
})