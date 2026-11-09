# VSCO Workspace MCP plugin

Connects Claude and other agent-plugin compatible clients to VSCO's MCP service, giving access to the tools available to your authorized VSCO account (initially VSCO Workspace). Requires a VSCO One subscription. Authorization happens through OAuth when the client first connects.

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
| `tools/bundle.mjs` | Builds the distributable zip |

The `version` in `plugin.json` and `.claude-plugin/plugin.json` must match.

## Building the zip

```sh
cd tools && npm install && cd ..
node tools/bundle.mjs <plugin-path> [output-dir]
```

`<plugin-path>` is the plugin directory (`.` for this repository). The zip is written to `<output-dir>/<version>/<name>.zip` (default output directory: `dist`). Only plugin content is packaged (manifests, MCP configs, icon, `skills/`, `LICENSE`, `README.md`), and the output is deterministic for identical inputs.

## License

MIT, see [LICENSE](LICENSE).
