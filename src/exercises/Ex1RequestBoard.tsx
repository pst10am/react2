
import { useState } from "react";
import type { Request } from "../api";

const INITIAL: Request[] = [
    { id: "R1", part: "CELL-100", qty:600, status: "open" },
    { id: "R2", part: "MAG-300", qty:2, status: "delivered" },
    { id: "R3", part: "TIR-800", qty:4, status: "open" },
];

export default function Ex1RequestBoard() {

    const [requests, setRequests] = useState<Request[]>(INITIAL);
    const [filter, setFilter] = useState("");

    const openCount = requests.filter((r) => r.status === "open").length;
    const shown = requests.filter((r) => 
        r.part.toLowerCase().includes(filter.toLowerCase())
    );

    function markDelivered(id: string) {
        setRequests((prev) => 
            prev.map((r) => (r.id === id) ? { ...r, status: "delivered" as const } : r)
        );
    }

    return (
        <div>
            <p>Open: {openCount}</p>
            <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter by part" />
            <ul>
                {shown.map((r) => (
                    <li key={r.id}>
                        {r.part} x {r.qty} - {r.status}{" "}
                        {r.status === "open" && (
                            <button onClick={() => markDelivered(r.id)}>Mark delivered</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

}
