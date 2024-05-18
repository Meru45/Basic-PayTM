import { memo } from "react";

export const Heading = memo(function Heading({ label }) {
  return <div className="font-bold text-4xl pt-6">{label}</div>;
});
