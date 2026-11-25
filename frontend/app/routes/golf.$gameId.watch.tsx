import { Provider as JotaiProvider, createStore } from "jotai";
import { useMemo } from "react";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { redirect, useLoaderData } from "react-router";
import { ApiClientContext, createApiClient } from "../api/client";
import GolfWatchApp from "../components/GolfWatchApp";

export const meta: MetaFunction<typeof loader> = ({ data }) => [
	{
		title: data
			? `Golf Watching ${data.game.display_name} | PHPerKaigi 2025 Albatross`
			: "Golf Watching | PHPerKaigi 2025 Albatross",
	},
];

export async function loader({ params }: LoaderFunctionArgs) {
	const apiClient = createApiClient();

	const gameId = Number(params.gameId);

	try {
		const [{ game }, { ranking }, { states: gameStates }] = await Promise.all([
			await apiClient.getGame(gameId),
			await apiClient.getGameWatchRanking(gameId),
			await apiClient.getGameWatchLatestStates(gameId),
		]);

		return {
			game,
			ranking,
			gameStates,
		};
	} catch {
		throw redirect("/dashboard");
	}
}

export default function GolfWatch() {
	const { game, ranking, gameStates } = useLoaderData<typeof loader>();

	const store = useMemo(() => {
		void game.game_id;
		return createStore();
	}, [game.game_id]);

	return (
		<JotaiProvider store={store}>
			<ApiClientContext.Provider value={createApiClient()}>
				<GolfWatchApp
					key={game.game_id}
					game={game}
					initialGameStates={gameStates}
					initialRanking={ranking}
				/>
			</ApiClientContext.Provider>
		</JotaiProvider>
	);
}
