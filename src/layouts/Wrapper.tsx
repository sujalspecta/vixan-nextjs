"use client";

import { gsap } from "gsap";
import { useEffect, useLayoutEffect } from "react";

import DarkLight from "@/components/common/DarkLight";
import MouseMove from "@/components/common/MouseMove";
import ScrollToTop from "@/components/common/ScrollToTop";

import { usePathname } from "next/navigation";
import { animationCreate } from "@/utils/utils";

import animationTitle from "@/utils/animationTitle";
import { scrollSmother } from "@/utils/scrollSmother";
import buttonAnimation from "@/utils/buttonAnimation";

import {
	ScrollSmoother,
	ScrollToPlugin,
	ScrollTrigger,
	SplitText,
} from "@/plugins";

gsap.registerPlugin(
	ScrollSmoother,
	ScrollTrigger,
	ScrollToPlugin,
	SplitText
);

if (typeof window !== "undefined") {
	require("bootstrap/dist/js/bootstrap");
}

const Wrapper = ({ children }: any) => {
	const pathname = usePathname();

	// --------------------------------------------------
	// General animations
	// --------------------------------------------------
	useEffect(() => {
		const timer = setTimeout(() => {
			animationCreate();
		}, 100);

		return () => {
			clearTimeout(timer);
		};
	}, []);

	// --------------------------------------------------
	// ScrollSmoother
	// --------------------------------------------------
	useEffect(() => {
		if (typeof window === "undefined") return;

		const existingSmoother = ScrollSmoother.get();

		if (existingSmoother) {
			existingSmoother.kill();
		}

		const smoother = ScrollSmoother.create({
			smooth: 1.35,
			effects: true,
			smoothTouch: false,
			normalizeScroll: false,
			ignoreMobileResize: true,
		});

		return () => {
			smoother?.kill();
		};
	}, [pathname]);

	// --------------------------------------------------
	// Page animations
	// --------------------------------------------------
	useLayoutEffect(() => {
		if (typeof window === "undefined") return;

		const animationCleanup = animationTitle();

		buttonAnimation();
		scrollSmother();

		return () => {
			// Cleanup animationTitle
			if (typeof animationCleanup === "function") {
				animationCleanup();
			}

			// Remove ScrollTriggers belonging to the current page
			ScrollTrigger.getAll().forEach((trigger: any) => {
				trigger.kill();
			});
		};
	}, [pathname]);

	return (
		<>
			{children}

			<MouseMove />
			<DarkLight />
			<ScrollToTop />
		</>
	);
};

export default Wrapper;
