
import React, { useState } from "react";
import type { MaterialRequest } from "../api";

export default function Ex3AddForm() {

    const [requests, setRequests] = useState<MaterialRequest[]>([]);
    const [part, setPart] = useState<string>("");
    const [qtyText, setQtyText] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    function handlePartChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPart(e.target.value);
    }

    function handleQtyChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQtyText(e.target.value);
    }

    function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const trimmedPart = part.trim().toUpperCase();
        if (trimmedPart === "") {
            setError("Part is required");
            return;
        }

        const qty = Number(qtyText);
        if (!Number.isInteger(qty) || qty <= 0) {
            setError("Qty must be whole number greater than 0");
            return;
        }

        const newRequest: MaterialRequest = {
            id: "R" + Date.now(),
            part: trimmedPart,
            qty: qty,
            status: "open",
        };

        setRequests(function(prev) {
            const next: MaterialRequest[] = [];
            for (const r of prev) {
                next.push(r);
            }
            next.push(newRequest);
            return next;
        });

        setPart("");
        setQtyText("");
        setError(null);
    }

    const rows = [];
    for (const r of requests) {
        rows.push(
            <li key={r.id}>
                ({r.id}) {r.part} x {r.qty} - {r.status}
            </li>
        );
    }

    let errMsg = null;
    if (error !== null) {
        errMsg = <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="part">Part</label><br/>
                <input id="part" type="text" value={part} onChange={handlePartChange}></input><br/>
                <label htmlFor="qty">Qty</label><br/>
                <input id="qty" type="number" value={qtyText} onChange={handleQtyChange}></input><br/>
                <br/>
                <button type="submit">Add</button>
            </form>
            {errMsg}
            <ul>{rows}</ul>
        </div>
    );
}