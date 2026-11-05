# Course Friction Review (`src/lib/lessons.js` & `src/routes/+page.svelte`)

## Executive Summary

The course now has a clear stance on autonomous permissions in Chapter 5, but several other chapters still make the learner do work the agent should handle, repeat `AGENTS.md` rules inside every prompt, add unnecessary mid-task approval stops, or bury actions beneath caveats.

Across the full course, the main sources of friction are:

1. **Manual pre-configuration of work the agent does later**: Chapter 2 gives a 5-line `git config` / `git lfs install` block (with placeholders the user has to edit manually) right after stating the agent can do this in Chapter 5.
2. **Repeated how-to-work instructions instead of outcome requests**: Chapter 5 saves working rules in `AGENTS.md` (read docs/skills first, keep `.env` and renders out of Git, track media with LFS, commit milestones, report unverified checks), and then Chapters 5, 6, 7, and 8 repeat those exact instructions in every prompt.
3. **Oversized prompts that prescribe plumbing**: Prompts in Chapters 5–8 range from 100 to 175 words because they dictate `package.json` checks, `git status`, `git diff`, `git lfs ls-files`, and `.gitignore` verification on every turn.
4. **Unnecessary approval stops and session restarts**:
   - Chapter 3 launches `opencode` without `--auto`, then Chapter 5 tells the already-connected user to run `opencode --auto` first (which requires quitting the session) instead of leading with the in-session toggle or asking the agent to update settings.
   - Chapter 7’s scene-revision prompt pauses for human approval before making a local Git commit (`"Once I approve the result, check git status and commit..."`).
   - Chapter 7’s optional media prompt forces a two-provider research comparison (`Framefields Models` vs. `OpenRouter`) before proposing a single asset.
5. **Caveats and optional detours that bury actions**:
   - Chapter 3 stops between launching OpenCode and connecting a model for a two-paragraph `opencode web` detour that cannot even be used until *after* Chapter 4.
   - Chapter 4 leads with billing caveats and fallback-model advice before the user has connected their key or sent a single message.
6. **UI placement bug in `+page.svelte`**: Chapter 5 Section 01 says *"The field below changes the subject in the next prompt"*, but `+page.svelte` renders the topic picker **below all six sections of Chapter 5**, *after* the prompts that use `[MY TOPIC]`.

---

## Detailed Recommendations & Replacement Text

### 1. Chapter 2 (`Git + Git LFS`) — Cut Manual Git & LFS Configuration

**Where:** [src/lib/lessons.js](file:///home/silvio/dev/so-youve-never-used-an-agent/src/lib/lessons.js#L7-L10)

**Friction:**
- **Making users manually do agent work:** Section 02 (*"Optional: configure Git yourself"*) gives a 5-line terminal script with placeholders (`"Your Name"`, `"your-chosen-email@example.com"`) and `git lfs install` before the user even has an agent, while admitting the agent will handle Git and LFS setup in Chapter 5.
- **Caveats burying action:** A dense lecture on LFS pointers, `.gitignore`, and remote bandwidth quotas appears before the user has created a project.

**Recommendation:**
Keep the Git for Windows installer and the 2-line version check (`git --version` and `git lfs version`), which is essential pre-agent verification. Replace Section 02’s manual command block with a brief explanation of what Git + LFS do and let the agent configure them in Chapter 5.

**Replacement text (`lessons[1]`):**
```js
{short:'Git + Git LFS',tag:'SETUP / WINDOWS',title:'Give your work a save point.',intro:'Install Git for version history and Git LFS for large media. You don’t need a GitHub account to use either locally.',check:'Git and Git LFS respond to version checks in PowerShell.',sections:[
{title:'Install Git for Windows',list:['Download the installer for your machine (x64 or ARM64) from <a href="https://git-scm.com/install/windows">Git for Windows</a>. Run it and keep the recommended defaults, including command-line PATH access.','Open a fresh PowerShell window from Start and run the version checks below. Git for Windows normally includes Git LFS; if the second check fails, install it from <a href="https://git-lfs.com/">git-lfs.com</a> and reopen PowerShell.'],code:'git --version\ngit lfs version'},
{title:'Let the agent configure Git later',paragraphs:['You don’t need to run manual <code>git config</code> or <code>git lfs install</code> commands now. During project setup in Chapter 5, the agent will initialize the repository, enable Git LFS, and ask what name and email you want on your commits.','If you plan to publish to GitHub later without exposing your personal address, you can give the agent a GitHub no-reply email. Commit identity is just label metadata on save points, not a login.'],note:'Git tracks code changes; Git LFS tracks large source media (like audio or video clips) without bloating history. Keep everything local for this course—remote LFS storage and bandwidth can have quotas or charges.'}
]},
```

---

### 2. Chapter 3 (`Install OpenCode`) — Remove the Mid-Setup `opencode web` Detour

**Where:** [src/lib/lessons.js](file:///home/silvio/dev/so-youve-never-used-an-agent/src/lib/lessons.js#L11-L16)

**Friction:**
- **Detour before the user can act:** Section 04 (*"Optional: use your browser"*) sits between launching OpenCode (Chapter 3) and connecting a model (Chapter 4), yet tells the user: *"After connecting your model in the next chapter, exit the terminal interface, stay in your workspace folder, and run the command below."*
- **Caveats burying action:** It spends two paragraphs and a long pocket note explaining `127.0.0.1`, network auth, Ctrl+C lifecycle, and native Windows vs. WSL browser issues, before recommending that users stick with the terminal route anyway.

**Recommendation:**
Remove Section 04 as a standalone setup step and fold `opencode web` into a one-sentence pocket note on Section 03 (or move it to Chapter 8’s reference shelf). Also, either launch `opencode --auto` here or keep `opencode` here and make Chapter 5 lead with the in-session auto-approve options (see Recommendation 4).

**Replacement text (`lessons[2]` sections 3–4 combined into section 3):**
```js
{title:'Start in an empty workspace',paragraphs:['Create a dedicated folder for this course and start OpenCode inside it. Run these commands one line at a time.'],code:'New-Item -ItemType Directory -Force -Path "$HOME\\video-workspace"\nSet-Location "$HOME\\video-workspace"\nopencode',note:'A workspace is the directory the agent works in; keep this exercise separate from employer repositories and confidential files. Prefer a browser UI later? Run <code>opencode web</code> from this folder after connecting your model (<a href="https://opencode.ai/docs/web/">browser guide ↗</a>), though the terminal interface is most reliable for native Windows rendering.'}
```

---

### 3. Chapter 4 (`Connect a model`) — Lead With Actions, Trim Defensive Prompting

**Where:** [src/lib/lessons.js](file:///home/silvio/dev/so-youve-never-used-an-agent/src/lib/lessons.js#L18-L22)

**Friction:**
- **Caveats burying actions:** Section 01 opens with subscription allowance caveats before telling the user to get an API key and run `/connect`. Section 02 introduces two fallback models (`DeepSeek V4 Pro`, `Kimi K3.1 Pro`) and a 10× spend note before the user has sent their first prompt.
- **Defensive prompt bloat:** Section 03’s hello prompt adds `"Do not change any files yet."` to a greeting, and its paragraph tacks on extra-usage and media-credit warnings that belong in Chapter 7 or the note.

**Recommendation:**
Put the action first in each section, move allowance/fallback details into the pocket note, and keep the connection check short and natural.

**Replacement text (`lessons[3]`):**
```js
{short:'Connect a model',tag:'YOUR FIRST CONNECTION',title:'Pick a model. Start talking.',intro:'OpenCode is the application; the model is the service it talks to. OpenCode Go is a straightforward way to fund this exercise.',check:'My chosen model replies to a message in OpenCode.',sections:[
{title:'Get OpenCode Go',paragraphs:['Subscribe to <a href="https://opencode.ai/console/go">OpenCode Go ($10/month)</a> and create a Console API key.','In OpenCode, type <code>/connect</code>, choose OpenCode, and paste the key into the credential prompt—never into an ordinary chat message.'],code:'/connect',kind:'INSIDE OPENCODE',note:'OpenCode Go has model-specific usage limits rather than unlimited usage. Check current checkout pricing and allowances before subscribing, and leave extra paid usage off unless you deliberately want it.'},
{title:'Select DeepSeek V4.1 Flash',paragraphs:['Type <code>/models</code> and choose <strong>DeepSeek V4.1 Flash</strong> from OpenCode’s provider. It has a generous allowance in the current Go catalog, making it a practical starting point for learning the workflow.'],code:'/models',kind:'INSIDE OPENCODE',note:'Model advice checked 5 November 2026. If a task still struggles after you narrow the prompt, try <strong>DeepSeek V4 Pro</strong> or <strong>Kimi K3.1 Pro</strong> from the <a href="https://opencode.ai/console/go">live Go catalog</a>.'},
{title:'Check the connection',code:'Say hello and explain in two sentences what tools you can use in this session.',kind:'SEND TO YOUR AGENT',paragraphs:['Once the model replies, you’re ready to hand over setup work to the agent instead of running commands by hand.']}
]},
```

---

### 4. Chapter 5 (`Set up your film`) — Fix In-Session Auto-Approve Order, Streamline Setup Prompts, and Drop Manual Git Policing

**Where:** [src/lib/lessons.js](file:///home/silvio/dev/so-youve-never-used-an-agent/src/lib/lessons.js#L23-L30)

**Friction:**
1. **Session restart friction in Section 03 (*"Let it run without approval prompts"*):** Because the user is *already inside* `opencode` from Chapters 3 and 4, telling them first to *"Run `opencode --auto`"* implies exiting to PowerShell and restarting. Putting the in-session actions first (command palette or telling the agent to set `permission: allow` in project settings) lets them keep going without restarting, while mentioning `opencode --auto` for future launches.
2. **Two back-to-back setup prompts with duplicated instructions (Sections 04 & 05):**
   - Section 04 sends a 140-word prompt to create `AGENTS.md` in `video-workspace` *and* asks the agent to remember to copy it into `my-film/AGENTS.md` later when `my-film` exists.
   - Section 05 immediately sends a 110-word setup prompt that repeats half of `AGENTS.md` (check tools, read docs, set up Git + LFS, ask for commit identity, save checkpoint).
3. **Making users manually police Git and directories (Section 06 *"Keep the project context clear"*):**
   - Tells the user: *"Ask for `git status` after each milestone. Commit the source and small configuration files; store chosen large source assets with LFS."* That is the agent’s job, and `AGENTS.md` just instructed the agent to do it!

**Recommendation:**
- Preserve Section 02 (*"Let the agent work: full permissions"*) in full—its risk explanation is clear, accurate, and well-scoped.
- In Section 03, lead with the in-session command palette / telling the agent to save `permission: allow`, and note `opencode --auto` for launching from PowerShell.
- Keep `AGENTS.md` concise so it genuinely replaces repeated instructions across Chapters 5–8, and have Section 05 focus on the project outcome.
- Replace Section 06’s manual `git status` policing with a short pocket note on how to reopen the project later (`opencode --auto` inside `my-film`).

**Replacement text (`lessons[4]` sections 3–6):**
```js
{"title": "Let it run without approval prompts", "paragraphs": ["In your open OpenCode session, choose “Enable auto-approve permissions” from the command palette, or tell the agent: “Add permission: allow to this project’s OpenCode settings, preserving existing settings.”", "When starting OpenCode from PowerShell in future sessions, simply run <code>opencode --auto</code>.", "Auto mode keeps explicit deny rules; <code>permission: allow</code> sets the general permission policy, though more specific agent rules can override it. Neither grants Windows administrator rights. See the <a href=\"https://opencode.ai/docs/permissions/\">permissions reference</a> for details."]},
{"title": "Give it working instructions once", "paragraphs": ["Set your working rules once in <code>AGENTS.md</code> so you don’t have to repeat Git, environment, and verification instructions in every prompt."], "code": "Save these working instructions in AGENTS.md (and in my-film/AGENTS.md once created), preserving any existing instructions:\n- Native Windows environment. Work in my-film and keep global settings unchanged.\n- Read current project files, installed skills, and docs before running commands.\n- Carry routine setup, edits, renders, and checks through to completion without asking per-command approval. Ask only when a missing decision changes the task (such as Git commit identity or any paid API spend).\n- Keep secrets (.env) and generated renders out of Git. Track large source media with Git LFS. Commit clean checkpoints after each completed milestone.\n- Never upload, publish, buy services, or delete unrelated files unless asked.\n- Briefly report what changed, how to preview/open the result, and any check you could not verify.", "kind": "SEND ONCE · WORKING INSTRUCTIONS", "note": "AGENTS.md supplies instructions; it does not enforce a security boundary. A skill is another set of instructions that teaches the agent a specific tool or workflow."},
{"title": "Now give it the setup task", "paragraphs": ["Describe the project setup you want and let the agent handle the scaffold, skill installation, and initial Git checkpoint."], "code": "Set up a Framefields project called my-film for a 15-second film about [MY TOPIC], following https://github.com/gatewai-dev/framefields.\n\nScaffold the project, install the Framefields skill for OpenCode in project scope, and confirm you can read the skill. Initialize Git and Git LFS in my-film (ask for my commit name and email only if not already configured), save an initial commit, and tell me how to preview and render the project.", "kind": "SEND TO YOUR AGENT · PROJECT BRIEF", "note": "For reference, the documented scaffold is <code>npx.cmd framefields init my-film --install</code> and the skill installer is <code>npx.cmd skills add gatewai-dev/framefields</code>. Let the agent run these rather than running them yourself. If you close OpenCode later, reopen PowerShell in <code>my-film</code> and run <code>opencode --auto</code>."}
```

---

### 5. Chapter 6 (`Make the first cut`) — Remove Repeated `AGENTS.md` Rules from the Storyboard Prompt

**Where:** [src/lib/lessons.js](file:///home/silvio/dev/so-youve-never-used-an-agent/src/lib/lessons.js#L31-L34)

**Friction:**
- **Repeated how-to-work instructions & oversized prompt (175 words):**
  - *"Use the installed skill and inspect the current project before editing."* → Already in `AGENTS.md`.
  - *"Verify preview and render commands from package.json and installed documentation."* → Already in `AGENTS.md`, and the agent just reported those commands at the end of Chapter 5.
  - *"Do not claim visual checks you cannot perform."* → Already in `AGENTS.md`.

**Recommendation:**
Focus the prompt on the creative brief and the tangible deliverables (midpoint test frames + rough MP4 render).

**Replacement text (`lessons[5].sections[0]`):**
```js
{title:'Brief the agent',code:'In my-film, create a 15-second, 1280x720, 30fps Framefields explainer about [MY TOPIC] using readable text, simple shapes, and clear motion (no paid API calls or external assets).\n\nFor the default agent topic, build three 5-second scenes:\n1. A person gives a goal: "Find the next train." Show request → model.\n2. The model requests a timetable lookup: model → tool call → timetable tool (illustrative only; do not call a real API).\n3. The tool returns departure data: tool result → model → answer, with a loop arrow showing the application runs the tool and the model can call tools again.\n\nIf [MY TOPIC] is different, build an equivalent three-scene storyboard for it.\n\nRender a test frame at each scene midpoint to check layout and legibility, then render a rough MP4 and tell me the file path so I can watch it.',kind:'SEND TO YOUR AGENT'}
```

---

### 6. Chapter 7 (`Improve + add media`) — Remove the Commit Approval Stop, Code-Diff Request, and Two-Provider Research Detour

**Where:** [src/lib/lessons.js](file:///home/silvio/dev/so-youve-never-used-an-agent/src/lib/lessons.js#L35-L38)

**Friction:**
1. **Section 01 (*"Try one focused revision"*):**
   - **Unnecessary approval stop:** `"Once I approve the result, check git status and commit this revision, excluding secrets and generated output."` Committing a local Git save point after rendering a revision does not require a human approval gate—and `AGENTS.md` already tells the agent to commit milestones excluding secrets and renders.
   - **Making the user inspect source code diffs:** `"Show the source diff..."` asks a video-course learner to review code diffs in chat instead of watching the rendered video.
2. **Section 02 (*"Optional: generate an asset"*):**
   - **Oversized prompt (143 words) + mandatory multi-provider comparison:** Forces the agent to research and compare *both* Framefields Models and OpenRouter from official docs before proposing a single optional clip. Framefields Models is the built-in gateway; OpenRouter only needs a brief mention in the text for users who already prefer it.
   - **Repeated plumbing instructions:** Dictates `FRAMEFIELDS_API_KEY in .env`, `Confirm .env is ignored and unstaged`, `Save the approved asset under assets/`, and `track it with Git LFS`—all of which are already covered by `AGENTS.md` and the Framefields skill.

**Recommendation:**
- Make Section 01 a clean, single-turn revision request that renders the updated cut and saves a checkpoint.
- Make Section 02 ask for one small asset proposal with an estimated cost (keeping the essential approval gate before paid spend and keeping the API key out of chat) while letting the skill and `AGENTS.md` handle `.env` and Git LFS details.

**Replacement text (`lessons[6].sections`):**
```js
{title:'Try one focused revision',code:'In my-film, revise only the middle scene: make the tool-call label larger, increase its contrast, and hold it for at least two seconds. Keep the film 15 seconds long and leave the other scenes unchanged.\n\nRender the updated cut, tell me where to watch it compared with the first cut, and commit this revision.',kind:'SEND TO YOUR AGENT',paragraphs:['If you chose another topic, ask for one specific visual change in a single scene. Small, observable requests are much easier to judge than “make it better.”']},
{title:'Optional: generate an asset',paragraphs:['Your film is already AI-assisted: the agent wrote its code. If you also want generated imagery, voice, or music, <a href="https://framefields.dev/models/">Framefields Models</a> is the built-in gateway catalog (or you can ask the agent to use <a href="https://openrouter.ai/docs/guides/overview/multimodal/video-generation">OpenRouter</a> if you already have an account there).','These services require a separate account, API key, and balance—OpenCode Go does not fund media generation. Ask the agent to propose one small asset and its cost before you spend anything.'],code:'I want to add one optional generated asset to my-film using Framefields Models (or OpenRouter if I specify it). Propose one small asset that fits our 15-second timeline and estimate its cost from current docs.\n\nStop and ask me to approve the asset and maximum spend before making any paid API request or retry. Guide me through saving the API key directly in .env without pasting it into chat, then generate the asset, track it with LFS, and render the updated film.',kind:'SEND TO YOUR AGENT',note:'Use provider spending limits where available and check actual charges after generating. If a key is ever pasted into chat or committed to Git, revoke and regenerate it immediately—deleting a file in a new commit does not erase it from Git history.'}
```

---

### 7. Chapter 8 (`Export + keep going`) — Replace the 113-Word Boilerplate Prompt With a Clear Outcome Request

**Where:** [src/lib/lessons.js](file:///home/silvio/dev/so-youve-never-used-an-agent/src/lib/lessons.js#L39-L44)

**Friction:**
- **Repeated how-to-work instructions:** By Chapter 8, the agent has already rendered the film in Chapters 6 and 7. Telling it again to *"inspect package.json and the installed Framefields render documentation"*, *"Report anything you could not check"*, *"Check git status and review the diff"*, *"ensuring .env, dependencies and generated output remain excluded"*, and *"Check git lfs ls-files for any source media"* repeats `AGENTS.md` line for line.
- **Hardcoded filename:** `output/agent-explainer.mp4` ignores custom topics chosen in `[MY TOPIC]`.

**Recommendation:**
Replace with a concise outcome prompt that exports the final MP4, verifies the output file, commits the final source checkpoint, and opens File Explorer so the user can watch it.

**Replacement text (`lessons[7].sections[0]`):**
```js
{title:'Ask for the final export',code:'In my-film, export our finished 15-second film to output/final-film.mp4 (H.264, 1280x720, 30fps). Verify the output file’s duration, resolution, and file size, commit the final source checkpoint, and open the output folder in Windows File Explorer so I can play the video.',kind:'SEND TO YOUR AGENT'}
```

---

### 8. UI Fix (`src/routes/+page.svelte`) — Place the Topic Picker Directly Below Chapter 5 Section 01

**Where:** [src/routes/+page.svelte](file:///home/silvio/dev/so-youve-never-used-an-agent/src/routes/+page.svelte#L64-L72)

**Friction:**
- Chapter 5 Section 01 (*"Choose the subject"*) tells the user: *"The field below changes the subject in the next prompt."*
- However, `+page.svelte` renders `{#if current === 4}<div class="topic-picker">...</div>{/if}` **after** the `{#each lesson.sections}` loop (at line 72). Users reading down the page see Section 01 refer to *"the field below"*, scroll past Sections 02–06 (including the Section 05 prompt that uses `[MY TOPIC]`), and only discover the input box at the very bottom of the page above the checkpoint.
- In addition, the helper text says *"Your topic fills in the prompts in this chapter"*, even though `[MY TOPIC]` also fills in Chapter 6’s storyboard prompt.

**Recommendation:**
Render `.topic-picker` inside the `{#each lesson.sections}` loop right after Section 01 (`{#if current === 4 && index === 0}`), and update its caption to note that it updates prompts across the course.

**Replacement text (`src/routes/+page.svelte` lines 64–72):**
```svelte
        {#each lesson.sections as section, index}
          <section class="lesson-section"><h2><span class="section-dot">{String(index+1).padStart(2,'0')}</span>{section.title}</h2>
            {#each section.paragraphs || [] as paragraph}<p>{@html paragraph}</p>{/each}
            {#if section.list}<ol>{#each section.list as item}<li>{@html item}</li>{/each}</ol>{/if}
            {#if section.code}<div class="code-box"><div class="code-title"><span>{section.kind || 'POWERSHELL · ONE LINE AT A TIME'}</span><button onclick={() => copy(section.code, `${current}-${index}`)}>{copied === `${current}-${index}` ? '✓ Copied' : 'Copy ↗'}</button></div><pre><code>{section.code.replaceAll('[MY TOPIC]', topic || 'How agents work: the tool-calling loop')}</code></pre></div>{/if}
            {#if section.note}<div class="note"><strong>★ Pocket note</strong><p>{@html section.note}</p></div>{/if}
          </section>
          {#if current === 4 && index === 0}<div class="topic-picker"><label for="topic">YOUR FILM TOPIC</label><input id="topic" bind:value={topic} oninput={() => setTimeout(save,0)} maxlength="200"/><div><button onclick={() => {topic = 'How agents work: the tool-calling loop'; save();}}>↻ Agent loop</button><button onclick={() => {topic = 'Three things I love about gardening'; save();}}>✿ My hobby</button><button onclick={() => {topic = 'A tiny travel guide to an imaginary island'; save();}}>⚑ Imaginary island</button></div><p>Your topic fills in the prompts in this chapter and the next.</p></div>{/if}
        {/each}
```
