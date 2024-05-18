import { memo } from "react";

export const InputBox = memo(function InputBox({
  label,
  placeholder,
  ...rest
}) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        {...rest}
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded"
      />
    </div>
  );
});
