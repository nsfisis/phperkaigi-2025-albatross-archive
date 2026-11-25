#!/bin/bash
set -euo pipefail

BASE_URL="https://t.nil.ninja/phperkaigi/2025/code-battle"

fetch() {
  curl -fsS --create-dirs -o "archives/$2" "$BASE_URL/$1"
}

# API
fetch api/games                    api/games.json
fetch api/games/1                  api/games/1.json
fetch api/games/2                  api/games/2.json
fetch api/games/3                  api/games/3.json
fetch api/games/4                  api/games/4.json
fetch api/games/5                  api/games/5.json
fetch api/games/6                  api/games/6.json
fetch api/games/7                  api/games/7.json
fetch api/games/8                  api/games/8.json
fetch api/games/9                  api/games/9.json
fetch api/games/10                 api/games/10.json
fetch api/games/11                 api/games/11.json
fetch api/games/12                 api/games/12.json
fetch api/games/13                 api/games/13.json
fetch api/games/1/watch/ranking    api/games/1/watch/ranking.json
fetch api/games/2/watch/ranking    api/games/2/watch/ranking.json
fetch api/games/3/watch/ranking    api/games/3/watch/ranking.json
fetch api/games/4/watch/ranking    api/games/4/watch/ranking.json
fetch api/games/5/watch/ranking    api/games/5/watch/ranking.json
fetch api/games/6/watch/ranking    api/games/6/watch/ranking.json
fetch api/games/7/watch/ranking    api/games/7/watch/ranking.json
fetch api/games/8/watch/ranking    api/games/8/watch/ranking.json
fetch api/games/9/watch/ranking    api/games/9/watch/ranking.json
fetch api/games/10/watch/ranking   api/games/10/watch/ranking.json
fetch api/games/11/watch/ranking   api/games/11/watch/ranking.json
fetch api/games/12/watch/ranking   api/games/12/watch/ranking.json
fetch api/games/13/watch/ranking   api/games/13/watch/ranking.json
