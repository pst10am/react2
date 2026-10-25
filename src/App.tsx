
import { useState } from "react";
import Ex1RequestBoard from "./exercises/Ex1RequestBoard";
import Ex2Fetch from "./exercises/Ex2Fetch";
import Ex3AddForm from "./exercises/Ex3AddForm";
import Ex4CRUDTable from "./exercises/Ex4CRUDTable";
import Ex5Components from "./exercises/Ex5Components";
import Ex6UseMemo from "./exercises/Ex6UseMemo";
import Ex7AutoRefresh from "./exercises/Ex7AutoRefresh";

const EXERCISES = [
  { id: "ex1", title: "1. Request board (state, filter)", comp: Ex1RequestBoard },
  { id: "ex2", title: "2. Fetch with loading & error", comp: Ex2Fetch },
  { id: "ex3", title: "3. Form", comp: Ex3AddForm },
  { id: "ex4", title: "4. CRUD Table", comp: Ex4CRUDTable },
  { id: "ex5", title: "5. Components", comp: Ex5Components },
  { id: "ex6", title: "6. UseMemo", comp: Ex6UseMemo },
  { id: "ex7", title: "7. AutoRefresh", comp: Ex7AutoRefresh },
];

export default function App() {
  const [current, setCurrent] = useState<string | null>(null);
  const ex = EXERCISES.find((e) => e.id === current);

  if (ex) {
    return (
      <div>
        <button onClick={() => setCurrent(null)}>Back</button>
        <h2>{ex.title}</h2>
        <ex.comp />
      </div>
    );
  }

  return (
    <div>
      <h1>React Practices</h1>
      <ul>
        {EXERCISES.map((e) => (
          <li key={e.id}>
            <button onClick={() => setCurrent(e.id)}>{e.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );

}