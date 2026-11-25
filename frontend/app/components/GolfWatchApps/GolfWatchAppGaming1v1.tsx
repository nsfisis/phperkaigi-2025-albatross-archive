import type { components } from "../../api/schema";
import { calcCodeSize } from "../../codeSize";
import type { PlayerProfile } from "../../types/PlayerProfile";
import FoldableBorderedContainerWithCaption from "../FoldableBorderedContainerWithCaption";
import CodeBlock from "../Gaming/CodeBlock";
import ProblemColumnContent from "../Gaming/ProblemColumnContent";
import RankingTable from "../Gaming/RankingTable";
import ScoreBar from "../Gaming/ScoreBar";
import SubmitStatusLabel from "../SubmitStatusLabel";
import ThreeColumnLayout from "../ThreeColumnLayout";
import TitledColumn from "../TitledColumn";
import UserIcon from "../UserIcon";

type LatestGameState = components["schemas"]["LatestGameState"];
type RankingEntry = components["schemas"]["RankingEntry"];

type GameResultKind = "winA" | "winB" | "draw";

function checkGameResultKind(
	stateA: LatestGameState | null,
	stateB: LatestGameState | null,
): GameResultKind {
	const scoreA = stateA?.score;
	const scoreB = stateB?.score;
	if (scoreA == null && scoreB == null) {
		return "draw";
	}
	if (scoreA == null) {
		return "winB";
	}
	if (scoreB == null) {
		return "winA";
	}
	if (scoreA === scoreB) {
		// If score is non-null, state and best_score_submitted_at should also be non-null.
		const submittedAtA = stateA!.best_score_submitted_at!;
		const submittedAtB = stateB!.best_score_submitted_at!;
		return submittedAtA < submittedAtB ? "winA" : "winB";
	} else {
		return scoreA < scoreB ? "winA" : "winB";
	}
}

type Props = {
	gameDisplayName: string;
	playerProfileA: PlayerProfile | null;
	playerProfileB: PlayerProfile | null;
	problemTitle: string;
	problemDescription: string;
	sampleCode: string;
	gameStates: { [key: string]: LatestGameState | undefined };
	ranking: RankingEntry[];
};

export default function GolfWatchAppGaming1v1({
	gameDisplayName,
	playerProfileA,
	playerProfileB,
	problemTitle,
	problemDescription,
	sampleCode,
	gameStates: latestGameStates,
	ranking,
}: Props) {
	const stateA =
		playerProfileA && (latestGameStates[`${playerProfileA.id}`] ?? null);
	const codeA = stateA?.code ?? "";
	const scoreA = stateA?.score ?? null;
	const statusA = stateA?.status ?? "none";
	const stateB =
		playerProfileB && (latestGameStates[`${playerProfileB.id}`] ?? null);
	const codeB = stateB?.code ?? "";
	const scoreB = stateB?.score ?? null;
	const statusB = stateB?.status ?? "none";

	const codeSizeA = calcCodeSize(codeA);
	const codeSizeB = calcCodeSize(codeB);

	const gameResultKind = checkGameResultKind(stateA, stateB);

	const topBg =
		gameResultKind === "winA"
			? "bg-orange-400"
			: gameResultKind === "winB"
				? "bg-purple-400"
				: "bg-sky-600";

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col">
			<div className={`text-white ${topBg} grid grid-cols-3 px-4 py-2`}>
				<div className="font-bold flex gap-4 justify-start md:justify-between items-center my-auto">
					<div className="flex gap-6 items-center">
						{playerProfileA?.iconPath && (
							<UserIcon
								iconPath={playerProfileA.iconPath}
								displayName={playerProfileA.displayName}
								className="w-12 h-12 my-auto"
							/>
						)}
						<div className="hidden md:block text-4xl">
							{playerProfileA?.displayName}
						</div>
					</div>
					<div className="text-2xl md:text-6xl">{scoreA}</div>
				</div>
				<div className="font-bold text-center my-auto">
					<div className="text-3xl">{gameDisplayName}</div>
					<div className="text-xl text-gray-100">
						{gameResultKind === "winA"
							? `勝者 ${playerProfileA!.displayName}`
							: gameResultKind === "winB"
								? `勝者 ${playerProfileB!.displayName}`
								: "引き分け"}
					</div>
				</div>
				<div className="font-bold flex gap-4 justify-end md:justify-between items-center my-auto">
					<div className="text-2xl md:text-6xl">{scoreB}</div>
					<div className="flex gap-6 items-center text-end">
						<div className="hidden md:block text-4xl">
							{playerProfileB?.displayName}
						</div>
						{playerProfileB?.iconPath && (
							<UserIcon
								iconPath={playerProfileB.iconPath}
								displayName={playerProfileB.displayName}
								className="w-12 h-12 my-auto"
							/>
						)}
					</div>
				</div>
			</div>
			<ScoreBar
				scoreA={scoreA}
				scoreB={scoreB}
				bgA="bg-orange-400"
				bgB="bg-purple-400"
			/>
			<ThreeColumnLayout>
				<TitledColumn
					title={<SubmitStatusLabel status={statusA} />}
					className="order-2 md:order-1"
				>
					<FoldableBorderedContainerWithCaption
						caption={`コードサイズ: ${codeSizeA}`}
					>
						<CodeBlock code={codeA} language="php" />
					</FoldableBorderedContainerWithCaption>
				</TitledColumn>
				<TitledColumn title={problemTitle} className="order-1 md:order-2">
					<ProblemColumnContent
						description={problemDescription}
						sampleCode={sampleCode}
					/>
					<RankingTable ranking={ranking} />
				</TitledColumn>
				<TitledColumn
					title={<SubmitStatusLabel status={statusB} />}
					className="order-3"
				>
					<FoldableBorderedContainerWithCaption
						caption={`コードサイズ: ${codeSizeB}`}
					>
						<CodeBlock code={codeB} language="php" />
					</FoldableBorderedContainerWithCaption>
				</TitledColumn>
			</ThreeColumnLayout>
		</div>
	);
}
