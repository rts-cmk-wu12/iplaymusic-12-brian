import "./globals.css";

export const metadata = {
	title: {
		template: "%s | iPlayMusic",
		default: "iPlayMusic"
	},
	description: "A much better music player web-app"
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				{children}
			</body>
		</html>
	);
}