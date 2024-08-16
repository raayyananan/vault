"use client";

import { motion, useTransform, useScroll, easeInOut } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";
import { data } from "../data/data";

export default function ShowcaseScroller() {
    const scrollerRef = useRef(null);

    return (
        <div 
            ref={scrollerRef}
            className="w-full bg-gradient-to-b from-primary-container to-surface h-96 md:rounded-3xl flex items-center px-8 gap-8 md:px-16 md:gap-16 overflow-x-scroll relative snap-x snap-mandatory
                        md:shadow-[inset_1px_2px_12px_-4px_rgba(0,0,0,0.15)]"
            >
                {data.map((item, index) => {
                    return <ScrollItem key={index} index={index} scrollerRef={scrollerRef} />
                })}
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
        <motion.button
            ref={ref}
            className="h-28 w-28 md:h-56 md:w-56 rounded-3xl bg-surface-variant shadow-lg shadow-inherit flex-shrink-0 snap-center"
            
            custom={index}
            initial={{ scale: 0 }}
            animate="visible"
            variants={variants}

            style={{ y: yTransform, rotate: rotation }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            viewport={{ root: scrollerRef }}
            transition={{ type: "tween", ease: "circOut", duration: 0.15 }}
        >
            {/* <div className="w-full h-full md:shadow-[inset_1px_2px_12px_-4px_rgb(var(--surface-container))]"></div> */}
        </motion.button>
    )
}


// whileInView={{ scale: 1 }}
// whileHover={{ scale: 1.02 }}
// whileTap={{ scale: 0.98, rotate: 0 }}