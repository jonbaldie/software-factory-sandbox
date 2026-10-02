# The factory

This repo is the working example for [software-factory](https://github.com/jonbaldie/software-factory): GitHub Actions that turn labelled issues into reviewed, merged pull requests. Its README covers how the factory works, the labels, the guardrails and how to configure it.

It was installed with the factory's installer, which set `FACTORY_TEST_COMMAND` to `npm test`:

```sh
curl -fsSL https://raw.githubusercontent.com/jonbaldie/software-factory/v1/install.sh | bash
```

The coding standards the agents follow, and the reviewer enforces, are in [`AGENTS.md`](AGENTS.md).

## Try it

The scout files each `TODO(factory):` comment in `src/` as a `needs-triage` issue. Add `ready-for-agent` to one and watch the Actions tab.
