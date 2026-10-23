
import { useState, useEffect } from "react";
import { fetchRequests } from "../api";
import type { MaterialRequest } from "../api";

export default function Ex2Fetch() {

    const [requests, setRequests] = useState<MaterialRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function load() {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchRequests();
            setRequests(data);
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
        load();
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error != null) {
        return (
            <div>
                <p>Error: {error}</p>
                <button onClick={function () { load(); }}>Retry</button>
            </div>
        );
    }

    if (requests.length === 0) {
        return <p>No requests.</p>
    }

    const rows = []
    for (const r of requests) {
        rows.push(
            <li key={r.id}>
                {r.part} x {r.qty} - {r.status}
            </li>
        );
    }

    return <ul>{rows}</ul>;
}
