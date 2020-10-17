import { h, FunctionComponent, createContext } from "preact";
import { useState } from "preact/hooks";
import { StateRepository } from "./StateRepository";
import { IStore } from "./types";

export const stateContext = createContext<IStore|undefined>(undefined);
//export { h as _tomakeparcelhappy };

/**
 * Provides a store all of the child components, likely, you just want to wrap
 * your application in one.
 * 
 * Example:
 * 	render(
 * 		<Store>
 * 			<App/>
 * 		</Store>, 
 *	document.body)
 */
export const Store: FunctionComponent = ({ 
	children 
}) => {
	const [store] = useState(new StateRepository());
	return <stateContext.Provider value={store} children={children}/>
}
