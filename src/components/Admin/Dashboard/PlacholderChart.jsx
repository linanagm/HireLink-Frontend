import React from "react";
import Badge from "./Badge";

export default function PlaceholderChart({ type = "line" }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-600">
          {type === "line" ? "User Growth" : "Activity Stats"}
        </span>
        <Badge variant="fuchsia">Mock</Badge>
      </div>
      <div className="h-32 w-full rounded-lg bg-gradient-to-b from-fuchsia-100 to-slate-100 ring-1 ring-slate-200" />
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-slate-500">
        <span>Week 1</span>
        <span className="text-center">Week 2</span>
        <span className="text-right">Week 3</span>
      </div>
    </div>
  );
}
