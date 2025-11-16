

export function InputWithLabel({value, onChange, label, type = "text", name, id, required = false}: {value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; label: string; type?: string; name: string; id: string; required?: boolean}) {

    const inputStyle = "flex-1 p-2 border-2 border-(--search-border) rounded-md w-full"
    const labelStyle = "sr-only"


    return (
        <div className="">
            <input value={value} type={type} name={name} id={id} onChange={onChange} className={inputStyle} placeholder=" " required={required} />
            <label htmlFor={id} className={labelStyle}>{label}</label>
        </div>
    )

}