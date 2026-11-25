import createClient from "openapi-fetch";
import type { paths } from "./schema";

const client = createClient<paths>({
	baseUrl:
		process.env.NODE_ENV === "development"
			? "http://localhost:8003/phperkaigi/2025/code-battle/api/"
			: "https://t.nil.ninja/phperkaigi/2025/code-battle/api/",
});

class ApiClient {
	async getGames() {
		const { data, error } = await client.GET("/games");
		if (error) throw new Error(error.message);
		return data;
	}

	async getGame(gameId: number) {
		const { data, error } = await client.GET("/games/{game_id}", {
			params: {
				path: { game_id: gameId },
			},
		});
		if (error) throw new Error(error.message);
		return data;
	}

	async getGameWatchRanking(gameId: number) {
		const { data, error } = await client.GET("/games/{game_id}/watch/ranking", {
			params: {
				path: { game_id: gameId },
			},
		});
		if (error) throw new Error(error.message);
		return data;
	}
}

export function createApiClient() {
	return new ApiClient();
}
