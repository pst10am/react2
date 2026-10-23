
import { useState } from "react";
import type { MaterialRequest } from "../api";

const INITIAL: MaterialRequest[] = [
    { id: "R1", part: "CELL-100", qty:600, status: "open" },
    { id: "R2", part: "MAG-300", qty:2, status: "delivered" },
    { id: "R3", part: "TIR-800", qty:4, status: "open" },
];

export default function Ex1RequestBoard() {

    const [requests, setRequests] = useState<MaterialRequest[]>(INITIAL);
    const [filter, setFilter] = useState("");

    let openCount = 0;
    for (const r of requests) {
        if (r.status === "open") {
            openCount += 1;
        }
    }

    const shown: MaterialRequest[] = [];
    const filter_text = filter.toLowerCase();
    for (const r of requests) {
        const part = r.part.toLowerCase();
        if (part.includes(filter_text)) {
            shown.push(r);
        }
    }

    function markDelivered(id: string) {
        setRequests(function(prev) {
            const next: MaterialRequest[] = [];
            for (const r of prev) {
                if (r.id === id) {
                    const updated_r: MaterialRequest = {
                        id: r.id,
                        part: r.part,
                        qty: r.qty,
                        status: "delivered",
                    };
                    next.push(updated_r)
                } else {
                    next.push(r);
                }
            }
            return next;
        });
    }

    function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFilter(e.target.value);
    }

    const rows = [];
    for (const r of shown) {
        let button = null;
        if (r.status === "open") {
            button = (
                <button onClick={function () { 
                    markDelivered(r.id); 
                }}>
                    Mark delivered
                </button>
            );
        }
        rows.push(
            <li key={r.id}>
                {r.part} x {r.qty} - {r.status} {button}
            </li>
        );
    }

    return (
        <div>
            <p>Open: {openCount}</p>
            <input value={filter} onChange={handleFilterChange} placeholder="Filter by part" />
            <ul>{rows}</ul>
        </div>
    );

}
