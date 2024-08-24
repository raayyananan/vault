import clsx from "clsx";
import { motion } from "framer-motion";

export default function Chip({ name, icon, onClick }: { name: React.ReactNode, icon: React.ReactNode, onClick?: any }) {
    return (
        <button
            onClick={onClick} 
            className={clsx(
                "h-8 flex-shrink-0 rounded-lg flex items-center gap-1.5 text-xs font-bold box-content px-2.5 bg-surface-container text-on-surface hover:brightness-[0.98]"
            )}>
            <div className="flex-shrink-0">
                {icon}
            </div>
            <div className="flex-shrink-0">
                {name}
            </div>
        </button>
    )
}