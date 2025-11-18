import { DetailViewRow } from "./DetailViewRow"
import { DetailViewSection } from "./DetailViewSection"
import { Field } from "./Field"

export default function DetailInvoiceInfo({form, setForm, isEditing,}: {form?: any; setForm?: any; isEditing?: boolean}) {
    return (
        <DetailViewSection title="Invoice info">
            <DetailViewRow label="Invoice Number">
                <Field value={form.invoiceNumber} onChange={(v) => setForm({...form, invoiceNumber: v})} isEditing={isEditing} />
            </DetailViewRow>
            <DetailViewRow label="Invoice Amount">
                <Field value={form.invoiceAmount} onChange={(v) => setForm({...form, invoiceAmount: v})} isEditing={isEditing} />
            </DetailViewRow>
        </DetailViewSection>

    )
}