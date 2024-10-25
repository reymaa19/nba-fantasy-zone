import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const Card = ({ title, children, position, selected, src, onClick }) => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative h-[30rem] relative"
            onClick={onClick}
        >
            <AnimatePresence>
                {(hovered || selected) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full absolute inset-0 cursor-pointer"
                    >
                        {children}
                        {src && (
                            <img
                                src={src}
                                alt={title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="relative z-20">
                <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center cursor-pointer">
                    {position}
                </div>
            </div>
        </div>
    );
};

export default Card;