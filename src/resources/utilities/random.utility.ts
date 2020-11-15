export class RandomUtility {
	public static int(): number {
		return Math.floor(
			Math.min(
				Math.random()
				* (Number.MAX_SAFE_INTEGER / 2),
				Number.MAX_SAFE_INTEGER,
			),
		);
	}
}
