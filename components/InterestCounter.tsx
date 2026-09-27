"use client";

import { useEffect, useState } from "react";

export default function InterestCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/interest-count", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && typeof d?.count === "number") setCount(d.count);
      })
      .catch(() => {
        // fallback: stay null, show honest generic copy
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) {
    return (
      <div className="counter-pill" role="status">
        <span className="dot" aria-hidden />
        Be among the first to enquire about a premium saree look
      </div>
    );
  }

  return (
    <div className="counter-pill" role="status">
      <span className="dot" aria-hidden />
      {count}+ people are interested in a premium saree look
    </div>
  );
}
