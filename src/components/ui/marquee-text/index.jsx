"use client";
import { useEffect, useRef, useState } from "react";

export default function MarqueeText({ name, className = "" }) {
	const containerRef = useRef(null);
	const textRef = useRef(null);
	const [scrollNeeded, setScrollNeeded] = useState(false);

	useEffect(() => {
		const containerWidth = containerRef.current.offsetWidth;
		const textWidth = textRef.current.scrollWidth;
		setScrollNeeded(textWidth > containerWidth);
	}, [name]);

	return (
		<div
			ref={containerRef}
			className={"w-[250px] overflow-hidden whitespace-nowrap relative " + className}
		>
			<span
				ref={textRef}
				style={{
					display: "inline-block",
					paddingRight: scrollNeeded ? "100%" : "0", // giver plads til looping
					animation: scrollNeeded ? "scrollText 16s linear 3s infinite" : "none",
				}}
			>
				{name}
			</span>

			<style jsx>{`
        @keyframes scrollText {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
		</div>
	);
}