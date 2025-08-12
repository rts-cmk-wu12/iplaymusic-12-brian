import "../globals.css";

export default function SpecialLayout({ children }) {
	return (
		<html>
			<body>
				{children}
			</body>
		</html>
	)
}