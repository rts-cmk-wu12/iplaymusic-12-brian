export default function Heading({ children, level = 1, className = "" }) {
	switch (level) {
		case 2:
			return <h2 className={"font-extrabold text-3xl bg-gradient-to-br from-darkpink to-orange bg-clip-text text-transparent " + className}>{children}</h2>;
		case 3:
			return <h3 className={"font-semibold text-xl text-white " + className}>{children}</h3>
		default:
			return <h1 className={"font-bold text-2xl bg-gradient-to-b from-darkpink to-orange bg-clip-text text-transparent " + className}>{children}</h1>;
	}
}