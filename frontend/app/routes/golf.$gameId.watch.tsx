import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { redirect, useLoaderData } from "react-router";
import { createApiClient } from "../api/client";
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

	return (
		<GolfWatchApp
			key={game.game_id}
			game={game}
			gameStates={gameStates}
			ranking={ranking}
		/>
	);
}
