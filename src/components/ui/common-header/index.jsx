"use client";

import HeaderTitle from "@/components/typography/header-title";
import Heading from "@/components/typography/heading";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuChevronLeft, LuSearch } from "react-icons/lu";

export default function CommonHeader() {
	const pathname = usePathname();
	const [title, setTitle] = useState("");
	const router = useRouter();

	useEffect(function () {
		console.log(pathname)
		switch (pathname) {
			case "/":
				setTitle("Featured")
				break;
			case "/categories":
				setTitle("Categories");
				break;
		}
	}, [pathname]);

	return (
		<div className="fixed bg-white top-0 left-0 px-6 pt-4 w-full z-100">
			<header className="flex justify-between mb-8">
				<button onClick={() => router.back()}>
					<LuChevronLeft />
				</button>
				<HeaderTitle level={2}>
					{title}
				</HeaderTitle>
				<button><LuSearch /></button>
			</header>
			<Heading level={2}>
				{title}
			</Heading>
		</div>
	)
}