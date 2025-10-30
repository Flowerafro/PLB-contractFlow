"use client"

interface ClientSearchItem {
  id: number;
  name?: string;
  customer?: string;
  contactperson?: string;
  title?: string;
  email?: string;
  phone?: string;
  country?: string;
    clientAdded?: string;
}

export default function ClientCard({ client }: { client: ClientSearchItem }) {
    return (
       <article className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-[--bg-color] dark:border-[--border-color]">
        <div className="flex justify-end px-4 pt-4">
        </div>
        <div className="flex flex-col items-center pb-10">
            <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="#" alt="profile image"/>
            <h5 className="mb-1 text-xl font-medium text-[var(--text-color-gray-dark)] dark:text-white">{client.name}</h5>
            <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">{client.title}</p>
            <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">{client.email}</p>
            <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">{client.phone}</p>
            <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">{client.country}</p>
            <p className="text-sm text-[var(--text-color-gray)] dark:text-[var(--text-color-gray)]">{client.clientAdded}</p>

            <div className="flex mt-4 md:mt-6">
                <a href={`/clients/${client.id}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[var(--btn-color-3)] rounded-lg hover:bg-[var(--btn-color-4)] hover:text-black focus:ring-4 focus:outline-none focus:ring-[var(--btn-color-4)] dark:bg-[var(--btn-color-3)] dark:hover:bg-[var(--btn-color-4)] dark:focus:ring-green-800">Open</a>
            </div>
        </div>
</article>
    );
}