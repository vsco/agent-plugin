---
name: daily-dashboard
description: Build or refresh a VSCO Workspace daily dashboard (tasks, invoices, quotes, email errors, bookings, leads, calendar) as a published artifact. Use when asked for a daily dashboard, morning overview, or "what needs my attention today" from VSCO.
---

# VSCO daily dashboard

Publishes a ready-made dashboard page from `assets/dashboard-template.html`. The page loads its own data: the viewer presses refresh, allows the connector once, and the page runs a read-only pull through the VSCO connector's `execute` tool. Never embed real account data in the published page; it opens on a welcome screen by design.

The pull (`pullFn` in the template) calls typed `workspace.<operation>(input)` operations inside `execute`: `getResourceMyStudio`, `getResourceTimezone`, `getResourceJob`, `listResourceJob`, `listResourceTask`, `listResourceTaskList`, `listResourceInvoice`, `listResourceQuote`, `listResourceMailMessage`, `listResourceEvent`. Filters go under `query`, path ids at the top level (for example `workspace.getResourceJob({ id })`). If an operation's input is unclear, check it with the connector's `search` tool rather than guessing.

## Steps

1. Test the pull first. Run the `pullFn` body once through the connector's `execute` tool (about 100 calls). Fix any error before building.
2. Copy the template to a working file. Do not edit the original.
3. Set `SERVER` at the top of the script to the VSCO connector's exact display name, as it appears in the user's connector list. `mcp.callTool(SERVER, "execute", ...)` and the artifact's `capabilities` must use the same name.
4. Publish it as an artifact with `capabilities: {"mcp": {"servers": [{"server": "<display name>", "tools": ["execute"]}]}}`. Write page content only (title, link, style, body); the publisher adds the html/head/body skeleton.
5. Tell the user to press the refresh button and choose Allow. You cannot run the page's refresh yourself, so say that it is untested end to end.

## Facts worth knowing

- Money fields are in cents; the page divides by 100.
- `stage` on `listResourceJob` and `status` on `listResourceInvoice` are arrays (`["open"]`), not comma-separated strings.
- A task only counts when its task list's `stage` equals its job's current stage.
- `listResourceMailMessage` requires `jobId`, so email checks fan out per job (capped at 80 jobs, 6 at a time).
- Links to Workspace use the host from each record's `links.self.managerHref`; do not hard-code a host.
- Job titles can contain HTML entities (for example `&ntilde;`); the template decodes them.
- Rate limits surface as errors mentioning "rate limit"; `get` retries those up to four times, 5 s apart.
- Customising: change KPI tiles in `renderKpis`, sections in `renderAttn`, and the pull in `pullFn`. Keep the returned shape (`today`, `tasks`, `events`, `cal`, ...) or the page rejects the result as `bad_shape`.
