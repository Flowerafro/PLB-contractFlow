import { useCallback, useState } from "react";

export default function useHoverEffect<T>() {
    const [hoverEffect, setHoverEffect] = useState<T | null>(null);

    const onHover = useCallback((id: T) => setHoverEffect(id), []);
    const onLeave = useCallback(() => setHoverEffect(null), []);

    return {
        hoverEffect,
        onHover,
        onLeave
    };
}