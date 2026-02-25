import { useState, useEffect } from "react";

const useOnlineStatus = () => {
    const [status, setStatus] = useState(true);

    useEffect(() => {
        const handleOffline = () => setStatus(false);
        const handleOnline = () => setStatus(true);

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        return () => {
            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, []);

    return status;
};

export default useOnlineStatus;
