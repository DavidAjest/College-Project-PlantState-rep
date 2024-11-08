import { useState } from 'react';
import './Spinner.css'
import React from 'react';
const SpinnerContext = React.createContext(null)
export const SpinnerProvier = ({ children }) => {
    const [loading, setLoading] = useState(false)
    return <SpinnerContext.Provider value={{ loading, setLoading }}>
        {children}
    </SpinnerContext.Provider>
}
export const useSpinner = () => {
    const context = React.useContext(SpinnerContext)
    if (!context) {
        throw new Error("Spinner context not provided")
    }
    return context
}


function Spinner() {
    const { loading } = useSpinner()
    return (<div className={`spinner ${loading ? "loading" : 'idle'}`}></div>);
}
export default Spinner;