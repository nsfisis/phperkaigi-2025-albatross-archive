import type { MetaFunction } from "react-router";
import BorderedContainer from "../components/BorderedContainer";
import NavigateLink from "../components/NavigateLink";

export const meta: MetaFunction = () => [
	{ title: "PHPerKaigi 2025 Albatross" },
];

export default function Index() {
	return (
		<div className="min-h-screen bg-sky-600 flex flex-col items-center justify-center gap-y-6">
			<img
				src="/phperkaigi/2025/code-battle/logo.svg"
				alt="PHPerKaigi 2025"
				className="w-64 h-64"
			/>
			<div className="text-center">
				<div className="font-bold text-sky-50 flex flex-col gap-y-2">
					<div className="text-5xl">PHPER CODE BATTLE</div>
				</div>
			</div>
			<div className="mx-2">
				<BorderedContainer>
					<p className="text-gray-900 max-w-prose">
						PHPer コードバトルは指示された動作をする PHP
						コードをより短く書けた方が勝ち、という 1 対 1
						の対戦コンテンツです。3/21（金）day0 前夜祭では 3/8
						に実施されたオフライン予選と、当日まで開催しているオンライン予選を勝ち抜いたプレイヤーによるトーナメント形式での
						PHPer コードバトルを実施します。ここでは短いコードが正義です！
						可読性も保守性も放り投げた、イベントならではのコードをお楽しみください！
					</p>
					<div className="mt-4 pt-4 border-t border-gray-300 max-w-prose">
						<p className="font-bold text-gray-900">追記</p>
						<p className="mt-2 text-gray-900">
							イベントは終了しました。ご参加いただいたみなさま、ありがとうございました！
							出題された問題や提出コードはこちらからご覧いただけます（勝敗が決した後も
							PHPerKaigi
							の会期中は提出が可能でした。閲覧できるのは最終的な提出コードで、コードバトルの場で書いたものとは異なる場合があります）。
						</p>
						<div className="mt-4 flex justify-center gap-4">
							<NavigateLink to="/dashboard">問題一覧</NavigateLink>
						</div>
					</div>
				</BorderedContainer>
			</div>
		</div>
	);
}
