import { StateEntry } from './StateEntry';
import { STATE_TYPE_PLAIN } from "./types";

describe("StateEntry", () => {

	it("Initial state is correct", () => {
		const entry = new StateEntry(STATE_TYPE_PLAIN, 'test-key');
		expect(entry.getType()).toEqual(STATE_TYPE_PLAIN);
		expect(entry.getKey()).toEqual('test-key');
		expect(entry.getState()).toBeUndefined();
	}),

	it("Can add a listener", () => {
		const entry =  new StateEntry(STATE_TYPE_PLAIN, "test-key");
		const fn = jest.fn();
		expect(entry.AddListener(fn)).not.toEqual(0);
	}),

	it("Can remove a listener", () => {
		const entry =  new StateEntry(STATE_TYPE_PLAIN, "test-key");
		const fn = jest.fn();
		const cookie = entry.AddListener(fn);
		expect(cookie).not.toEqual(0);
		expect(entry.RemoveListener(cookie)).toBeTruthy();
	}),

	it("Does not remove an invalid listener", () => {
		const entry =  new StateEntry(STATE_TYPE_PLAIN, "test-key");
		const fn = jest.fn();
		const cookie = entry.AddListener(fn);
		expect(cookie).not.toEqual(0);
		expect(entry.RemoveListener(27)).not.toBeTruthy();
	}),

	it("RemoveListener, succeeds when there are no listeners", () => {
		const entry =  new StateEntry(STATE_TYPE_PLAIN, "test-key");
		expect(entry.RemoveListener(27)).not.toBeTruthy();
	}),

	it("Fires a change when the state changes", () => {
		const entry =  new StateEntry(STATE_TYPE_PLAIN, "test-key");
		const fn = jest.fn();
		entry.AddListener(fn);
		entry.update(7);
		expect(fn).toHaveBeenCalledWith(7);
	}),

	it("Not to fire a change when the states are equal", () => {
		const entry =  new StateEntry(STATE_TYPE_PLAIN, "test-key");
		entry.update(7);
		const fn = jest.fn();
		entry.AddListener(fn);
		entry.update(7);
		expect(fn).not.toHaveBeenCalledWith(7);
	})

})