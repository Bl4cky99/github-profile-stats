<a id="readme-top"></a>

<br />
<div align="center">
    <a href="https://github.com/Bl4cky99/github-profile-stats">
        <img src="README_ASSETS/logo.png" alt="Logo" width="600">
    </a>
    <br>
    <h3 align="center">github-profile-stats</h3>
    <p align="center">
        A high-performance <b>Bun-powered microservice</b> for dynamic, SVG-based GitHub profile statistics.
        <br/>
        Designed to provide real-time, beautifully rendered GitHub metrics for your profile README, featuring custom themes and aggressive caching.
        <br/>
        Built with TypeScript, Bun, and SVG for a lightweight, dependency-free visual experience.
        <br/><br/>
        <a href="https://github.com/Bl4cky99/github-profile-stats/issues/new?template=bug_report.yml">Report Bug</a>
        &middot;
        <a href="https://github.com/Bl4cky99/github-profile-stats/issues/new?template=feature_request.yml">Request Feature</a>
        <br/><br/>
    </p>
</div>

<details>
<summary>Table of Contents</summary>
<ol>
  <li><a href="#features">Features</a></li>
  <li><a href="#installation">Installation</a>
    <ul>
      <li><a href="#install-docker">Docker (recommended)</a></li>
      <li><a href="#install-local">Local Development</a></li>
    </ul>
  </li>
  <li><a href="#configuration">Configuration</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#architecture">Architecture</a>
    <ul>
      <li><a href="#rendering-engine">Rendering Engine</a></li>
    </ul>
  </li>
  <li><a href="#license">License</a></li>
  <li><a href="#credits">Credits & Third-Party Assets</a></li>
</ol>
</details>

---

## <span id="features">Features</span>

- **Bun-Native Performance**: Leverages the speed of the Bun runtime and its native HTTP server for sub-millisecond response times.
- **Dynamic SVG Rendering**: Generates crisp, high-quality SVG cards directly in-memory without the need for heavy headless browsers or canvas libraries.
- **GitHub Dark Theme**: Styled to match the official GitHub Dark mode aesthetic for seamless integration into profile READMEs.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## <span id="installation">Installation</span>

### <span id="install-docker">Docker (recommended)</span>

The easiest way to deploy the service is using Docker. The provided multi-stage Dockerfile ensures a minimal footprint.

```bash
# Build the image

docker build -t github-profile-stats .

# Run the container

docker run -d \
 -p 3000:3000 \
 -e NODE_ENV=production \
 -e GITHUB_TOKEN=your_token_here \
 github-profile-stats
```

### <span id="install-local">Local Development</span>

Ensure you have [Bun](https://bun.sh) installed.

```bash
# Install dependencies

bun install

# Start development server with hot-reload

bun dev

# Run linting and formatting

bun run lint:fix
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## <span id="configuration">Configuration</span>

The service is configured via environment variables:

| Variable               | Description                                           | Default       |
| :--------------------- | :---------------------------------------------------- | :------------ |
| `GITHUB_TOKEN`         | Personal Access Token for GitHub API (Required)       | -             |
| `GITHUB_USERNAME`      | Your GitHub username for data fetching (Required)     | -             |
| `PORT`                 | Port the server listens on                            | `3000`        |
| `CACHE_TTL_SECONDS`    | Time-to-live for cached GitHub data in seconds        | `3600`        |
| `LOG_LEVEL`            | Logging verbosity (`debug`, `info`, `warn`, `error`)  | `info`        |
| `PROFILE_NUMBER_LANGS` | Number of top languages to show in the legend         | `3`           |
| `PROFILE_FILTER_LANGS` | Languages to filter out of the legend                 | -             |
| `NODE_ENV`             | Environment mode (`production` triggers JSON logging) | `development` |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## <span id="usage">Usage</span>

To display your stats, simply embed the URL in your GitHub profile README:

```markdown
![My GitHub Stats](https://your-service-url.com/profile.svg
```

No parameters needed, everything is setup [here](#configuration).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## <span id="architecture">Architecture</span>

### <span id="rendering-engine">Rendering Engine</span>

The SVG generation uses a custom-built mathematical approach to layout. It calculates the geometry for the donut rings and coordinates for text elements without external dependencies.

- **Donut Ring**: Built using SVG paths and arc calculations.
- **Dynamic Legend**: Uses a text-width estimation utility to align the language name, color box, and percentage values in a right-justified block.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## <span id="license">License</span>

This project is licensed under the **MIT License**.

- Copyright © 2026 [Jason Giese (Bl4cky99)](https://github.com/Bl4cky99)
- See the full text in [LICENSE](./LICENSE).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## <span id="credits">Credits & Third-Party Assets</span>

The source code of this project is licensed under the MIT License (see [LICENSE](./LICENSE)).

Bundled assets are licensed separately under their own terms:

- **Kanit** — © Cadson Demak, licensed under the [SIL Open Font License 1.1](./fonts/OFL.txt).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

**Happy profile riceing!**
