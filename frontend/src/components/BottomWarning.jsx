import { memo } from "react";
import { Link } from "react-router-dom";

export const BottomWarning = memo(function BottomWarning({
  label,
  bottomText,
  to,
}) {
  return (
    <div className="flex justify-center py-2 text-sm">
      <div>{label}</div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {bottomText}
      </Link>
    </div>
  );
});
