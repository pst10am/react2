
import React from "react";
import { useEffect, useState } from "react";
import { fetchRequests } from "../api";
import type { MaterialRequest } from "../api";

type Status = "open" | "delivered";

export default function Ex4CRUDTable() {

    // data + loading
    const [requests, setRequests] = useState<MaterialRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // editing
    const [editId, setEditId] = useState<string | null>(null);
    const [qtyText, setQtyText] = useState<string>("");
    const [statusText, setStatusText] = useState<Status>("open");
    const [formError, setFormError] = useState<string | null>(null);

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

    // action
    function startEdit(r: MaterialRequest) {
        setEditId(r.id);
        setQtyText(String(r.qty));
        setStatusText(r.status);
        setFormError(null);
    }

    function cancelEdit() {
        setEditId(null);
        setFormError(null);
    }

    function handleDelete(id: string) {
        if (editId === id) {
            return;
        }
        setRequests(function(prev) {
            const next: MaterialRequest[] = [];
            for (const r of prev) {
                if (id !== r.id) {
                    next.push(r);
                }
            }
            return next;
        });
    }

    function handleSave(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        const qty = Number(qtyText);
        if (!Number.isInteger(qty) || qty <= 0) {
            setFormError("Qty must be a whole number greater than 0");
            return;
        }

        setRequests(function(prev) {
            const next: MaterialRequest[] = [];
            for (const r of prev) {
                if (r.id === editId) {
                    const updatedR: MaterialRequest = {
                        id: r.id,
                        part: r.part,
                        qty: qty,
                        status: statusText,
                    };
                    next.push(updatedR);
                } else {
                    next.push(r);
                }
            }
            return next;
        });

        setEditId(null);
        setFormError(null);
    }

    function handleQtyChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQtyText(e.target.value);
    }

    function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value === "open") {
            setStatusText("open");
        }
        if (e.target.value === "delivered") {
            setStatusText("delivered");
        }
    }

    // screen
    if (loading) {
        return <p>Loading...</p>
    }

    if (error !== null) {
        return (
            <div>
                <p>Error: {error}</p>
                <button onClick={function () { load(); }}>Retry</button>
            </div>
        );
    }

    let editingPart = "";
    const rows = [];
    for (const r of requests) {
        const isEditing = r.id === editId;
        if (isEditing) {
            editingPart = r.part;
        }
        rows.push(
            <tr key={r.id}>
                <td>{r.part}</td>
                <td>{r.qty}</td>
                <td>{r.status}</td>
                <td><button onClick={function() { startEdit(r); }}>Edit</button></td>
                <td>
                    <button disabled={isEditing} onClick={function() { handleDelete(r.id); }}>Delete</button>
                </td>
            </tr>
        );
    }

    let tableMatReq = <p>No Materials</p>
    if (requests.length > 0) {
        tableMatReq = (
            <table>
                <thead>
                    <tr>
                        <th>Part</th>
                        <th>Qty</th>
                        <th>Status</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

    let editForm = null;
    if (editId !== null) {
        let formErrMsg = null;
        if (formError !== null) {
            formErrMsg = <p style={{ color: "red" }}>{formError}</p>;
        }
        editForm = (
            <div>
                <form onSubmit={handleSave}>
                    <p>Editing {editId}</p>
                    <label>Part: {editingPart}</label><br/>
                    <label htmlFor="qty">Qty</label><br/>
                    <input id="qty" type="number" value={qtyText} onChange={handleQtyChange}/><br/>
                    <label htmlFor="status">Status</label><br/>
                    <select id="status" value={statusText} onChange={handleStatusChange}>
                        <option value="open">Open</option>
                        <option value="delivered">Delivered</option>
                    </select>
                    <br/>
                    <button type="submit">Save</button>
                    {" "}
                    <button type="button" onClick={cancelEdit}>Cancel</button>
                    {formErrMsg}
                </form>
            </div>
        );
    }

    return (
        <div>
            {editForm}
            {tableMatReq}
        </div>
    );
}