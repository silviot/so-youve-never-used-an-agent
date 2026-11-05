# So You've Never Used an Agent: Make Your First Short Video on Windows

This course walks you through making a 15-second animated video on a Windows PC using **OpenCode** (an AI coding agent that runs in your terminal) and **Framefields** (a TypeScript video and motion-graphics engine that renders directly on your graphics card via WebGPU).

You do not need prior coding or video-editing experience. In the first four steps, you will install Git and OpenCode, set your Git identity, and connect your account. After that, you will hand the setup and video creation over to your AI agent using copyable plain-English prompts.

## What You Need Before Starting

* **A Windows 10 or 11 PC** with a WebGPU-capable graphics card (most modern integrated or dedicated GPUs work).
* **An internet connection** to install tools and chat with the AI model.
* **A $10/month budget** for the OpenCode Go subscription.
* **About 45 minutes** of unhurried time.

---

## Step 1: Install Git for Windows

Coding agents rely on **Git** to track file changes safely and **Git Bash** (included with Git for Windows) to run shell commands on Windows.

1. Open [https://git-scm.com/install/windows](https://git-scm.com/install/windows) in your browser and download the **64-bit Git for Windows Setup** installer.
2. Run the `.exe` installer and click **Next** through every screen to keep the recommended default settings, then click **Install**.
3. Open the Windows Start menu, type **PowerShell**, and open **Windows PowerShell**.
4. Check that Git works by typing this command and pressing **Enter**:

```powershell
git --version
```

**Success check:** PowerShell prints a version string like `git version 2.47.0.windows.1` rather than `"git" is not recognized`.

---

## Step 2: Configure Git with Your Name and Email

Git tags project checkpoints with a name and email address. These stay on your computer unless you choose to publish your code online later.

In your PowerShell window, run these two commands (replace the text inside the quotes with your own name and email):

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Verify your settings:

```powershell
git config --global --list
```

**Success check:** The output includes both `user.name=Your Name` and `user.email=you@example.com`.

---

## Step 3: Install OpenCode and Open a Workspace Folder

**OpenCode** is the terminal application where you talk to your coding agent. You can install it via the built-in Windows Package Manager (`winget`) or from [https://opencode.ai](https://opencode.ai).

1. In PowerShell, install OpenCode:

```powershell
winget install AnomalyCo.OpenCode
```

2. Close PowerShell and open a **new PowerShell window** so Windows refreshes your system `PATH`.
3. Create a dedicated folder for this course and enter it:

```powershell
mkdir "$HOME\video-workspace"
cd "$HOME\video-workspace"
```

4. Start OpenCode:

```powershell
opencode
```

**Success check:** Your terminal opens the OpenCode interface with a message prompt box at the bottom.

---

## Step 4: Subscribe to OpenCode Go, Connect, and Select Your Model

OpenCode is open-source software, while the AI models that power the agent require a model provider. For beginners, **OpenCode Go** offers a flat $10/month subscription with access to capable coding models.

1. Visit [https://opencode.ai/console/go](https://opencode.ai/console/go) in your browser, sign in, and subscribe to **OpenCode Go ($10/month)**. Copy the API key shown in your console.
2. Inside OpenCode, run:

```text
/connect
```

3. Choose **OpenCode** from the provider list, paste your API key once (characters may be hidden for privacy), and press **Enter**.
4. Open the model list:

```text
/models
```

5. Select **DeepSeek V4.1 Flash**. It is a reasonable starting choice for learning: it is covered by the Go subscription, responds quickly during interactive edits, and handles structured TypeScript tasks reliably while conserving your monthly quota.

**Success check:** The OpenCode status bar displays **DeepSeek V4.1 Flash**, and typing `"Say hello in one sentence"` produces a reply.

---

## Step 5: Hand Over Project Setup to Your Agent

Now let your agent handle the technical setup following the official Framefields README at [https://github.com/gatewai-dev/framefields](https://github.com/gatewai-dev/framefields). Framefields requires **Node.js 22 or newer** (`Node >=22`), scaffolds a project with `npx framefields init my-film --install`, and provides an agent skill pack via `npx skills add gatewai-dev/framefields` that teaches your agent how Framefields works.

Copy and paste this prompt into OpenCode:

```text
I am a Windows beginner. Please set up a Framefields project in this directory following https://github.com/gatewai-dev/framefields:
1. Check if Node.js is installed and verify that the version is Node >= 22. If Node is missing or older than 22, help me install Node.js LTS (>=22) on Windows and tell me if I need to restart OpenCode.
2. Once Node >= 22 is ready, run:
   npx framefields init my-film --install
3. Install the Framefields agent skills by running:
   npx skills add gatewai-dev/framefields
4. Inspect my-film/package.json and the generated files, then briefly list the available npm scripts for me.
```

Review each command when OpenCode asks for permission, then approve it.

**Success check:** The agent confirms `Node >=22` is active, the `my-film` folder and `gatewai-dev/framefields` skill are installed, and the agent reports the exact scripts listed inside `my-film/package.json`.

---

## Step 6: Build Your Three-Scene Video and Run a First Render

Next, you will create a **15-second video divided into three 5-second scenes**. You can substitute your own topic (such as a hobby club intro or a daily workout timer) or use our default starter film: **an imaginary café on the moon**.

Copy and paste this prompt into OpenCode:

```text
Using the Framefields skills you installed, create a 15-second video in my-film consisting of three 5-second scenes (0s–5s, 5s–10s, and 10s–15s):
- Scene 1 (0s–5s): Title card for "Crater Brew — The First Moon Café" over a dark starfield with a glowing crescent moon and smooth text reveal.
- Scene 2 (5s–10s): Menu board featuring "Zero-Gravity Espresso" and "Lunar Dust Croissant" with animated price tags and rising geometric steam shapes.
- Scene 3 (10s–15s): Outro card reading "Open Every Lunar Cycle — Sea of Tranquility" with a gentle zoom-out transition.

Use only local, code-driven Framefields shapes, text, and motion—do not call paid external AI media APIs. Before running any build or render command, inspect my-film/package.json and the local Framefields documentation/CLI help to verify the exact command for a test render or frame check, run it, and tell me where to view the result.
```

**Success check:** The agent writes the TypeScript composition, runs a verified script from `my-film/package.json` without errors, and points you to the rendered preview or frame output for all three 5-second scenes.

---

## Step 7: Make a Targeted Edit to Scene 2

Because your video is defined in code, you can revise a single scene without disturbing the rest of the project. Ask the agent to update Scene 2 while leaving Scenes 1 and 3 intact.

Copy and paste this prompt into OpenCode:

```text
Keep Scene 1 and Scene 3 exactly as they are. Make a targeted edit only to Scene 2 (5s–10s):
1. Change Scene 2's background to a warm copper-and-midnight gradient so it contrasts with Scene 1.
2. Add an animated corner badge reading "Freshly Roasted in Low Orbit".
3. Re-run the project's verified check or preview script to confirm the 15-second timeline builds cleanly.
```

**Success check:** Scenes 1 and 3 look identical to your first render, while Scene 2 (5s–10s) displays the copper-and-midnight gradient and the new corner badge.

---

## Step 8: Export Your Final MP4 Video

Finally, ask your agent to export a standard `.mp4` file you can play in Windows Media Player or share with friends. Rather than guessing command flags, instruct the agent to inspect the project's scripts first.

Copy and paste this prompt into OpenCode:

```text
Inspect my-film/package.json and the local Framefields CLI help or skill documentation to confirm the exact MP4 render command for this version of Framefields. Render our 15-second composition to my-film/output/moon-cafe.mp4, verify that the file exists and has a non-zero file size, and open the output folder in Windows File Explorer.
```

**Success check:** `my-film/output/moon-cafe.mp4` exists, has a file size above zero bytes, and plays a complete 15-second video across all three 5-second scenes when double-clicked.

---

## Optional: Paid Media Generation with Framefields Models or OpenRouter

The video you just created rendered locally on your GPU at no extra per-render cost. If you later want AI-generated voiceovers, music, custom illustrations, or video clips inside your project, you have two main options:

* **Framefields Models (`ai` from `framefields`):** As described in [https://github.com/gatewai-dev/framefields](https://github.com/gatewai-dev/framefields), Framefields includes an AI gateway for generating video clips, images, music, and speech from code once you configure a Framefields API key.
* **OpenRouter (`https://openrouter.ai`):** If you use an OpenRouter key instead, **always check the supported modalities of the model you pick**. Many OpenRouter models support text or still images only and cannot output audio or video. Ask your agent to verify both the model's supported input/output modalities and how Framefields integrates external providers before running paid calls.

---

## Essential Habits: API Key Privacy, Budgets, and Permissions

* **Protect your API keys:** Never paste secret keys into `.ts` source files or commit them to Git. Have your agent store keys in a local `.env` file and confirm `.env` is listed in `.gitignore`.
* **Set hard budget limits:** Before using paid media APIs, set a monthly spending cap in your OpenCode Go, Framefields, or OpenRouter billing dashboard so a retry loop cannot cause surprise charges.
* **Review permission prompts:** When OpenCode asks to run a command or edit files, read it first. Confirm it stays inside `video-workspace` and uses expected tools (`git`, `node`, `npm`, `npx`).

---

## Troubleshooting

* **`"git"` or `"opencode"` is not recognized:** Close PowerShell completely and open a new window so Windows reloads your `PATH`.
* **Node version is below 22:** Framefields requires `Node >=22`. Ask your agent to install Node 22+ LTS (`winget install OpenJS.NodeJS.LTS`), then restart PowerShell and OpenCode.
* **WebGPU errors during rendering:** Update your Windows GPU drivers (Intel, AMD, or NVIDIA) and run directly on your PC rather than over Remote Desktop.
* **The agent invents a command that fails:** Tell the agent: *"Stop guessing flags. Inspect `my-film/package.json` and the `gatewai-dev/framefields` skill files first, then run the documented command."*
