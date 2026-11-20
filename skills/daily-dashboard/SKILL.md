---
name: daily-dashboard
description: Build or refresh a VSCO Workspace daily dashboard (tasks, invoices, quotes, email errors, unread email, bookings, leads, calendar) as a Claude artifact, or as a chat summary on hosts without artifacts. Use when asked for a daily dashboard, morning overview, or "what needs my attention today" from VSCO.
---

# VSCO daily dashboard

On hosts that cannot publish Claude artifacts with connector access (for example ChatGPT or Codex), skip the page entirely: call `get_attention_summary` with no arguments and answer in chat. Lead with what is due today and overdue, then money owed, email problems and unread client email, then leads to follow up. Link each item with its `jobHref`, and mention any sections listed under `errors`.

On Claude, this skill publishes a ready-made dashboard page from `assets/dashboard-template.html`. The page loads its own data: the viewer presses refresh, allows the connector once, and the page calls the VSCO connector's read-only `get_attention_summary` tool. Never embed real account data in the published page; it opens on a welcome screen by design.

The page calls `get_attention_summary` with `from` set to the first of the current month and `days` set to the month's length, so the calendar covers the current month, and `calendar: true` so it gets up to 100 event and dated-task groups rather than the top few. `adapt()` in the template maps the tool's result onto the shape the render functions use. If a Claude user asks for a quick answer rather than a dashboard, answer in chat as above.

## Steps (Claude artifacts)

1. Test the tool first. Call `get_attention_summary` once with no arguments. If the connector has no such tool, it is out of date; stop and tell the user. If the result has an `errors` list, mention which sections failed.
2. Copy the template to a working file. Do not edit the original.
3. Set `SERVER` at the top of the script to the VSCO connector's exact display name, as it appears in the user's connector list. `mcp.callTool(SERVER, "get_attention_summary", ...)` and the artifact's `capabilities` must use the same name.
4. Publish it as an artifact with `capabilities: {"mcp": {"servers": [{"server": "<display name>", "tools": ["get_attention_summary"]}]}}`. Write page content only (title, link, style, body); the publisher adds the html/head/body skeleton.
5. Tell the user to press the refresh button and choose Allow. You cannot run the page's refresh yourself, so say that it is untested end to end.

## Facts worth knowing

- The tool returns amounts in dollars; `adapt()` converts them to cents for the page's `money()`.
- Every row links to its job through `jobHref`, taken from the record's `managerHref`; do not hard-code a host.
- Mail counts cover every lead, booked and fulfillment job in the studio. There is no per-job cap.
- A task only counts when its task list's `stage` equals its job's current stage. The tool applies this rule.
- Sections that fail come back empty and are listed under `errors`; the footer names them.
- Customising: change KPI tiles in `renderKpis`, sections in `renderAttn`, and the mapping in `adapt()`. Keep the shape `adapt()` returns (`today`, `tasks`, `events`, `cal`, ...), or the page rejects the result as `bad_shape`.
