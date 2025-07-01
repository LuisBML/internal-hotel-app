import { useEffect, useRef } from "react";

export function useOutsideClick(handler, capturingPhase = true) {
    const modalDOM = useRef();

    // Close modal window when clicking outside of it
    useEffect(
        function () {
            const handleClick = function (e) {
                // modalDOM.current is a dom element e.g. <div></div>
                if (modalDOM.current && !modalDOM.current.contains(e.target)) handler();
            };

            // if capturingPhase === true, the event will be handled in the capturing phase
            document.addEventListener('click', handleClick, capturingPhase);

            // clean up function
            return () => document.removeEventListener('click', handleClick, capturingPhase);
        },
        [handler, capturingPhase]
    );

    return modalDOM;
}