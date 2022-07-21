import PropTypes from 'prop-types';
import Reducer, { initState } from './Reducer';
import { useReducer } from 'react';
import Context from './Context';
function Provider({ children, ...props }) {
    const [state, dispatch] = useReducer(Reducer, initState);
    return (
        <Context.Provider
            value={{
                ...props,
                reduce: [state, dispatch],
            }}
        >
            {children}
        </Context.Provider>
    );
}
PropTypes.propTypes = {
    children: PropTypes.node.isRequired,
    addRoute: PropTypes.string,
};
export default Provider;
