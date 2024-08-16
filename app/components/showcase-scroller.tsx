"use client";

import { motion, useTransform, useScroll, easeInOut } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";
import { data } from "../data/data";

export default function ShowcaseScroller() {
    const scrollerRef = useRef(null);

    return (
        <div 
            ref={scrollerRef}
            className="w-full bg-gradient-to-b from-primary-container to-surface h-80 rounded-3xl flex items-center px-16 gap-16 overflow-x-scroll relative snap-x snap-mandatory"
            style={{boxShadow: 'inset 1px 2px 16px -4px rgba(0,0,0,0.15)'}}
            >
                {data.map((item, index) => {
                    return <ScrollItem key={index} index={index} scrollerRef={scrollerRef} />
                })}
        </div>
    )
}

function ScrollItem({ scrollerRef, index } : { scrollerRef :  RefObject<HTMLElement>, index: number}) {
    const ref = useRef(null);
    const scrollHook = useScroll({
        target: ref,
        container: scrollerRef,
        offset: ["start 1.15", "end -0.15"],   
        axis: "x",
    })
    const yTransform = useTransform(scrollHook.scrollXProgress, [0, 0.5, 1], [24, -24, 24], {
        ease: easeInOut
    });
    const rotation = useTransform(scrollHook.scrollXProgress, [0, 1], [9, -9], {
        ease: easeInOut
    });
    
    const variants = {
        visible: (i: number) => ({
            scale: 1,
            transition: {
                delay: (i + 1) * 0.05,
            }
        })
    }

    return (
        <motion.div
            ref={ref}
            className="h-44 w-44 rounded-3xl bg-surface-variant elevation-medium flex-shrink-0 snap-center"
            
            custom={index}
            initial={{ scale: 0 }}
            animate="visible"
            variants={variants}

            style={{ y: yTransform, rotate: rotation }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            viewport={{ root: scrollerRef }}
            transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
        >
            <button className="w-full h-full rounded-3xl"></button>
        </motion.div>
    )
}


// whileInView={{ scale: 1 }}
// whileHover={{ scale: 1.02 }}
// whileTap={{ scale: 0.98, rotate: 0 }}