"use client";

import HeaderTitle from "@/components/typography/header-title";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuChevronLeft, LuSearch } from "react-icons/lu";

export default function CommonHeader({ transparent = false }) {
	const pathname = usePathname();
	const [title, setTitle] = useState("");
	const router = useRouter();

	useEffect(function () {
		switch (true) {
			case pathname === "/":
				setTitle("Featured")
				break;
			case pathname === "/categories":
				setTitle("Categories");
				break;
			case /^\/album\/[a-zA-Z0-9]+$/.test(pathname):
				setTitle("Album");
				break;
		}
	}, [pathname]);

	return (
		<div className={`fixed top-0 left-0 px-6 py-4 w-full z-100 ${transparent ? "bg-transparent text-white" : "bg-white"}`}>
			<header className="flex justify-between">
				<button onClick={() => router.back()}>
					<LuChevronLeft />
				</button>
				<HeaderTitle level={2}>
					{title}
				</HeaderTitle>
				<button><LuSearch /></button>
			</header>
		</div>
	)
}