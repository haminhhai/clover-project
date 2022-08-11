import { createContext } from "react";


const Context = createContext();

export default Context;

export const ContextProvider = ({
    name,
    setName,
    children,
}) => {
    return (
        <Context.Provider
            value={{
                name,
                setName,
            }}
        >
            {children}
        </Context.Provider>
    );
};
