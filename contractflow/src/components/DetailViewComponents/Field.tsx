"use client";

interface FieldProps {
    value: string | number;
    onChange: (v: string) => void;
    isEditing?: boolean;
}

export function Field({ value, onChange, isEditing}: FieldProps) {
   if (!isEditing) {
    return <span>{value}</span>;
  }

  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border px-2 py-1 rounded w-full"
    />
  );
}