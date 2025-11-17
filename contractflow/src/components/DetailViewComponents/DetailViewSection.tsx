
    interface DetailViewSectionProps {
    title: string;
    children: React.ReactNode;
}

export function DetailViewSection({ title, children }: DetailViewSectionProps) {
    return (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-2">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                <h3 className="font-semibold text-gray-700 tracking-wide text-sm">
                    {title}
                </h3>
            </div>

            <div className="divide-y divide-gray-200">
                {children}
            </div>
        </section>
    );
}
