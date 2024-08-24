import Link from "next/link"

export default function Sidenav() {
    return (
        <div className="hidden md:flex flex-col w-96 h-full large-card flex-shrink-0 items-center justify-center gap-1">
            <Link href="/" className="w-full h-9 flex justify-center items-center text-sm font-bold text-outline">
                Homepage
            </Link>
            <Link href="/accordion" className="w-full h-9 flex justify-center items-center text-sm font-bold text-outline">
                Accordion
            </Link>
        </div>
    )
}