---
title: How to deploy to Vercel with GitHub Actions
tags: [Automation, CI, GitHub, Vercel]
createdAt: 2022-08-14T23:04:29.863Z
updatedAt: 2022-08-14T23:04:29.863Z
---

Today, you will learn how to use GitHub Actions to create production and preview deployments on [Vercel](https://vercel.com/). The default integration with Vercel listens for events on GitHub to automatically trigger builds and deployments. While this works well, there are cases where a bit more control over the build and deployment process is necessary.

<!-- more -->

### Add Vercel CLI to your project

To deploy to Vercel from GitHub Actions, use the NPM package [`vercel`](https://vercel.com/docs/cli). You can install `vercel` globally as suggested in their docs, or you can install it as a dev dependency in your project as shown here.

```bash
yarn add --dev vercel
```

For the initial setup, you must authenticate `vercel` in order to create or link a project.

```bash
yarn vercel login
```

After authenticating, run the following command to create a new project or link an existing one. This will create a new file at `.vercel/project.json`.

```bash
yarn vercel link
```

Create a new Vercel Access Token on your [account tokens page](https://vercel.com/account/tokens), and then find your project and organization ids in `.vercel/project.json`. Finally, add `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, and `VERCEL_TOKEN` to your GitHub repo as [secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

## Create preview deployments on Pull Requests

Create a new [workflow](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions) under the `.github/workflows` directory called `preview.yml`. There are a number of events you can use to trigger this workflow, but I recommend starting with `pull_request` and `workflow_dispatch` for now.

```yaml
# .github/workflows/preview.yml
name: preview
on:
  pull_request:
  workflow_dispatch:
```

To scope `vercel` to your current project and organization, you need to expose the corresponding secrets you stored on GitHub earlier as environment variables. The Vercel Access Token is used directly in the job, so you do not need to expose it here.

```yaml
# .github/workflows/preview.yml
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

The last section is where you configure the actual code to run when the workflow is invoked. This workflow defines a single job called `preview` that installs the project dependencies with `yarn`. It then pulls the project settings from Vercel for the `preview` environment.

```yaml
# .github/workflows/preview.yml
jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: yarn
      - run: yarn install --immutable
      - run: yarn vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
```

To build and deploy the app, you need to add two more steps to the job.

```yaml
# .github/workflows/preview.yml
      - run: yarn vercel build --token=${{ secrets.VERCEL_TOKEN }}
      - run: yarn vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
```

The `vercel build` command will invoke the `build` script in your `package.json` file. It will then transform the output to match Vercel's [Build Output API](https://vercel.com/docs/build-output-api/v3) specification. The `vercel deploy` command will then deploy the resulting build to Vercel. Take note of the `--prebuilt` flag. Without it, Vercel will push your _source_ files instead and attempt to run `vercel build` on their platform.

While this configuration works as it is, I recommend following the next section to configure this workflow to automatically add deployment links to your Pull Requests. If you do not want deployment links automatically added to your Pull Requests, feel free to skip ahead to production deployments.

### Automatically add deployment links to Pull Requests

On Pull Requests, GitHub will add [deployment links](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/viewing-deployment-activity-for-your-repository) to the _Conversation_ tab when an [environment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment) is specified.

```yaml
# .github/workflows/preview.yml
jobs:
  preview:
    runs-on: ubuntu-latest
    environment:
      name: preview
      url: https://preview.deployment.example
```

Vercel generates unique links when you run `vercel deploy`, and you can use those dynamic links as the environment URL with some modifications to the workflow. [Outputs](https://docs.github.com/en/actions/using-jobs/defining-outputs-for-jobs) allow you to store data for use in subsequent steps or jobs.

Assign an id to the `vercel deploy` step called `deploy` so that we can reference it later. Store the result of the deploy command in an output called `url`.

```yaml
# .github/workflows/preview.yml
      - id: deploy
        run: echo "::set-output name=url::$(yarn vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }})"
```

In the `environment` section, update the `url` field to use the `url` output of the `deploy` step.

```yaml
# .github/workflows/preview.yml
      url: ${{ steps.deploy.outputs.url }}
```

### The full preview workflow

The final result of the preview workflow should look something like this.

```yaml
# .github/workflows/preview.yml
name: preview
on:
  pull_request:
  workflow_dispatch:
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
jobs:
  preview:
    runs-on: ubuntu-latest
    environment:
      name: preview
      url: ${{ steps.deploy.outputs.url }}
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: yarn
      - run: yarn install --immutable
      - run: yarn vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
      - run: yarn vercel build --token=${{ secrets.VERCEL_TOKEN }}
      - id: deploy
        run: echo "::set-output name=url::$(yarn vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }})"
```

## Create production deployments on commits to `main`

The workflow for production deployments is very similar to the workflow for preview deployments. Start by creating another workflow under the `.github/workflows` directory called `deploy.yml`. For this workflow, use the `push` and `workflow_dispatch` events.

```yaml
# .github/workflows/deploy.yml
name: deploy
on:
  push:
    branches:
      - main
  workflow_dispatch:
```

Then, expose the same environment variables we used for preview deployments.

```yaml
# .github/workflows/deploy.yml
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

Aside from the workflow triggers, the main difference is in the `vercel` commands. The `vercel pull` command must specify the environment as `production`, and the `vercel build` and `vercel deploy` commands require the `--prod` flag to be set.

```yaml
# .github/workflows/deploy.yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: yarn
      - run: yarn install --immutable
      - run: yarn vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - run: yarn vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - run: yarn vercel deploy --prod --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
```

### The full production workflow

The final result of the production workflow should look something like this.

```yaml
# .github/workflows/deploy.yml
name: deploy
on:
  push:
    branches:
      - main
  workflow_dispatch:
env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: yarn
      - run: yarn install --immutable
      - run: yarn vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - run: yarn vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - run: yarn vercel deploy --prod --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
```

I like to avoid vendor lock-in where possible, and the documenation around this approach seems to be pretty sparse. I hope this post helps you as much as _figuring out_ how to do this has helped me. If you want to see more posts like this one, leave a comment down below.

As always, happy coding. ✌️
