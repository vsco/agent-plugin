# VSCO MCP plugin

Connects Claude, ChatGPT and other agent-plugin compatible clients to VSCO's MCP service, giving access to the tools available to your authorized VSCO account (initially VSCO Workspace). Requires a VSCO One subscription. Authorization happens through OAuth when the client first connects.

## Layout

This repository is a single plugin with the plugin at the repository root.

| Path | Purpose |
| --- | --- |
| `.claude-plugin/plugin.json` | Claude plugin manifest |
| `.mcp.json` | Claude MCP server configuration |
| `plugin.json` | Agent Plugins manifest |
| `mcp.json` | Agent Plugins MCP server configuration |
| `icon.png` | Plugin icon |
| `skills/<name>/SKILL.md` | Skills, shared by both manifests. Split by workflow (for example leads, invoices, payments), not by tool. |

The `version` in `plugin.json` and `.claude-plugin/plugin.json` must match.

## License

VSCO Agent Plugin Limited Use License, see [LICENSE](LICENSE).
