"use client";

import { motion, useTransform, useScroll, easeInOut, useMotionValueEvent } from "framer-motion";
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
                    return <ScrollItem key={index} index={index} image={item.thumbnail} name={item.name} scrollerRef={scrollerRef} />
                })}
        </div>
    )
}

function ScrollItem({ scrollerRef, index, image, name } : { scrollerRef :  RefObject<HTMLElement>, index: number, image: string, name: string }) {
    const ref = useRef(null);
    const { scrollXProgress } = useScroll({
        target: ref,
        container: scrollerRef,
        offset: ["start 1.15", "end -0.15"],   
        axis: "x",
    })
    const yTransform = useTransform(scrollXProgress, [0, 0.5, 1], [24, -24, 24], {
        ease: easeInOut
    });
    const rotation = useTransform(scrollXProgress, [0, 1], [9, -9], {
        ease: easeInOut
    });

    useMotionValueEvent(scrollXProgress, "change", (latest) => {
        console.log("Container scroll: ", latest)
    })
    
    const variants = {
        visible: (i: number) => ({
            scale: 1,
            transition: {
                // delay: (i + 1) * 0.05,
            }
        })
    }

    return (
        <motion.button
            ref={ref}
            className="h-28 w-28 md:h-56 md:w-56 rounded-3xl bg-surface-variant shadow-lg shadow-shadow-color-emphasized flex-shrink-0 snap-center overflow-hidden relative"
            
            custom={index}
            initial={{ scale: 0 }}
            animate="visible"
            variants={variants}

            style={{ y: yTransform, rotate: rotation }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            viewport={{ root: scrollerRef }}
            transition={{ type: "tween", ease: "circOut", duration: 0.15, delay: 0 }}
        >
            <div className="w-full h-full md:shadow-[inset_1px_2px_12px_-4px_rgb(var(--surface-container))]"></div>
            {/* <img src={image} alt={name} className="w-full h-full object-cover border rounded-3xl border-surface-variant" /> */}
            {/* <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-b from-transparent to-surface-variant scale-[1.01]"></div> */}
        </motion.button>
    )
}


// whileInView={{ scale: 1 }}
// whileHover={{ scale: 1.02 }}
// whileTap={{ scale: 0.98, rotate: 0 }}