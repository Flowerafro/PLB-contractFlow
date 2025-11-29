import { DetailViewRow } from "./DetailViewRow"
import { DetailViewSection } from "./DetailViewSection"
import { Field } from "../global/Field";

export default function DetailPrincipalInfo({form, setForm, isEditing}: {form?: any; setForm?: any; isEditing?: boolean}) {
    return (
         <DetailViewSection title="Principal info">
                    <DetailViewRow label="Principal Contract number">
                        <Field value={form.principalContractNumber} onChange={(v) => setForm({...form, principalContractNumber: v})} isEditing={isEditing} />
                    </DetailViewRow>
                    <DetailViewRow label="Principal Contract Date">
                        <Field value={form.principalContractDate} onChange={(v) => setForm({...form, principalContractDate: v})} isEditing={isEditing} />
                    </DetailViewRow>
                      <DetailViewRow label="Principal Order number">
                        <Field value={form.principalOrderNumber} onChange={(v) => setForm({...form, principalOrderNumber: v})} isEditing={isEditing} />
                    </DetailViewRow>
                </DetailViewSection>
    )
}