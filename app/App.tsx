import type { PageData } from "./pageData";
import DashboardPage from "./pages/DashboardPage";
import GolfWatchPage from "./pages/GolfWatchPage";
import IndexPage from "./pages/IndexPage";

export default function App({ data }: { data: PageData }) {
	switch (data.page) {
		case "index":
			return <IndexPage />;
		case "dashboard":
			return <DashboardPage games={data.games} />;
		case "watch":
			return <GolfWatchPage game={data.game} ranking={data.ranking} />;
	}
}
