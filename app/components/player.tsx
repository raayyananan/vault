"use client";

import { useState } from "react";
import clsx from 'clsx';

export default function Player() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div 
            onClick={() => setExpanded(!expanded)}
            className={clsx(
                "sticky bottom-4 w-full h-16 flex-shrink-0 large-card player-card -translate-y-0.5 transition-all duration-500 easing-emphasized",
                expanded && "h-[calc(100%_-_1rem)]"
            )}
            >
        </div>
    )
}