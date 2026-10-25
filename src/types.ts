
import type { MaterialRequest } from "./api";

export type Status = "all" | "open" | "delivered";

export type StatusFilterProps = {
    value: Status;
    onChange: (value: Status) => void;
};

export type RequestTableProps = {
    requests: MaterialRequest[];
    onMarkDelivered: (id: string) => void;
}
