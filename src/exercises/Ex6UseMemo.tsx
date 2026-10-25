
import { useState, useEffect, useMemo } from "react";
import type { MaterialRequest } from "../api";
import { fetchRequests } from "../api";
import type { Status } from "../types";
import StatusFilter from "./StatusFilter";
import RequestTable from "./RequestTable";

export default function Ex6UseMemo() {

    const [ status, setStatus ] = useState<Status>("all");
    const [ requests, setRequests ] = useState<MaterialRequest[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);

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

    const shown = useMemo(
        function() {
            const filtered: MaterialRequest[] = []
            for (const r of requests) {
                if (status === "delivered" && r.status !== status) {
                    continue;
                }
                if (status === "open" && r.status !== status) {
                    continue;
                }
                filtered.push(r);
            }
            return filtered
        }
    , [requests, status]);

    function handleStatusChange(value: Status) {
        setStatus(value);
    }

    function handleMarkDelivered(id: string) {
        setRequests(function(prev) {
            const next: MaterialRequest[] = [];
            for (const r of prev) {
                if (r.id === id) {
                    const updR:MaterialRequest = {
                        id: r.id,
                        part: r.part,
                        qty: r.qty,
                        status: "delivered",
                    }
                    next.push(updR);
                } else {
                    next.push(r);
                }
            }
            return next;
        });
    }

    /*
    const shown: MaterialRequest[] = [];
    for (const r of requests) {
        if (status === "delivered" && r.status !== status) {
            continue;
        }
        if (status === "open" && r.status !== status) {
            continue;
        }
        shown.push(r);
    }
    */

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error !== null) {
        return (
            <div>
                <p>Error: {error}</p>
                <button onClick={function () { load(); }}>Retry</button>
            </div>
        );
    }

    if (requests.length === 0) {
        return <p>No requests.</p>;
    }

    return (
        <div>
            <StatusFilter value={status} onChange={handleStatusChange}/>
            <p>Filter: {status}</p>
            <br/>
            <RequestTable requests={shown} onMarkDelivered={handleMarkDelivered}/>
        </div>
    );
}
