export function msToTime(duration) {
	let seconds = parseInt((duration / 1000) % 60);
	let minutes = parseInt((duration / (1000 * 60)) % 60);

	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	return minutes + ":" + seconds;
}