# Dokumentation for iPlayMusic
Brian Emilius, WU12

<img src="./public/file.svg">

## Sådan kommer du i gang
`npm install`

`npm run dev`

https://minadresse.dk/iplaymusic

Jeg har lavet valgfri opgave A

## Tech-stack
* **Next.js**  
Et front-end framework baseret på React.js som også giver adgang til server-side komponenter og -actions, samt mappebaseret routing. Server-side komponenter og funktioner giver en større sikkerhed, da al koden afvikles på serveren fremfor i klienten.
* **React**  
Et bibliotek der giver mig mulighed for at lave komponenter og håndtere states på en god og let måde. React har et stort community med et stort modul-bibliotek, som er aktivt, vel-dokumenteret og vel-understøttet. Det er også det mest brugte front-end bibliotek i verden, så efterspørgslen på React-udviklere er stor.
* **Git**  
Et versionsstyringsværktøj, som lader mig lave branches og versioner af min kode, så jeg let kan gå tilbage til tidligere versioner, hvis jeg for eksempel har lavet en fejl. Jeg bruger Git sammen med GitHub.
* **Tailwind**  
Et utility-baseret mobile-first CSS bibliotek.
* **React-icons**  
Et ikon-bibliotek, som er beregnet på React.
* **SASS**  
En udvidelse til CSS, som lader mig lave funktioner, variabler, mixins og nesting. Jeg kan opdele min CSS i moduler og dermed genbruge kode flere steder.
* **Web-API fra Spotify**  
Et interface til at få adgang til Spotify's data, så jeg kan lave min egen app. Dette er den eneste måde hvor jeg lovligt kan få adgang til Spotify's data.
* **Zod**  
Et valideringsbibliotek til objekter og strings. Jeg bruger Zod til blandt andet at validere bruger-input fra formularer.

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