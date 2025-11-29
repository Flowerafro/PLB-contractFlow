"use client";

import { Controller } from "react-hook-form";
import CreateContractButton from "../buttons/CreateContractButton";

export default function CreateContractCard({
  control,
  errors,
  onSubmit,
  loading,
  clients,
  fields,
}: any) {
  return (
    <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-md">
      <h2 className="text-2xl font-bold text-black mb-8">Create Contract</h2>

      <form onSubmit={onSubmit} className="grid gap-4">

        <LabeledField label="Choose client" error={errors.client?.message}>
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">----</option>
                {clients.map((c: any) => (
                  <option key={c.id} value={c.customerCode}>
                    {c.customer}
                  </option>
                ))}
              </select>
            )}
          />
        </LabeledField>

        {fields.map((f: any) => (
          <TextInput
            key={f.name}
            control={control}
            name={f.name}
            label={f.label}
            type={f.type}
            error={errors[f.name]?.message}
          />
        ))}
        <div className="flex gap-2">
          <TextInput control={control} name="startDate" label="Start date" error={errors.startDate?.message} />
          <TextInput control={control} name="stopDate" label="Stop date" error={errors.stopDate?.message} />
        </div>

        <LabeledField label="Terms and conditions" error={errors.terms?.message}>
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full h-32 p-2 border border-gray-300 rounded"
              />
            )}
          />
        </LabeledField>

        <CreateContractButton loading={loading} label="Create Contract" />
      </form>
    </div>
  );
}

function LabeledField({ label, error, children }: any) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      {children}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}

function TextInput({ control, name, label, type = "text", error }: any) {
  return (
    <LabeledField label={label} error={error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            className="w-full p-2 border border-gray-300 rounded"
          />
        )}
      />
    </LabeledField>
  );
}
