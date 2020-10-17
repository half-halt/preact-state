import { StateRepository } from "./StateRepository";

describe("StateRepository", () => {

	it("Creates a new state", () => {
		const store = new StateRepository();
		const state = store.simpleState('test');
		expect(state).toBeDefined();
	}),

	it("Retrieves and existing start", () => {
		const store = new StateRepository();
		const state = store.simpleState('test');
		expect(state).toBeDefined();
		const state2 = store.simpleState('test');
		expect(state2).toEqual(state);
	}),

	it("Fails when a state's type changes", () => {
		const store = new StateRepository();
		store.simpleState('test');
		expect(() => store.compositeState('test')).toThrow();
	})
});