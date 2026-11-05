// Adapted from agy’s initial draft; reviewed for a workflow led by the agent.
export const lessons = [
  {
    "short": "Start here",
    "tag": "THE BRIEF",
    "title": "So you’ve never used an agent?",
    "intro": "You know your way around a computer. Now let’s put an agent to work: make a short video, inspect the result, and ask for a better version.",
    "check": "I know what I’m making and which tools I’ll use.",
    "sections": [
      {
        "title": "Your first deliverable",
        "paragraphs": [
          "A 15-second explainer about how agents work. Three scenes: you give a goal; the model calls a tool; the result comes back and the agent continues. Prefer another topic? There’s a place to choose yours later.",
          "You’ll use <strong>OpenCode</strong> to work with an AI model, <strong>Git</strong> to checkpoint the files, and <strong>Framefields</strong> to turn the agent’s code into video. The first version uses text, shapes and motion. Generating media with another model is optional."
        ]
      },
      {
        "title": "What makes this an agent?",
        "paragraphs": [
          "A chat model can suggest a command. An agent can request a tool that runs it, read the result, and choose a next step. OpenCode supplies those tools and handles permissions; the model chooses how to use them.",
          "That loop is useful, but it can still get stuck or make bad calls. You supply the goal, grant the tools access, inspect the output, and steer. This course gives you a small project to practice that loop."
        ],
        "note": "We use native Windows and PowerShell throughout. OpenCode also supports <a href=\"https://opencode.ai/docs/windows-wsl\">WSL</a>, but you don’t need it for this course."
      }
    ]
  },
  {
    "short": "Git + Git LFS",
    "tag": "SETUP / WINDOWS",
    "title": "Give your work a save point.",
    "intro": "Install Git for version history and Git LFS for large media. You don’t need a GitHub account to use either locally.",
    "check": "Git is installed. I can leave identity and LFS setup to the agent.",
    "sections": [
      {
        "title": "Install Git for Windows",
        "list": [
          "Download the installer for your machine (x64 or ARM64) from <a href=\"https://git-scm.com/install/windows\">Git for Windows</a>. Run it and keep the recommended defaults, including command-line PATH access.",
          "Open a fresh PowerShell window from Start and run the checks below. Git for Windows normally includes Git LFS. If LFS is missing, you can let OpenCode install it during project setup."
        ],
        "code": "git --version\ngit lfs version"
      },
      {
        "title": "Optional: configure Git yourself",
        "paragraphs": [
          "You can skip this section: the agent will configure Git and LFS during project setup. These commands are here if you want to learn what it does.",
          "Git records a name and email on each commit. Replace the placeholders below with your chosen identity. A GitHub no-reply email works if you want to keep your personal address private. These optional commands set defaults for all your local repositories."
        ],
        "code": "git config --global user.name \"Your Name\"\ngit config --global user.email \"your-chosen-email@example.com\"\ngit lfs install\ngit config --global --get user.name\ngit config --global --get user.email",
        "note": "Git stores history. LFS stores pointers in that history and keeps large file content separately. We’ll track source media once the project exists; generated renders usually belong in .gitignore. Remote LFS storage and bandwidth can have quotas or charges."
      }
    ]
  },
  {
    "short": "Install OpenCode",
    "tag": "SETUP / WINDOWS",
    "title": "Meet your new workbench.",
    "intro": "Install the runtime and OpenCode, then start it in a dedicated workspace. From there, you’ll ask the agent to handle the project setup.",
    "check": "OpenCode opens inside my video-workspace folder.",
    "sections": [
      {
        "title": "Install Node.js LTS",
        "paragraphs": [
          "Download the Windows LTS installer from <a href=\"https://nodejs.org/en/download\">nodejs.org</a>. Framefields requires Node.js 22 or newer. Keep npm and PATH enabled, then reopen PowerShell."
        ],
        "code": "node --version\nnpm.cmd --version"
      },
      {
        "title": "Install OpenCode",
        "paragraphs": [
          "Run the commands below in PowerShell to install OpenCode and check it works. We use the <a href=\"https://opencode.ai/docs/\">documented npm installation</a> and its terminal interface for the initial connection."
        ],
        "code": "npm.cmd install -g opencode-ai\nopencode --version",
        "note": "The .cmd wrapper avoids PowerShell’s npm.ps1 execution-policy issue without changing your security policy. If opencode is not found, close and reopen the terminal."
      },
      {
        "title": "Start in an empty workspace",
        "paragraphs": [
          "Create a folder and start OpenCode there. The --auto option lets it work without repeated permission prompts; chapter 5 explains the access you’re granting."
        ],
        "code": "New-Item -ItemType Directory -Force -Path \"$HOME\\video-workspace\"\nSet-Location \"$HOME\\video-workspace\"\nopencode --auto",
        "note": "A workspace is the folder the agent works in. Auto mode lets commands run with your account’s access, so use a separate project and keep backups of work you care about. Chapter 5 covers the choice in more detail."
      }
    ]
  },
  {
    "short": "Connect a model",
    "tag": "YOUR FIRST CONNECTION",
    "title": "Pick a model. Start talking.",
    "intro": "OpenCode is the application; the model is the service it talks to. OpenCode Go is a straightforward way to fund this exercise.",
    "check": "My chosen model replies to a message in OpenCode.",
    "sections": [
      {
        "title": "Get OpenCode Go",
        "paragraphs": [
          "Subscribe to <a href=\"https://opencode.ai/console/go\">OpenCode Go ($10/month)</a> and create a Console API key. Check the checkout price before subscribing.",
          "In OpenCode, type <code>/connect</code>, choose OpenCode, and enter the key in the credential prompt."
        ],
        "code": "/connect",
        "kind": "INSIDE OPENCODE",
        "note": "Go has model-specific usage limits. Leave extra paid usage off unless you want it. Enter keys in credential prompts, not ordinary chat messages. Media-generation credits are separate."
      },
      {
        "title": "Start with DeepSeek V4.1 Flash",
        "paragraphs": [
          "Type <code>/models</code> and choose <strong>DeepSeek V4.1 Flash</strong> from OpenCode’s provider. It’s our suggested value starting point: its generous Go allowance is useful for learning and trying edits."
        ],
        "code": "/models",
        "kind": "INSIDE OPENCODE",
        "note": "Model choices checked 5 November 2026. If it struggles after you narrow the task, try DeepSeek V4 Pro or Kimi K3.1 Pro. Check availability and allowances in the <a href=\"https://opencode.ai/console/go\">live catalog</a>."
      },
      {
        "title": "Check the connection",
        "code": "Say hello and explain in two sentences what tools you can use in this session.",
        "kind": "SEND TO YOUR AGENT",
        "paragraphs": [
          "Once the model replies, you’re ready to hand the setup work to the agent."
        ]
      },
      {
        "title": "Optional: use your browser",
        "paragraphs": [
          "Prefer a browser? Now that your model is connected, exit the terminal interface and run <code>opencode web</code> from your workspace. It opens the browser interface; your files and agent still run locally.",
          "Keep that terminal open while you work; Ctrl+C stops the server. You can ask the agent to enable automatic permissions in the project settings."
        ],
        "code": "opencode web",
        "kind": "POWERSHELL · FROM YOUR WORKSPACE",
        "note": "Keep the default localhost address. OpenCode recommends WSL for its Windows web interface; if you hit a problem on native Windows, continue with the terminal interface. <a href=\"https://opencode.ai/docs/web/\">Browser guide ↗</a>"
      }
    ]
  },
  {
    "short": "Set up your film",
    "tag": "HAND OVER TO THE AGENT",
    "title": "Give it a goal and a workspace.",
    "intro": "Let the agent read the project documentation, install Framefields, and establish a Git checkpoint. Give it working instructions once, then describe the result you want.",
    "check": "My film project exists, the skill is available to OpenCode, and Git has a clean initial checkpoint.",
    "sections": [
      {
        "title": "Choose the subject",
        "paragraphs": [
          "Use the topic field above to choose your subject. Our suggested film explains the tool-calling loop: a person gives a goal; the model requests a tool; the result comes back and the model continues. Your choice fills in the setup and film prompts."
        ]
      },
      {
        "title": "Let the agent work: full permissions",
        "paragraphs": [
          "Silvio recommends giving the agent full permissions and letting it work. He has used this approach since he started with agents earlier this year and reports no problems. You can judge the result without approving every command.",
          "You’re choosing to give it your Windows account’s access. It can change or delete accessible files, read credentials, contact services and spend available API credit. The project folder is not a sandbox. You take responsibility for that choice; keep backups of work you care about.",
          "Clear tasks help: say what you want and whether deleting, publishing or spending is intended. Agents can still make mistakes or follow misleading material they read. Git can recover committed project files, not every external effect. If you prefer approval prompts, start with <code>opencode</code> instead of <code>opencode --auto</code>."
        ]
      },
      {
        "title": "Let it run without approval prompts",
        "paragraphs": [
          "If you started with <code>opencode --auto</code>, you’re already set. Otherwise choose “Enable auto-approve permissions” in the terminal command palette, or restart with <code>opencode --auto</code>.",
          "For a persistent setting, you can also tell OpenCode: “Add permission: allow to this project’s OpenCode settings, preserving the other settings.” Let the agent handle the configuration.",
          "Auto mode keeps explicit deny rules; <code>permission: allow</code> sets the general permission policy, though more specific agent rules can override it. Neither grants Windows administrator rights. See the <a href=\"https://opencode.ai/docs/permissions/\">permissions reference</a> if you want the details."
        ]
      },
      {
        "title": "Give it working instructions once",
        "paragraphs": [
          "These are reusable preferences for how the agent works. Send this once; it will save them in AGENTS.md when it creates the project. Later prompts can focus on what you want to make."
        ],
        "code": "Save these project preferences in my-film/AGENTS.md when you create the project:\n- Use native Windows and work in my-film. Preserve global settings.\n- Read the project docs and use the Framefields skill. Carry routine work through to a checked result without asking me to approve each command.\n- Commit useful milestones. Keep secrets and generated output out of Git; use LFS for large source media.\n- Ask for missing personal choices or a spending budget. Don’t publish or delete unrelated files unless I ask.\n- Tell me what changed, what you checked, and what you couldn’t check.",
        "kind": "SEND ONCE · WORKING INSTRUCTIONS",
        "note": "AGENTS.md supplies instructions; it does not enforce a security boundary. A skill is another set of instructions that teaches the agent a particular tool or workflow."
      },
      {
        "title": "Now give it the setup task",
        "paragraphs": [
          "This is the outcome you want. The agent can choose and verify the commands from the documentation; you don’t need to prescribe the entire installation procedure."
        ],
        "code": "Set up a Framefields project called my-film for a 15-second film about [MY TOPIC].\n\nFollow https://github.com/gatewai-dev/framefields and its current docs. Install the Framefields skill for OpenCode in this project. Check the prerequisites and handle any missing setup, including Git LFS.\n\nUse my existing Git identity, or ask for my chosen name and email if it’s missing. Create a local repository and initial commit. Tell me where the project is and how to preview it. We’ll make the film next.",
        "kind": "SEND TO YOUR AGENT · PROJECT BRIEF",
        "note": "The agent can find the installation commands in the documentation. A Framefields project uses the engine as a dependency; you don’t need to clone its source repository."
      },
      {
        "title": "Keep the project context clear",
        "paragraphs": [
          "Continue in the same OpenCode session; the agent knows where it created my-film. If you come back later, open my-film in File Explorer, choose “Open in Terminal,” and run <code>opencode --auto</code> (or <code>opencode web</code> for the browser). Ask it to continue the existing project.",
          "The agent handles commits. You can ask “Show me what changed since the last commit” whenever you want to learn how the source evolved. Git history is local until you choose to share it."
        ]
      }
    ]
  },
  {
    "short": "Make the first cut",
    "tag": "CREATE / INSPECT",
    "title": "Turn the idea into a timeline.",
    "intro": "Start with a tiny complete film. A working rough cut gives you something concrete to improve.",
    "check": "I have inspected frames from all three scenes and watched a rough cut.",
    "sections": [
      {
        "title": "Brief the agent",
        "code": "Make a 15-second, 1280x720, 30fps film about [MY TOPIC].\n\nFor the agent explainer, use three 5-second scenes:\n1. A person asks: “Find the next train.” Show request → model.\n2. The model requests a timetable lookup. Show model → tool call → timetable tool. This is an illustration, not a real API call.\n3. The tool returns departures. Show result → model → answer, with a loop arrow for possible further calls. Make clear that the application executes the tool.\n\nIf I chose another topic, adapt the three-scene structure to it. Use readable text, shapes and motion, with no external assets or paid generation.\n\nRender a rough MP4 and show me how to play it. Check representative frames from all three scenes.",
        "kind": "SEND TO YOUR AGENT"
      },
      {
        "title": "Watch it yourself",
        "paragraphs": [
          "Open the file or local preview the agent points you to. Check that you can read the labels, that arrows show the right direction, and that each scene lasts long enough to understand. The landing-page animation is just a browser illustration, not a Framefields render.",
          "For the agent explainer, check the technical story too: the model requests a tool call; the application executes it; its result is returned to the model. Some tasks need several loops. A tool call can fail, and access depends on the application and permissions."
        ],
        "note": "If setup or rendering fails, paste the exact error back to the agent. Ask for one small diagnosis and a test frame before a full render. The help desk below has common Windows fixes."
      }
    ]
  },
  {
    "short": "Improve + add media",
    "tag": "ITERATE / OPTIONAL GENERATION",
    "title": "Direct the next version.",
    "intro": "Give specific feedback. Once the film works, you can optionally try generated imagery, voice or video with a separate media budget.",
    "check": "I made a targeted revision, compared it with the first cut, and saved a Git checkpoint.",
    "sections": [
      {
        "title": "Try one focused revision",
        "code": "Revise only the middle scene: make the tool-call label larger, increase its contrast and hold it for at least two seconds. Keep the film 15 seconds long and the other scenes unchanged. Render the updated cut so I can compare it with the first version. Save a Git checkpoint.",
        "kind": "SEND TO YOUR AGENT",
        "paragraphs": [
          "If you chose another topic, swap the requested change for something that fits. Small, observable requests are easier to evaluate than “make it better.”"
        ]
      },
      {
        "title": "Optional: generate an asset",
        "paragraphs": [
          "Want a generated image, voice or clip? Start with <a href=\"https://framefields.dev/models/\">Framefields Models</a>, the built-in gateway, or use <a href=\"https://openrouter.ai/\">OpenRouter</a> if you prefer. Create an account and decide how much you’re willing to spend. These use separate credits from OpenCode Go.",
          "Tell the agent the asset you want, your provider and your budget. It can pick a suitable model and handle the integration. A model that understands video may not generate it; the agent should check its output support against the provider’s docs."
        ],
        "code": "I want one generated background image for the middle scene using Framefields Models (use OpenRouter instead if I specify it). Agree a total budget with me before spending.\n\nOnce we’ve chosen the budget, handle model selection and integration within it, including retries. Show me how to enter the API key locally without pasting it in chat, and add the image to the film without changing its duration.",
        "kind": "SEND TO YOUR AGENT",
        "note": "You choose the budget once; the agent can handle the work within it. Use provider spending controls where available and check actual charges. If a key leaks, revoke it—removing the file doesn’t erase Git history."
      }
    ]
  },
  {
    "short": "Export + keep going",
    "tag": "YOUR FINISHED FILE",
    "title": "“Hey, I made that.”",
    "intro": "Export the final MP4, play it outside the project, and keep the source so you can change it later.",
    "check": "My MP4 plays all 15 seconds, my source is committed, and I know where both live.",
    "sections": [
      {
        "title": "Ask for the final export",
        "code": "Export the final 15-second film to output/final-film.mp4 at 1280x720, 30fps, using H.264 if supported. Check the output and open its folder so I can play it.\n\nCommit the final source. Tell me where the source and MP4 live, anything you couldn’t verify, and how to resume this project later.",
        "kind": "SEND TO YOUR AGENT"
      },
      {
        "title": "Check the deliverable",
        "list": [
          "Double-click the MP4 in File Explorer. Does it open, play to the end and tell the intended story?",
          "Read every caption at normal playback speed. Check the beginning, scene boundaries and final frame.",
          "Keep the project folder and back it up. Git history on the same disk is not a backup. If sharing the source, check for secrets first and account for LFS storage on the remote."
        ],
        "note": "When sharing a repository that uses LFS, your collaborator needs Git LFS and access to the LFS objects as well as the Git repository. A downloadable source ZIP may not contain the media objects."
      },
      {
        "title": "A second lap",
        "paragraphs": [
          "Try a vertical version, replace the example tool with a calculator, or show a failed tool call followed by a recovery. Ask for one change, inspect the result, checkpoint it.",
          "You’ve practiced the core workflow: give a goal, let the agent use tools, inspect evidence, and steer the next step. The video is yours to keep building on."
        ]
      },
      {
        "title": "Reference shelf",
        "paragraphs": [
          "Setup: <a href=\"https://git-scm.com/install/windows\">Git for Windows</a> · <a href=\"https://git-lfs.com/\">Git LFS</a> · <a href=\"https://nodejs.org/en/download\">Node.js</a> · <a href=\"https://opencode.ai/docs/\">OpenCode docs</a>",
          "Video: <a href=\"https://github.com/gatewai-dev/framefields\">Framefields source and README</a> · <a href=\"https://framefields.dev/docs\">Framefields docs</a> · <a href=\"https://framefields.dev/models/\">Framefields Models</a> · <a href=\"https://openrouter.ai/\">OpenRouter</a>",
          "Pricing and model availability reviewed 5 November 2026. Check the linked provider pages for changes. This site doesn’t receive your prompts or API keys. Progress and your chosen topic are stored only in this browser."
        ]
      }
    ]
  }
];
