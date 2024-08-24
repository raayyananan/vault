"use client";

import clsx from "clsx";
import React, { useContext, useRef, createContext, useState, Dispatch, SetStateAction, useEffect } from "react";
import styles from "./accordion.module.css";
import { motion } from "framer-motion";
import { title } from "process";
type AccordionContextType = {
    opened: number,
    setOpened: Dispatch<SetStateAction<number>>, // react [property, setProperty] function
    accordionRef: any
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

function useAccordion() {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("useAccordion must be used within an Accordion");
    }
    return context;
}


function AccordionRoot ({ children, className }: { children: React.ReactNode, className?: string }) {
    const [opened, setOpened] = useState(-1);
    const accordionRef = useRef(null);
    
    const Title = React.Children.toArray(children).find(
        child => React.isValidElement(child) &&  child.type === AccordionTitle
    )

    const content = React.Children.toArray(children).filter(
        child => React.isValidElement(child) &&  child.type !== AccordionTitle
    )
    
    return (
        <AccordionContext.Provider value={{ opened, setOpened, accordionRef }}>
            {opened !== -1 ? 
                <motion.div 
                    animate={{ opacity: [0, 1] }}
                    onClick={() => setOpened(-1)} 
                    className="fixed top-0 left-0 w-full h-full z-10 backdrop-blur bg-black/5"
                    >
                </motion.div> 
                : ''
                }
            <div 
                ref={accordionRef} 
                className={
                    `w-full accordion-container rounded-3xl`
                    }>

                <div 
                    className={`w-full min-h-[28rem] rounded-3xl elevation-medium accordion text-on-surface bg-surface-container pt-4 pb-4 flex flex-col gap-0.5 overflow-hidden md:overflow-visible
                                ${className}`}
                    style={{background: 'linear-gradient(to bottom, rgb(var(--surface-variant)) 0px, rgb(var(--surface-container)) 12px, rgb(var(--surface-container)) calc(100% - 12px), rgb(var(--surface-variant)) 100%)'}}
                    >

                    <div className="px-6 py items-center flex flex-col gap-3 overflow-hidden">
                        <h1 className="text-sm font-bold m-0 text-on-surface-variant">
                            {Title}
                        </h1>
                    </div>
                    <div className="h-0 w-full border-t-2 border-dotted border-surface-variant mt-2"></div>
                    <div className="flex-auto">
                        {content}
                    </div>
                    <div className="h-0 w-full border-t-2 border-dotted border-surface-variant mt-2"></div>

                </div>
            </div>
        </AccordionContext.Provider>
    )
}


function AccordionItem({ id, children, thumbnail, className }: { id: number, children: React.ReactNode, thumbnail: string, className?: string }) {
    const ref = useRef(null);
    const { opened, setOpened, accordionRef } = useAccordion();
    const isOpened = opened === id;

    const ItemTitle = React.Children.toArray(children).find(
        child => React.isValidElement(child) &&  child.type === AccordionItemTitle
    )
    const ItemSubTitle = React.Children.toArray(children).find(
        child => React.isValidElement(child) &&  child.type === AccordionItemSubtitle
    )
    const ItemContent = React.Children.toArray(children).find(
        child => React.isValidElement(child) &&  child.type === AccordionItemContent
    )


    function openItem() {
        setOpened(isOpened ? -1 : id);
    }

    useEffect(() => {
        if (ref.current === null || accordionRef.current === null) return;

        const refElement = ref.current as HTMLElement;
        const accordionElement = accordionRef.current as HTMLElement;

        if (opened === id) { // open
            refElement.style.height = accordionElement.clientHeight + 'px';
            const initialTranslation = -refElement.offsetTop + accordionElement.offsetTop;
            refElement.style.translate = `0 ${initialTranslation}px`;
        }
        else { // close
            refElement.style.height = '88px';
            refElement.style.translate = `0 0`;
        }
    }, [opened, id, ref, accordionRef]);

    return (
        <div className={`${styles.cont} h-22 flex flex-col items-center`}>
            <div
                ref={ref}
                className={clsx(
                    `flex flex-col z-0 relative rounded-3xl ${styles.transition} flex-shrink-0 overflow-hidden items-center box-content`,
                    isOpened ? `bg-surface-container-high z-20 ${styles.transition} md:w-full` : `h-22 bg-surface-container ${styles.itemClosed} w-full`,
                    className
                )}
                >
                
                {/* TRIGGER BUTTON */}
                <button
                        onClick={openItem}
                        className="w-full flex pl-4 pr-3 gap-3 rounded-3xl items-center text-left group focusable-border flex-shrink-0 h-22 select-none">

                    <img className={`${isOpened ? '-translate-x-24 mr-2' : ''} w-16 h-16 ${styles.transition} rounded-2xl object-cover`} src={thumbnail} alt="sample" />
                    <div className={`${isOpened ? '-translate-x-20' : ''} flex-auto justify-center ${styles.transition} flex flex-col overflow-hidden`}>
                        <h2 className="font-bold text-base">{ItemTitle}</h2>
                        <div className="overflow-hidden">
                            <p className="truncate text-ellipsis text-sm text-outline font-medium">{ItemSubTitle}</p>
                        </div>
                    </div>
                    <div className="w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center md:group-hover:bg-surface-container-highest group-focus-visible:bg-primary-container transition-color duration-200 relative">
                        <div className={`material-symbols-outlined transition-all duration-300 text-lg font-medium text-outlin absolute top-0 left-0 w-full h-full flex items-center justify-center ${!isOpened ? 'scale-0 -rotate-90' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-outline-variant" height="16px" viewBox="0 -960 960 960" width="16px"><path d="M440-440v240h-80v-160H200v-80h240Zm160-320v160h160v80H520v-240h80Z"/></svg>
                        </div>
                        <div className={`material-symbols-outlined transition-all duration-300 text-lg font-medium text-outlin absolute top-0 left-0 w-full h-full flex items-center justify-center ${isOpened ? 'scale-0 -rotate-90' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-outline-variant" height="16px" viewBox="0 -960 960 960" width="16px"><path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z"/></svg>
                        </div>
                    </div>
                </button>

                {/* INNER CONTENT - hidden */}
                <div className={clsx(
                        "inner-content flex transition-all duration-[150ms] pb-4 flex-auto overflow-hidden thin-vertical-scrollbar",
                        isOpened ? 'opacity-1' : 'opacity-0 blur-sm'
                    )}>

                    <div 
                        className="w-full h-full overflow-y-scroll overflow-x-hidden rounded-[2rem] transition box-border px-4 hide-scrollbar"
                        style={{maskImage: 'linear-gradient(to bottom, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)'}}
                        >
                        {ItemContent}
                    </div>
                </div>
            </div>
        </div>
    )
}

const AccordionTitle = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const AccordionItemTitle = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const AccordionItemSubtitle = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const AccordionItemContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const Accordion = {
    Root: AccordionRoot,
    Item: AccordionItem,
    Title: AccordionTitle,
    ItemTitle: AccordionItemTitle,
    ItemSubtitle: AccordionItemSubtitle,
    Content: AccordionItemContent
}

export default Accordion;
