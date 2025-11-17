
    interface DetailRowProps {
    label: string;
    children: React.ReactNode;
}

export function DetailViewRow({ label, children }: DetailRowProps) {
    return (
        <div className="grid grid-cols-2 gap-4 px-4 py-3">
            <div className="text-gray-600 text-sm">{label}</div>
            <div className="text-sm">{children}</div>
        </div>
    );
}
