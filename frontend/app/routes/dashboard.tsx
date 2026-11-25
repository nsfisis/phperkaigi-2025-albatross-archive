import type { MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import { createApiClient } from "../api/client";
import BorderedContainerWithCaption from "../components/BorderedContainerWithCaption";
import NavigateLink from "../components/NavigateLink";

export const meta: MetaFunction = () => [
	{ title: "Dashboard | PHPerKaigi 2025 Albatross" },
];

export async function loader() {
	const apiClient = createApiClient();

	const { games } = await apiClient.getGames();
	return {
		games,
	};
}

export default function Dashboard() {
	const { games } = useLoaderData<typeof loader>()!;

	return (
		<div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center gap-4">
			<h1 className="text-3xl font-bold text-gray-800">試合一覧</h1>
			<BorderedContainerWithCaption caption="試合一覧">
				<div className="px-4">
					<ul className="divide-y divide-gray-300">
						{games.map((game) => (
							<li
								key={game.game_id}
								className="flex justify-between items-center py-2 gap-4"
							>
								<div>
									<span className="font-medium text-gray-800">
										{game.display_name}
									</span>
								</div>
								<div className="flex gap-2">
									<NavigateLink to={`/golf/${game.game_id}/watch`}>
										結果を見る
									</NavigateLink>
								</div>
							</li>
						))}
					</ul>
				</div>
			</BorderedContainerWithCaption>
		</div>
	);
}
