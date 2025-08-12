# Dokumentation for iPlayMusic
Brian Emilius, WU12

## Tech-stack
* Next.js
* React
* Git
* Tailwind
* React-icons
* SASS
* Web-API fra Spotify
* Zod

## Kode-eksempel
Common Header komponent (components/ui/common-header.jsx)
```jsx
export default function CommonHeader() {
	const pathname = usePathname();
	const [title, setTitle] = useState("");
	const router = useRouter();

	useEffect(function () {
		switch (pathname) {
			case "/":
				setTitle("Featured")
				break;
			case "/categories":
				setTitle("Categories");
				break;
		}
		return function() { ... }
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
			...
		</div>
	)
}
```

Jeg starter med at kalde en React hook "useState" som er en funktion, der returnerer et array. Arrayet indeholder 2 elementer: Et state og en sætter-funktion til dette state. useState tager imod et argument "initialState" som er værdien for statet ved start.