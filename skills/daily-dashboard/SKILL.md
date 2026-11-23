---
name: daily-dashboard
description: Show the VSCO Workspace daily dashboard (tasks, invoices, quotes, email problems, unread email, bookings, leads, calendar), with a chat summary that also works where the dashboard cannot render. Use when asked for a daily dashboard, morning overview, or "what needs my attention today" from VSCO.
---

# VSCO daily dashboard

Call the VSCO connector's `show_daily_dashboard` tool with no arguments. Hosts that support MCP Apps (Claude, ChatGPT) render the interactive dashboard from the result: KPI tiles, this month's calendar, and a refresh button that reloads live data. Do not build your own artifact, page or HTML from the data.

Always reply in chat from the tool's text result, which has every section except the calendar rows. Where the dashboard renders this is a short caption; where it does not, it is the answer. Lead with what is due today and overdue, then money owed, email problems and unread client email, then leads to follow up. Amounts are in dollars, not cents. Link each item with its `jobHref`, and mention any sections listed under `errors` as not loaded rather than zero.

If the connector has no `show_daily_dashboard` tool, it is out of date: answer the same way from `get_attention_summary` called with no arguments, and tell the user to refresh the connector to get the dashboard.
