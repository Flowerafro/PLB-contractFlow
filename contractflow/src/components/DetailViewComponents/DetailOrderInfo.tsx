import { DetailViewSection } from "./DetailViewSection";
import { DetailViewRow } from "./DetailViewRow";
import { Field } from "./Field";

export default function DetailOrderInfo({form, setForm, isEditing,}: {form?: any; setForm?: any; isEditing?: boolean }) {
return (
        <DetailViewSection title="Order info">
            <DetailViewRow label="customer">
                <Field value={form.customer} onChange={(v) => setForm({...form, customer: v})} isEditing={isEditing} />
            </DetailViewRow>
             <DetailViewRow label="Customer Order Number">
            <Field value={form.customerOrderNumber} onChange={(v) => setForm({...form, customerOrderNumber: v})} isEditing={isEditing} />
            </DetailViewRow>

            <DetailViewRow label="Product">
                <Field value={form.product} onChange={(v) => setForm({...form, product: v})} isEditing={isEditing} />
            </DetailViewRow>
        </DetailViewSection>
    )
}