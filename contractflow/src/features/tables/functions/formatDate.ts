//    -Formatering av dato-

const dateCache = new Map<string, string>();

export default function formatDate(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) return '';
    
    const timestamp = date.getTime().toString();
    
    if (dateCache.has(timestamp)) {
        return dateCache.get(timestamp)!;
    }
    
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    const formatted = `${y}-${m}-${d}`;
    
    dateCache.set(timestamp, formatted);
    
    return formatted;
}