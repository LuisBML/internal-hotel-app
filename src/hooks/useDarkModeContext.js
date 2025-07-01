import { useContext } from "react";
import { DarkModeContext } from '../context/DarkModeContext'

// Custom hook to read the value out of the context
function useDarkModeContext() {
    const context = useContext(DarkModeContext);
    if (context === undefined) {
        throw new Error('DarkModeContext was used outside of DarkModeProvider');
    }

    return context;
}

export default useDarkModeContext;
