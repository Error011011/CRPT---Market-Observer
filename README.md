CRPT — Market Observer
A high-performance cryptocurrency market dashboard built with React, TypeScript, and Vite. This application provides real-time market insights, interactive historical charts, and a seamless search experience, leveraging the CoinGecko API.

🚀 Key Features
Global Market Overview: Real-time tracking of total market cap, 24h volume, BTC/ETH dominance, and active cryptocurrencies.

Top 50 Assets: A highly responsive data table displaying the top cryptocurrencies by market cap, complete with dynamic 24h sparklines.

Interactive Charting: Detailed coin pages featuring historical price charts (1D, 7D, 30D, 90D, 1Y) powered by TradingView's Lightweight Charts.

Optimistic Search: A debounced, instant search bar with click-outside detection for finding specific assets across the CoinGecko database.

Type-Safe & Performant: Built with strict TypeScript, leveraging TanStack Query for robust data caching, background refetching, and state management.

🛠 Tech Stack
Framework: React 18+ (Bootstrapped with Vite)

Language: TypeScript (Strict mode)

Data Fetching: TanStack Query v5 (React Query) — Handles caching, deduplication, and background updates.

Routing: React Router — Handles navigation and scroll restoration.

Charting: Lightweight Charts by TradingView — Canvas-based, highly performant financial charts.

Styling: Tailwind CSS — Utility-first CSS framework for rapid UI development.

API: CoinGecko API — Free tier for cryptocurrency market data.

🧠 Architectural Decisions
Colocation of Data: Components are responsible for their own data fetching. For example, <CoinChart /> fetches its own historical data based on its internal range state, rather than relying on prop-drilling from the parent page.

Query Key Factories: Query keys are structured systematically (['coin', id], ['coinChart', id, range]) to ensure precise cache invalidation and minimal network requests.

Abort Controllers: Axios requests are tied to TanStack Query's AbortSignal. This prevents race conditions and saves API rate limits when users rapidly switch between chart timeframes.

Graceful Null Handling: The CoinGecko API occasionally returns null for missing data points. The application features custom formatting helpers (formatMoney, formatCoinAmount) and UI fallbacks to ensure the app never crashes on missing data (e.g., displaying - instead of crashing on null.toFixed()).
