<script>
  import { onMount } from 'svelte';
  import { lessons } from '$lib/lessons.js';
  let current = $state(0);
  let done = $state([]);
  let topic = $state('How agents work: the tool-calling loop');
  let copied = $state('');
  let storageNote = $state('');
  let playing = $state(false);
  let scene = $state(0);
  const scenes = ['01 / YOU GIVE A GOAL', '02 / MODEL REQUESTS A TOOL', '03 / RESULT → NEXT STEP'];
  let lesson = $derived(lessons[current]);
  let completed = $derived(done.filter(Boolean).length);
  onMount(() => {
    try { const saved = JSON.parse(localStorage.getItem('agent-primer-v1') || 'null'); if (saved) {done = Array.isArray(saved.done) ? saved.done : []; current = Math.max(0, Math.min(lessons.length - 1, Number(saved.current) || 0)); topic = typeof saved.topic === 'string' ? saved.topic : topic;} } catch { storageNote = 'Progress is available for this visit only.'; }
    const timer = setInterval(() => {if (playing) scene = (scene + 1) % 3;}, 5000);
    return () => clearInterval(timer);
  });
  function save() { try {localStorage.setItem('agent-primer-v1', JSON.stringify({done,current,topic}));} catch {storageNote = 'Your browser could not save progress.';} }
  function go(i) {current = i; save(); window.scrollTo({top:0, behavior:'instant'});}
  function toggle() {done[current] = !done[current]; save();}
  async function copy(value, id) {try { await navigator.clipboard.writeText(value.replaceAll('[MY TOPIC]', topic || 'How agents work: the tool-calling loop')); copied = id; } catch {copied = 'failed';} }
</script>

<svelte:head>
  <title>So you’ve never used an agent? · Your first AI video</title>
  <meta name="description" content="A friendly Windows field guide to OpenCode, Git and your first AI-assisted video with Framefields. Small steps, copyable prompts, no coding experience needed." />
  <meta name="theme-color" content="#087d80" />
</svelte:head>

<a class="skip" href="#lesson">Skip to lesson</a>
<div class="desktop-bar"><span>✳ THE BEGINNER’S INTERNET CLUB</span><span>ONLINE SINCE NOV. 2026 <span class="online">●</span></span></div>
<div class="site">
  <header>
    <a class="wordmark" href="/" aria-label="Agent primer home"><span class="logo">a<span>↗</span></span><span>the agent<br/>primer<span class="version"> v1.0</span></span></a>
    <div class="header-note">A little help getting started.<br/><strong>A real video at the end.</strong></div>
    <span class="sticker">YOUR FIRST<br/>AGENT<br/>ADVENTURE!</span>
  </header>
  <div class="ticker"><span>★ YOU ARE HERE: YOUR FIRST AGENT ADVENTURE</span><span>WINDOWS EDITION · LEARN BY MAKING · TAKE YOUR TIME ★</span></div>
  <div class="layout">
    <aside>
      <div class="window-title"><span>▣ your_journey.exe</span><span aria-hidden="true">_ □ ×</span></div>
      <div class="sidebar-content">
        <p class="eyebrow">ONE SMALL STEP AT A TIME</p>
        <nav aria-label="Course lessons">{#each lessons as item, i}<button class:active={current === i} onclick={() => go(i)} aria-current={current === i ? 'step' : undefined}><span class="step-num" class:checked={done[i]}>{done[i] ? '✓' : String(i+1).padStart(2,'0')}</span><span>{item.short}</span>{#if current === i}<span class="arrow">➜</span>{/if}</button>{/each}</nav>
        <div class="progress-label"><span>YOUR PROGRESS</span><strong>{completed}/{lessons.length}</strong></div>
        <progress max={lessons.length} value={completed} aria-label="Completed lessons"></progress>
        <p class="save-note">{storageNote || 'Saved in this browser. Come back anytime.'}</p>
      </div>
      <div class="sticky-note"><span>✎ A friendly reminder</span><p>You don’t have to understand every line of code. You do get to decide what happens next.</p></div>
      <a class="help-link" href="#help">☏ Something stuck? Help desk ↓</a>
      <div class="badges"><span>100%<br/>HUMAN CURIOUS</span><span>BEST VIEWED<br/>WITH CURIOSITY</span></div>
    </aside>
    <main id="lesson" tabindex="-1">
      <div class="window-title main-title"><span>📂 field_guide / chapter_{String(current+1).padStart(2,'0')}</span><span aria-hidden="true">_ □ ×</span></div>
      <div class="page-content">
        <div class="chapter-meta"><span>CHAPTER {String(current+1).padStart(2,'0')} OF {String(lessons.length).padStart(2,'0')}</span><span>{lesson.tag}</span></div>
        <h1>{lesson.title}</h1>
        <p class="intro">{lesson.intro}</p>
        {#if current === 0}
          <div class="demo-window"><div class="demo-top"><span>▶ a_tiny_film.preview</span><span>ILLUSTRATIVE BROWSER DEMO</span></div><div class="moon-scene" class:second={scene === 1} class:third={scene === 2}><span class="star s1">✦</span><span class="star s2">✧</span><span class="star s3">✦</span><div class="agent-diagram"><div class:lit={scene === 0}><span>☺</span>YOU</div><b>→</b><div class:lit={scene === 1}><span>✳</span>MODEL</div><b>⇄</b><div class:lit={scene === 2}><span>⚒</span>TOOL</div></div><div class="demo-subtitle">{scene === 0 ? "Find the next train." : scene === 1 ? "lookup_timetable(destination)" : "Tool result returned to the model."}</div><div class="scene-caption">{scenes[scene]}</div></div><div class="player-controls"><button onclick={() => {playing = !playing;}} aria-label={playing ? 'Pause sample animation' : 'Play sample animation'}>{playing ? 'Ⅱ PAUSE' : '▶ PLAY IDEA'}</button><span>00:{String(scene*5).padStart(2,'0')} / 00:15</span><div class="film-ticks">{#each scenes as _, i}<button class:selected={scene === i} onclick={() => scene = i} aria-label={`Show scene ${i+1}`}></button>{/each}</div></div></div>
          <div class="welcome-grid"><div><span class="mini-label">THE MISSION</span><h3>Make a 15-second film.</h3><p>Pick a topic. Describe it to your agent. Watch a first draft, change something, and save an MP4 you can play.</p></div><div><span class="mini-label">PACK FOR THE TRIP</span><p>☑ A Windows 10/11 computer<br/>☑ An internet connection<br/>☑ $10/month for OpenCode Go<br/>☑ Your existing technical curiosity</p></div></div>
        {/if}
        {#each lesson.sections as section, index}
          <section class="lesson-section"><h2><span class="section-dot">{String(index+1).padStart(2,'0')}</span>{section.title}</h2>
            {#each section.paragraphs || [] as paragraph}<p>{@html paragraph}</p>{/each}
            {#if section.list}<ol>{#each section.list as item}<li>{@html item}</li>{/each}</ol>{/if}
            {#if section.code}<div class="code-box"><div class="code-title"><span>{section.kind || 'POWERSHELL · ONE LINE AT A TIME'}</span><button onclick={() => copy(section.code, `${current}-${index}`)}>{copied === `${current}-${index}` ? '✓ Copied' : 'Copy ↗'}</button></div><pre><code>{section.code.replaceAll('[MY TOPIC]', topic || 'How agents work: the tool-calling loop')}</code></pre></div>{/if}
            {#if section.note}<div class="note"><strong>★ Pocket note</strong><p>{@html section.note}</p></div>{/if}
          </section>
        {/each}
        {#if current === 4}<div class="topic-picker"><label for="topic">YOUR FILM TOPIC</label><input id="topic" bind:value={topic} oninput={() => setTimeout(save,0)} maxlength="200"/><div><button onclick={() => {topic = 'How agents work: the tool-calling loop'; save();}}>↻ Agent loop</button><button onclick={() => {topic = 'Three things I love about gardening'; save();}}>✿ My hobby</button><button onclick={() => {topic = 'A tiny travel guide to an imaginary island'; save();}}>⚑ Imaginary island</button></div><p>Your topic fills in the prompts in this chapter.</p></div>{/if}
        {#if copied === 'failed'}<p role="status">Copy wasn’t available. Select the text in the box and press Ctrl+C.</p>{/if}
        <div class="checkpoint"><label><input type="checkbox" checked={!!done[current]} onchange={toggle}/><span><strong>Checkpoint</strong><br/>{lesson.check}</span></label></div>
        <div class="chapter-nav">{#if current > 0}<button class="back" onclick={() => go(current-1)}>← Back</button>{:else}<span class="small-text">YOU’VE GOT THIS.</span>{/if}{#if current < lessons.length-1}<button class="next" onclick={() => go(current+1)}>Next: {lessons[current+1].short} →</button>{:else}<button class="next" onclick={() => go(0)}>Back to the beginning ↗</button>{/if}</div>
      </div>
    </main>
  </div>
  <section id="help" class="help-window"><div class="window-title"><span>☏ the_help_desk.txt</span><span>OPEN 24/7</span></div><div class="help-body"><h2>Stuck is a normal place to be.</h2><p>Copy the full error into OpenCode. Say what you expected, what you saw, and ask for one small fix. Remove passwords and keys first.</p><div class="faqs">{#each [ ['A command “is not recognized”', 'Close and reopen your terminal after installing. Check you are using PowerShell for this guide, and run the version checks again. Ask the agent to inspect PATH before reinstalling anything.'], ['PowerShell says scripts are disabled', 'Use npm.cmd or npx.cmd in place of npm or npx. This uses the Windows command wrapper. You do not need to disable your system’s execution policy.'], ['The agent keeps trying the same fix', 'Press Esc to interrupt. Ask it to summarize the error, inspect the current files and try a different approach. Save the exact error before changing models.'], ['Rendering is slow or the GPU fails', 'Ask for a single small test frame first. Tell the agent you use native Windows and ask it to check Framefields’ current D3D12/WARP instructions and GPU drivers. WARP can be much slower.'], ['I closed everything. How do I come back?', 'Open your film folder in File Explorer, right-click and choose Open in Terminal, then run opencode. Tell it to inspect the existing project and help you continue without overwriting your work.'], ['I reached a usage limit', 'Check the Go dashboard for the reset window. Wait, choose another included model, or deliberately buy extra usage. Extra usage and media generation have separate costs.'] ] as [question, answer]}<details><summary>{question}</summary><p>{answer}</p></details>{/each}</div></div></section>
  <footer><span>MADE FOR YOUR FIRST “HEY, I MADE THAT.”</span><span>✳ NO TRACKERS. NO ACCOUNT HERE. JUST YOU & A LITTLE HELP.</span><a href="#lesson">Back to top ↑</a></footer>
</div>
