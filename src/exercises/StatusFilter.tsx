
import type { StatusFilterProps } from "../types";

export default function StatusFilter(props: StatusFilterProps) {
    function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const v = e.target.value;
        if (v === "open") {
            props.onChange("open");
        } else if (v === "delivered") {
            props.onChange("delivered");
        } else if (v === "all") {
            props.onChange("all");
        }
    }

    return (
        <select value={props.value} onChange={handleChange}>
            <option value="all">All</option>
            <option value="open">Open</option>
            <option value="delivered">Delivered</option>
        </select>
    );
}

