
import { useState, useEffect } from "react";
import { fetchRequests } from "../api";
import type { MaterialRequest } from "../api";

export default function Ex7AutoRefresh() {

    const [requests, setRequests] = useState<MaterialRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lastAttempted, setLastAttempted] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    const [paused, setPaused] = useState<boolean>(false);

    async function load() {
        setLastAttempted(new Date().toLocaleTimeString());
        setLoading(true);
        setError(null);
        try {
            const data = await fetchRequests();
            setRequests(data);
            const lastUpd = new Date().toLocaleTimeString();
            setLastAttempted(lastUpd);
            setLastUpdated(lastUpd);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong!');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(function() {
        if (paused) {
            return;
        }
        load();
        const timerId = setInterval(function() {
            load();
        }, 5000);
        return function cleanup() {
            clearInterval(timerId);
        };
    }, [paused]);

    const rows = []
    for (const r of requests) {
        rows.push(
            <li key={r.id}>
                {r.part} x {r.qty} - {r.status}
            </li>
        );
    }

    function handlePauseClick() {
        setPaused(function(prev) {
            return !prev;
        });
    }

    const pauseBtTitle: string = paused ? "Un-Pause" : "Pause";

    if (loading && requests.length === 0) {
        return <p>Loading...</p>
    }

    let errTxt = <p>Check at: {lastAttempted}</p>;
    if (error != null) {
        errTxt = <p>Check at: {lastAttempted}<br/>Error: {error}</p>;
    }

    let list = <p>No requests.</p>;
    if (rows.length > 0) {
        list = <p>
            <div style={{ 
                "border": "1px solid white",
                "marginTop": "20px",
            }}>
                <p>Data As of: {lastUpdated}</p>
                <ul>{rows}</ul>
            </div>
        </p>;
    }

    return (
        <div>
            {errTxt}
            {list}
            <br/>
            <button onClick={handlePauseClick}>{pauseBtTitle}</button>
        </div>
    );
}