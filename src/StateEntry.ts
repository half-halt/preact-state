import { StateType, Cookie } from "./types";

type CallbackEntry = {
	cookie: number,
	callback: CallableFunction,
};

export class StateEntry<T extends any>
{
	private type: StateType;
	private key: string;
	private next: number = 1;
	private state: T|undefined;
	private callbacks?: Array<CallbackEntry>;

	constructor(type: StateType, key: string) {
		this.type = type;
		this.key = key;
	}

	public getKey() {
		return this.key;
	}

	public getType() {
		return this.type;
	}

	public getState() {
		return (this.state as T);
	}

	public verifyType(type: StateType)
	{
		if (this.type !== type) {
			throw new Error(`The expected type '${String(type)}' does not match the existing '${String(this.type)} of '${this.key}'`);
		}
	}

	public AddListener(callback: CallableFunction): Cookie {
		if (typeof(callback) !== "function") {
			throw new TypeError(`The callback must be a function got '${typeof(callback)} instead`);
		}

		if (!Array.isArray(this.callbacks)) {
			this.callbacks = [];
		}

		const entry = {
			cookie: this.next++,
			callback,
		};

		this.callbacks.push(entry);
		return entry.cookie;
	}

	public RemoveListener(cookie: Cookie) {
		if (Array.isArray(this.callbacks)) {
			const length = this.callbacks.length;
			this.callbacks = this.callbacks.filter(entry => entry.cookie !== cookie);
			return (length != this.callbacks.length);
		}
		return false;
	}

	public update(newState: T) {
		if (newState !== this.state) {
			this.state = newState;
			if (Array.isArray(this.callbacks)) {
				this.callbacks.forEach(entry => {
					if (typeof(entry.callback) === "function") {
						entry.callback(newState);
					}
				})
			}
		}
	}
}
