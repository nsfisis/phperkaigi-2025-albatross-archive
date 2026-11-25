#!/bin/bash
set -euo pipefail

BASE_URL="https://t.nil.ninja/phperkaigi/2025/code-battle"

fetch() {
  curl -fsS --create-dirs -o "data/$2" "$BASE_URL/$1"
}

# API
fetch api/games                    games.json
fetch api/games/1                  games/1.json
fetch api/games/2                  games/2.json
fetch api/games/3                  games/3.json
fetch api/games/4                  games/4.json
fetch api/games/5                  games/5.json
fetch api/games/6                  games/6.json
fetch api/games/7                  games/7.json
fetch api/games/8                  games/8.json
fetch api/games/9                  games/9.json
fetch api/games/10                 games/10.json
fetch api/games/11                 games/11.json
fetch api/games/12                 games/12.json
fetch api/games/13                 games/13.json
fetch api/games/1/watch/ranking    games/1/watch/ranking.json
fetch api/games/2/watch/ranking    games/2/watch/ranking.json
fetch api/games/3/watch/ranking    games/3/watch/ranking.json
fetch api/games/4/watch/ranking    games/4/watch/ranking.json
fetch api/games/5/watch/ranking    games/5/watch/ranking.json
fetch api/games/6/watch/ranking    games/6/watch/ranking.json
fetch api/games/7/watch/ranking    games/7/watch/ranking.json
fetch api/games/8/watch/ranking    games/8/watch/ranking.json
fetch api/games/9/watch/ranking    games/9/watch/ranking.json
fetch api/games/10/watch/ranking   games/10/watch/ranking.json
fetch api/games/11/watch/ranking   games/11/watch/ranking.json
fetch api/games/12/watch/ranking   games/12/watch/ranking.json
fetch api/games/13/watch/ranking   games/13/watch/ranking.json
