
export type Request = {
    id: string;
    part: string;
    qty: number;
    status: "open" | "delivered"
}

const DATA: Request[] = [
    { id: "R1", part: "CELL-100", qty:600, status: "open" },
    { id: "R2", part: "MAG-300", qty:2, status: "delivered" },
    { id: "R3", part: "TIR-800", qty:4, status: "open" },
];

export function fetchRequests(): Promise<Request[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.3) {
                reject(new Error("Network error"));
            } else {
                resolve(DATA);
            }
        }, 1000)
    });
}
