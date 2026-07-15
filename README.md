# Candidate Exercise — WorkTrack

## Table of contents

1. [Overview](#overview)
2. [Exercise](#exercise)
3. [Part 1 — Implement Saved Project Views](#part-1--implement-saved-project-views)
4. [Part 2 — Find and report hidden issues](#part-2--find-and-report-hidden-issues)
5. [Follow-up interview](#follow-up-interview)
6. [Expectations](#expectations)
7. [Deliverables](#deliverables)
8. [The application](#the-application)
9. [Getting started](#getting-started)

## Overview

WorkTrack is a project and employee operations dashboard built with Next.js, React, TypeScript,
Clerk, TanStack Query, TanStack Table, TanStack Form, Zod, and Nuqs.

For this exercise, we would like you to review and work from this existing codebase. The purpose of
the exercise is to understand how you approach an unfamiliar frontend application, how you make a
scoped change within an existing system, how thoroughly you uncover problems hidden in code you did
not write, and how you reason about the technical future of a product.

Aim to spend approximately **5–6 hours** on the exercise. If you run out of time, explain what
remains and what you would do next. A focused, well-reasoned solution is stronger than a broad,
unfinished redesign.

## Exercise

This exercise has two parts:

1. Implement a focused frontend feature.
2. Review the existing application and report the hidden issues you find.

## Part 1 — Implement Saved Project Views

Add a **Saved Views** capability to the Projects page.

A saved view should allow a user to capture the current project-table configuration and return to
it later.

At a minimum, users should be able to:

- give a view a name,
- save the current project-table state,
- apply a saved view,
- delete a saved view,
- and retain saved views after refreshing the browser.

We are intentionally leaving parts of the requirement open-ended. You will need to decide:

- which parts of the table state belong in a saved view,
- where saved views should be stored,
- how applying a view should affect the URL,
- how default, stale, and invalid states should be handled,
- and how the interface should behave across desktop and mobile layouts.

A real backend is not required. Browser-local persistence is acceptable.

We are not looking for a large redesign or an exhaustive solution. We are more interested in:

- how you understand the existing table and URL-state architecture,
- how you separate persistent, URL, server, and component state,
- how you handle Next.js Server and Client Component boundaries,
- how you design reusable and accessible interactions,
- how you handle malformed or stale persisted data,
- how you communicate loading, empty, and failure states,
- how you scope your implementation,
- and how you validate the result.

Please include:

- your implementation,
- automated tests you consider appropriate,
- and brief notes explaining your assumptions and tradeoffs.

### Acceptance criteria

- A user can save the current Projects table configuration with a name.
- A saved view restores search, filters, sorting, and page size.
- Applying a saved view updates the URL to reflect the restored state.
- Saved views remain available after a browser refresh.
- A user can delete a saved view.
- Empty or invalid persisted data does not break the page.
- The feature is usable with a keyboard.
- The interface works on desktop and mobile layouts.
- Automated tests cover the most important behavior.

## Part 2 — Find and report hidden issues

This codebase contains a number of deliberately introduced, non-obvious issues spanning areas such
as:

- React correctness and component lifecycle,
- Next.js Server and Client Component boundaries,
- authentication and authorization,
- TanStack Query caching and invalidation,
- duplicate or unnecessary requests,
- stale data after mutations,
- URL and component-state synchronization,
- hydration and browser persistence,
- TypeScript type safety,
- form validation,
- accessibility and keyboard interaction,
- rendering and table performance,
- error, loading, and empty states,
- component architecture and maintainability,
- and developer experience.

Review the repository as if you had inherited the application and were responsible for its future.
Find as many genuine issues as you can.

For every issue, explain:

1. **What it is** — including the relevant file, component, hook, or route.
2. **Why it matters** — including the real-world user or engineering impact.
3. **How to fix it** — whether or not you implement the fix.
4. **Priority** — how urgently you believe it should be addressed.

Code fixes are welcome but are not required for every finding. Clear evidence, impact analysis, and
prioritization are more important than the number of changes made. Distinguish genuine defects from
personal preferences.

## Follow-up interview

After the exercise, you will have a follow-up discussion with engineers from our team. The
conversation may cover:

- your Saved Views implementation,
- assumptions and tradeoffs you made,
- your choice of persistence and source of truth,
- Next.js rendering and hydration considerations,
- URL, component, and server-state synchronization,
- accessibility and responsive design,
- testing strategy,
- the issues you discovered and how you prioritized them,
- security and architectural considerations,
- and how you would evolve WorkTrack over time.

The objective is not only to review the code you produced, but also to understand how you analyze an
existing frontend system, make engineering decisions, and communicate your reasoning.

## Expectations

For **Part 1**, keep the implementation focused and work with the existing architecture. Avoid a
large redesign, unnecessary global state, or a backend that the requirement does not need.

For **Part 2**, be thorough. Look beyond formatting and naming, support findings with concrete code
evidence, explain their impact, and prioritize them appropriately.

Keep Clerk authentication working, including sign-out. Maintain strict TypeScript and avoid `any`.
Preserve accessible keyboard behavior, responsive layouts, and meaningful loading, error, and empty
states.

## Deliverables

Fork the FSG repository from its `main` branch, then create a working branch in your own fork. Open
the pull request from your working branch into the `main` branch of **your forked repository**.

**Do not open a pull request against the FSG repository.** Share the link to the pull request in
your fork as your submission.

Your pull request should contain:

- the Part 1 Saved Views implementation,
- appropriate automated tests and instructions for running them,
- a `REPORT.md` containing your Part 2 findings,
- and any additional notes you would like to discuss during the follow-up interview.

A short screen-recorded presentation would be greatly appreciated, although it is optional. Use it
to demonstrate the feature, explain your main technical decisions, and highlight the most important
issues you discovered.

Document important assumptions, known limitations, and what you would improve with more time.

Before submission, ensure these commands pass:

```bash
bun run format:check
bun run lint:strict
bunx tsc --noEmit
bun run build
```

# Clerk authentication setup

WorkTrack uses Clerk for user authentication and profile management. Organization and billing features are not enabled.

1. Create or select an application in the [Clerk Dashboard](https://dashboard.clerk.com).
2. Copy `env.example.txt` to `.env.local`.
3. Add the publishable and secret keys.
4. Keep the configured sign-in, sign-up, and post-authentication redirects pointed at the existing routes.

For initial local development, Clerk keyless mode can be used instead of adding credentials immediately.


## The application

WorkTrack currently includes:

- an authenticated operations dashboard,
- project listing, search, status filtering, sorting, and pagination,
- project creation, editing, and deletion,
- employee listing, filtering, sorting, pagination, and management,
- Clerk sign-in, sign-up, sign-out, and user profile management,
- and light and dark color modes.

The application intentionally uses an in-memory data service. Data may reset when the development
server restarts. You do not need to introduce a database or external API for this exercise.

## Getting started

### Install dependencies

```bash
bun install
```

### Configure authentication

Copy `env.example.txt` to `.env.local` and provide Clerk credentials. Clerk keyless development mode
may also be used. Additional guidance is available in
[`docs/clerk_setup.md`](docs/clerk_setup.md).

### Start the application

```bash
bun run dev
```

Open `http://localhost:3000/dashboard/overview` after signing in. The assessment feature belongs on
`http://localhost:3000/dashboard/projects`.

### Useful commands

```bash
bun run dev          # Start the development server
bun run format:check # Check formatting
bun run lint:strict  # Run lint with zero warnings
bunx tsc --noEmit    # Type-check the application
bun run build        # Create a production build
```

No automated test framework is installed in the starter. Selecting and configuring an appropriate,
proportionate test setup for the feature is part of the exercise.
