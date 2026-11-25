import type { components } from "./api/schema";

type Schemas = components["schemas"];

// Data embedded into each prerendered page (see /prerender.ts).
export type PageData =
	| { page: "index" }
	| {
			page: "dashboard";
			games: Pick<Schemas["Game"], "game_id" | "display_name">[];
	  }
	| {
			page: "watch";
			game: Schemas["Game"];
			ranking: Schemas["RankingEntry"][];
	  };

const APP_NAME = "PHPerKaigi 2025 Albatross";

export function pageTitle(data: PageData): string {
	switch (data.page) {
		case "index":
			return APP_NAME;
		case "dashboard":
			return `Dashboard | ${APP_NAME}`;
		case "watch":
			return `Golf Watching ${data.game.display_name} | ${APP_NAME}`;
	}
}
