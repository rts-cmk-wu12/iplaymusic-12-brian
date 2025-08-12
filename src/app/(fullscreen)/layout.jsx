import "../globals.css";

export default function FullscreenLayout({ children }) {
	return (
		<html>
			<body>
				<div className="p-6">
					{children}
				</div>
			</body>
		</html>
	);
}