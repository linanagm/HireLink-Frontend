import React from "react";
import { cx } from "../../../utils/helpers.js";

export default function Badge({ variant = "slate", children }) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset";
  const styles = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    yellow: "bg-amber-50 text-amber-700 ring-amber-200",
    red: "bg-rose-50 text-rose-700 ring-rose-200",
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    fuchsia: "bg-fuchsia-50 text-fuchsia-800 ring-fuchsia-200",
  };
  return <span className={cx(base, styles[variant])}>{children}</span>;
}
