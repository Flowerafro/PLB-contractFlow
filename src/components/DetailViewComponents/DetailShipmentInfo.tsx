import { DetailViewRow } from "./DetailViewRow";
import { DetailViewSection } from "./DetailViewSection";
import { Field } from "../global/Field";


export default function DetailShipmentInfo({form, setForm, isEditing,}: {form?: any; setForm?: any; isEditing?: boolean}) {
    return (
        <DetailViewSection title="Shipment info">
            <DetailViewRow label="Container number">
                <Field value={form.containerNumber} onChange={(v) => setForm({...form, containerNumber: v})} isEditing={isEditing} />
            </DetailViewRow>

             <DetailViewRow label="Booking Number">
            <Field value={form.bookingNumber} onChange={(v) => setForm({...form, bookingNumber: v})} isEditing={isEditing} />
            </DetailViewRow>
            <DetailViewRow label="ETD">
                <Field value={form.etd} onChange={(v) => setForm({...form, etd: v})} isEditing={isEditing} />
            </DetailViewRow>

            <DetailViewRow label="ETA">
                <Field value={form.eta} onChange={(v) => setForm({...form, eta: v})} isEditing={isEditing} />
            </DetailViewRow>
        </DetailViewSection>
    )
}