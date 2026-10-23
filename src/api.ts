
export type MaterialRequest = {
    id: string;
    part: string;
    qty: number;
    status: "open" | "delivered"
};

const DATA: MaterialRequest[] = [
    { id: "R1", part: "CELL-100", qty:600, status: "open" },
    { id: "R2", part: "MAG-300", qty:2, status: "delivered" },
    { id: "R3", part: "TIR-800", qty:4, status: "open" },
];

export function fetchRequests(): Promise<MaterialRequest[]> {
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
