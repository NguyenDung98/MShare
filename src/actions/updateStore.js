import store from "../store";

export const MODE = {
	UPDATE: 1,
	ADD: 2,
	REMOVE: 3,
};

export const updateState = (payload, stateName, mode) => {
	const state = store.getState();

	switch (mode) {
		case MODE.UPDATE:
			store.setState({
				[stateName]: payload
			});
			break;
		case MODE.ADD:
			if (Array.isArray(payload)) {
				store.setState({
					[stateName]: [...state[stateName], ...payload]
				});
			} else {
				store.setState({
					[stateName]: [...state[stateName], payload]
				});
			}
			break;
		case MODE.REMOVE:
			store.setState({
				[stateName]: state[stateName].filter(item => item !== payload)
			});
			break;
		default:

	}
};
