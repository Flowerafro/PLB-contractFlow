//    -Optimized date formatting with memoization-
//    Caches formatted dates to prevent redundant processing

const dateCache = new Map<string, string>();

export default function formatDate(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) return '';
    
    // ✅ Use timestamp as cache key for memoization
    const timestamp = date.getTime().toString();
    
    if (dateCache.has(timestamp)) {
        return dateCache.get(timestamp)!;
    }
    
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    const formatted = `${y}-${m}-${d}`;
    
    // ✅ Cache the result to avoid recalculation
    dateCache.set(timestamp, formatted);
    
    return formatted;
}