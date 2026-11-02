---
name: Do not modify feedApi.ts
description: User asked not to touch src/services/api/feedApi.ts — their own WIP WebSocket feed API
type: feedback
lastUpdated: 2026-10-22T11:41
lastRecall: 2026-10-22T13:26
---

Do not modify `src/services/api/feedApi.ts` (the RTK Query WebSocket feed API) unless explicitly asked.

**Why:** the user is developing this file themselves. After an `src/api` → `src/services/api` refactor pass they said "don't touch feedApi", and they declined the offer to register it in the store.

**How to apply:** when refactoring `src/services/api/`, leave `feedApi.ts` untouched — no renames (`chatApi` → `feedApi`), no lint/type cleanups, no wiring into `src/services/store.ts`. The other files in that folder (`baseQuery.ts`, `orderApi.ts`, `ingredientsApi.ts`, `userApi.ts`) are fair game.
