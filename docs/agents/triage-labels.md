# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Label in mattpocock/skills | Label in our tracker | Meaning                                  |
| -------------------------- | -------------------- | ---------------------------------------- |
| `needs-triage`             | `needs-triage`       | Maintainer needs to evaluate this issue  |
| `needs-info`               | `needs-info`         | Waiting on reporter for more information |
| `ready-for-agent`          | `ready-for-agent`    | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `ready-for-human`    | Requires human implementation            |
| `wontfix`                  | `wontfix`            | Will not be actioned                     |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

Edit the right-hand column to match whatever vocabulary you actually use.

## In this repo, `ready-for-agent` starts the factory

Adding `ready-for-agent` to an issue starts `.github/workflows/factory-implement.yml` right away. An agent then implements the ticket and opens a pull request, which is reviewed and merged automatically, and each run costs money. Only apply it when the ticket is fully specified.

The factory also adds `ready-for-human` to a pull request after the reviewer agent rejects it three times. The `agent:*` labels show pipeline state and aren't triage roles. See `FACTORY.md`.
