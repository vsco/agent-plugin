---
name: daily-dashboard
description: Show the VSCO Workspace daily dashboard (tasks, invoices, quotes, email problems, unread email, bookings, leads, calendar), or answer in chat on hosts that cannot render it. Use when asked for a daily dashboard, morning overview, or "what needs my attention today" from VSCO.
---

# VSCO daily dashboard

Call the VSCO connector's `show_daily_dashboard` tool with no arguments. Hosts that support MCP Apps (Claude, ChatGPT) render the interactive dashboard from the result: KPI tiles, this month's calendar, and a refresh button that reloads live data. Do not build your own artifact, page or HTML from the data; reply with a short summary of what stands out.

If the connector has no `show_daily_dashboard` tool, it is out of date; tell the user to refresh it.

On hosts that cannot render MCP Apps (for example Claude Code or Codex), or when the user wants a quick answer, answer in chat from `get_attention_summary` called with no arguments. Lead with what is due today and overdue, then money owed, email problems and unread client email, then leads to follow up. Link each item with its `jobHref`, and mention any sections listed under `errors` as not loaded rather than zero.
