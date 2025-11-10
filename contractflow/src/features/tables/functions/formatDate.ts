//    -Formattering for datoer hentet fra database/data-
//    Relevant for å bevare Date typen med god presentasjon

export default function formatDate(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) return '';
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
}