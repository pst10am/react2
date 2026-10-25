
import type { RequestTableProps } from "../types";

export default function RequestTable(props: RequestTableProps) {
    const rows = [];
    for (const r of props.requests) {
        let button = null;
        if (r.status === "open") {
            button = (
                <button onClick={function() { props.onMarkDelivered(r.id); }}>
                    Mark delivered
                </button>
            );
        }
        rows.push(
            <tr key={r.id}>
                <td>{r.part}</td>
                <td>{r.qty}</td>
                <td>{r.status}</td>
                <td>{button}</td>
            </tr>
        );
    }

    if (rows.length === 0) {
        return <p>No requests.</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Part</th>
                    <th>Qty</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}
