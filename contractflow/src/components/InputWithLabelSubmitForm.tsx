

export function InputWithLabelSubmitForm({value, onChange, label, type = "text", name, id, required = false}: {value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; label: string; type?: string; name: string; id: string; required?: boolean}) {

    const inputStyling = "block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
    const labelStyling = "absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"

    return (
        <fieldset className="relative z-0 w-full px-6 mb-6 group">
            <input value={value} type={type} name={name} id={id} onChange={onChange} className={inputStyling} placeholder=" " required={required} />
            <label htmlFor={id} className={labelStyling}>{label}</label>
        </fieldset>
    )

}