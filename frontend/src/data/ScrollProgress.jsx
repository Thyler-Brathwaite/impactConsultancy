import { motion, useScroll } from "motion/react"

export default function ScrollProgress() {

    const { scrollYProgress } = useScroll()

    return (
        <motion.div
            style={{
                scaleX: scrollYProgress,
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "5px",
                transformOrigin: "0%",
                backgroundColor: "#5b3a91",
                zIndex: 9999
            }}
        />
    )
}