# Morpheus Coding Agent

A multi-model coding agent template with sandboxed execution, powered by Morpheus decentralized inference.

![Coding Agent Template Screenshot](screenshot.png)

## Powered by Morpheus Inference API

This template uses the [Morpheus Inference API](https://apidocs.mor.org) — an OpenAI-compatible API backed by a decentralized network of inference providers. No vendor lock-in, no single point of failure.

[![Get API Key](https://img.shields.io/badge/Get%20API%20Key-Morpheus-00D084?style=for-the-badge)](https://app.mor.org)

📖 [API Documentation](https://apidocs.mor.org) · 🔧 [Available Models](https://apidocs.mor.org/documentation/models)

### Available Models

| Model | Context | Best For |
|-------|---------|----------|
| qwen3-coder-480b-a35b-instruct | 256K | Code generation (default) |
| kimi-k2.5 | 256K | Vision, reasoning, code |
| kimi-k2-thinking | 256K | Deep reasoning |
| glm-5 | 200K | Code, reasoning, function calling |
| arcee-trinity-large-thinking | 256K | Code and reasoning |
| minimax-m2.5 | 198K | Code and function calling |
| qwen3-235b | 128K | General purpose |

## Deploy Your Own

Deploy your own instance to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmorpheusais%2Fmorpheus-coding-agent&env=SANDBOX_VERCEL_TEAM_ID,SANDBOX_VERCEL_PROJECT_ID,SANDBOX_VERCEL_TOKEN,JWE_SECRET,ENCRYPTION_KEY,MORPHEUS_API_KEY&envDescription=Required+environment+variables.+Get+your+Morpheus+API+key+at+https%3A%2F%2Fapp.mor.org&stores=%5B%7B%22type%22%3A%22postgres%22%7D%5D&project-name=morpheus-coding-agent&repository-name=morpheus-coding-agent)

**What happens during deployment:**
- **Automatic Database Setup**: A Neon Postgres database is automatically created and connected to your project
- **Environment Configuration**: You'll be prompted to provide required environment variables (Vercel credentials, encryption keys, and your Morpheus API key)
- **OAuth Setup**: After deployment, configure at least one OAuth provider (GitHub or Vercel) in your project settings

## Features

- **Multi-Agent Support**: Choose from multiple coding agents (Claude Code, OpenAI Codex CLI, GitHub Copilot CLI, Cursor CLI, Google Gemini CLI, opencode) all routing through Morpheus decentralized inference
- **Morpheus Model Dropdown**: Select from the best Morpheus models for coding, reasoning, and general tasks
- **User Authentication**: Secure sign-in with GitHub or Vercel OAuth
- **Multi-User Support**: Each user has their own tasks, API keys, and GitHub connection
- **Vercel Sandbox**: Runs code in isolated, secure sandboxes ([docs](https://vercel.com/docs/vercel-sandbox))
- **AI-Generated Branch Names**: Automatically generates descriptive Git branch names
- **Task Management**: Track task progress with real-time updates
- **Persistent Storage**: Tasks stored in Neon Postgres database
- **Git Integration**: Automatically creates branches and commits changes
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- **MCP Server Support**: Connect MCP servers to Claude Code for extended capabilities

## Quick Start

1. Click the "Deploy with Vercel" button above
2. Get your Morpheus API key at [app.mor.org](https://app.mor.org)
3. Configure OAuth (GitHub or Vercel) in your project settings
4. Users sign in and start creating tasks

Or run locally:
```bash
git clone https://github.com/morpheusais/morpheus-coding-agent.git
cd morpheus-coding-agent
pnpm install
# Set up .env.local with required variables (see below)
pnpm db:push
pnpm dev
```

## Usage

1. **Sign In**: Authenticate with GitHub or Vercel
2. **Create a Task**: Enter a repository URL and describe what you want the AI to do
3. **Choose a Model**: Select from the Morpheus model dropdown
4. **Monitor Progress**: Watch real-time logs as the agent works
5. **Review Results**: See the changes made and the branch created

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/morpheusais/morpheus-coding-agent.git
cd morpheus-coding-agent
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file:

#### Morpheus Inference API (REQUIRED)

```bash
# Get your API key at https://app.mor.org
MORPHEUS_API_KEY=your-morpheus-api-key

# Optional: override the base URL (defaults to https://api.mor.org/api/v1)
# MORPHEUS_BASE_URL=https://api.mor.org/api/v1
```

#### Required Infrastructure Variables

- `POSTGRES_URL`: PostgreSQL connection string (auto-provisioned on Vercel via Neon)
- `SANDBOX_VERCEL_TOKEN`: Vercel API token (for creating sandboxes)
- `SANDBOX_VERCEL_TEAM_ID`: Vercel team ID
- `SANDBOX_VERCEL_PROJECT_ID`: Vercel project ID
- `JWE_SECRET`: Base64-encoded secret for session encryption (`openssl rand -base64 32`)
- `ENCRYPTION_KEY`: 32-byte hex string for encrypting user data (`openssl rand -hex 32`)

#### User Authentication (at least one required)

Configure which providers to enable:
```bash
NEXT_PUBLIC_AUTH_PROVIDERS=github  # or "vercel" or "github,vercel"
```

**GitHub OAuth:**
```bash
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Vercel OAuth:**
```bash
NEXT_PUBLIC_VERCEL_CLIENT_ID=your_vercel_client_id
VERCEL_CLIENT_SECRET=your_vercel_client_secret
```

#### Additional Agent API Keys (Optional)

These are only needed for non-Morpheus agents:
- `CURSOR_API_KEY`: For Cursor agent
- `GEMINI_API_KEY`: For Google Gemini agent

#### Optional

- `NPM_TOKEN`: For private npm packages
- `MAX_SANDBOX_DURATION`: Default maximum sandbox duration in minutes (default: `300`)
- `MAX_MESSAGES_PER_DAY`: Maximum tasks + follow-ups per user per day (default: `5`)

### 4. Set up OAuth Applications

#### GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set **Authorization callback URL**: `http://localhost:3000/api/auth/github/callback`
4. Copy the **Client ID** → `NEXT_PUBLIC_GITHUB_CLIENT_ID`
5. Generate a **Client Secret** → `GITHUB_CLIENT_SECRET`

#### Vercel OAuth App

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) → Settings → Integrations → Create
2. Set **Redirect URL**: `http://localhost:3000/api/auth/callback/vercel`
3. Copy the **Client ID** → `NEXT_PUBLIC_VERCEL_CLIENT_ID`
4. Copy the **Client Secret** → `VERCEL_CLIENT_SECRET`

### 5. Set up the database

```bash
pnpm db:generate
pnpm db:push
```

### 6. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Task Configuration

### Maximum Duration

Controls how long the Vercel sandbox stays alive from creation. Ranges from 5 minutes to 5 hours.

### Keep Alive

When enabled, the sandbox stays alive after task completion for the remaining duration, allowing follow-up messages and sandbox inspection.

| Setting | After Task Completes | Can Send Follow-ups? |
|---------|---------------------|---------------------|
| Keep Alive ON | Sandbox stays alive until timeout | Yes |
| Keep Alive OFF | Sandbox shuts down immediately | No |

## How It Works

1. **Task Creation**: Task stored in the database
2. **AI Branch Name Generation**: Automatically generates a descriptive branch name using the Morpheus API
3. **Sandbox Setup**: A Vercel sandbox is created with your repository cloned
4. **Agent Execution**: The chosen coding agent analyzes your prompt and makes changes, using the Morpheus Inference API for inference
5. **Git Operations**: Changes are committed and pushed to the AI-generated branch
6. **Cleanup**: Sandbox shuts down to free resources

## MCP Server Support

Connect MCP Servers to extend Claude Code with additional tools. Go to the "Connectors" tab and click "Add MCP Server".

**Note**: `ENCRYPTION_KEY` is required when using MCP servers with OAuth authentication.

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Drizzle ORM
- **Inference**: [Morpheus Inference API](https://apidocs.mor.org) (OpenAI-compatible, decentralized)
- **AI Agents**: Claude Code, OpenAI Codex CLI, GitHub Copilot CLI, Cursor CLI, Google Gemini CLI, opencode
- **Sandbox**: [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox)
- **Authentication**: OAuth with GitHub/Vercel

## Development

### Database Operations

```bash
pnpm db:generate   # Generate migrations
pnpm db:push       # Push schema changes
pnpm db:studio     # Open Drizzle Studio
```

### Running the App

```bash
pnpm dev           # Development server
pnpm build         # Production build
pnpm start         # Start production server
```

## Security Considerations

- **Environment Variables**: Never commit `.env` files to version control
- **API Keys**: Rotate your Morpheus API key regularly; users can provide their own in the profile settings
- **Database Access**: Ensure your PostgreSQL database is secured with strong credentials
- **Vercel Sandbox**: Sandboxes are isolated environments
- **User Authentication**: Each user uses their own GitHub token for repository access
- **Encryption**: All sensitive data (tokens, API keys) is encrypted at rest

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
