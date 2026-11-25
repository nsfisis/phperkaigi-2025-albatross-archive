import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { redirect, useLoaderData } from "react-router";
import { createApiClient } from "../api/client";
import GolfWatchAppGamingMultiplayer from "../components/GolfWatchApps/GolfWatchAppGamingMultiplayer";

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
		const [{ game }, { ranking }] = await Promise.all([
			apiClient.getGame(gameId),
			apiClient.getGameWatchRanking(gameId),
		]);

		return {
			game,
			ranking,
		};
	} catch {
		throw redirect("/dashboard");
	}
}

export default function GolfWatch() {
	const { game, ranking } = useLoaderData<typeof loader>();

	return (
		<GolfWatchAppGamingMultiplayer
			gameDisplayName={game.display_name}
			problemTitle={game.problem.title}
			problemDescription={game.problem.description}
			sampleCode={game.problem.sample_code}
			ranking={ranking}
		/>
	);
}
