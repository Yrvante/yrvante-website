import React, { useEffect, useRef, useState } from 'react';

const LOGO_URL = "https://customer-assets.emergentagent.com/job_a2868257-4a63-4a64-87b7-72ff6867dc17/artifacts/gwcgd4lw_Yrvante%20logo%20en%20naam%20en%20slogan%20.jpeg";

const HeroAnimation = () => {
  const [started, setStarted] = useState(true);
  const stageRef = useRef(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      setTimeout(() => {
        runLoop();
      }, 1000);
    }
  }, []);

  const lines = [
  { h: '<span class="cm">&lt;!-- Yrvante --&gt;</span>', p: null },
  { h: '<span class="ct">&lt;!DOCTYPE html&gt;</span>', p: null },
  { h: '<span class="ct">&lt;<span class="ca">html</span> lang=<span class="cv">"nl"</span>&gt;</span>', p: null },
  { h: '<span class="ct">  &lt;<span class="ca">head</span>&gt;</span>', p: null },
  { h: '<span class="cw">    &lt;<span class="ct">title</span>&gt;<span class="cv">Yrvante</span>&lt;/<span class="ct">title</span>&gt;</span>', p: null },
  { h: '<span class="ct">  &lt;/<span class="ca">head</span>&gt;</span>', p: null },
  { h: '<span class="ct">  &lt;<span class="ca">body</span>&gt;</span>', p: null },
  { h: '<span class="cw">    &lt;<span class="ct">header</span>&gt;</span>', p: 'navbar' },
  { h: '<span class="cp">      &lt;<span class="ct">nav</span>&gt;Yrvante&lt;/<span class="ct">nav</span>&gt;</span>', p: null },
  { h: '<span class="cw">    &lt;/<span class="ct">header</span>&gt;</span>', p: null },
  { h: '<span class="cw">    &lt;<span class="ct">section</span> class=<span class="cv">"hero"</span>&gt;</span>', p: null },
  { h: '<span class="cp">      &lt;<span class="ct">h1</span>&gt;Smart Web & Software&lt;/<span class="ct">h1</span>&gt;</span>', p: 'hero' },
  { h: '<span class="ck">      &lt;<span class="ct">p</span>&gt;Moderne websites&lt;/<span class="ct">p</span>&gt;</span>', p: null },
  { h: '<span class="cp">      &lt;<span class="ct">button</span>&gt;Contact&lt;/<span class="ct">button</span>&gt;</span>', p: 'btn' },
  { h: '<span class="cw">    &lt;/<span class="ct">section</span>&gt;</span>', p: null },
  { h: '<span class="cw">    &lt;<span class="ct">section</span> class=<span class="cv">"services"</span>&gt;</span>', p: null },
  { h: '<span class="cp">      &lt;<span class="ct">div</span>&gt;Web Design&lt;/<span class="ct">div</span>&gt;</span>', p: 'cards' },
  { h: '<span class="cp">      &lt;<span class="ct">div</span>&gt;Development&lt;/<span class="ct">div</span>&gt;</span>', p: null },
  { h: '<span class="cw">    &lt;/<span class="ct">section</span>&gt;</span>', p: null },
  { h: '<span class="cw">    &lt;<span class="ct">footer</span>&gt;</span>', p: 'footer' },
  { h: '<span class="cp">      &lt;<span class="ct">p</span>&gt;© Yrvante&lt;/<span class="ct">p</span>&gt;</span>', p: null },
  { h: '<span class="cw">    &lt;/<span class="ct">footer</span>&gt;</span>', p: null },
  { h: '<span class="ct">  &lt;/<span class="ca">body</span>&gt;</span>', p: null },
  { h: '<span class="ct">&lt;/<span class="ca">html</span>&gt;</span>', p: null }];


  const previews = {
    navbar: `<div class="pw p-navbar"><div class="p-nb-logo"></div><div class="p-nb-links"><div class="p-nb-link"></div><div class="p-nb-link"></div><div class="p-nb-link"></div></div></div>`,
    hero: `<div class="pw p-hero"><div class="p-h1"></div><div class="p-hsub"></div><div class="p-btn"></div></div>`,
    btn: ``,
    cards: `<div class="pw p-cards"><div class="p-card"></div><div class="p-card"></div><div class="p-card"></div></div>`,
    footer: `<div class="pw p-footer"><div class="p-ft"></div></div>`
  };

  const runLoop = () => {
    const stage = stageRef.current;
    if (!stage) return;

    const split = stage.querySelector('#sceneSplit');
    const editor = stage.querySelector('#editorPanel');
    const pbody = stage.querySelector('#previewBody');
    const real = stage.querySelector('#realSite');
    const cc = stage.querySelector('#codeCol');
    const lnEl = stage.querySelector('#ln');
    const wf = stage.querySelector('#wireframes');
    const blackFade = stage.querySelector('#blackFade');
    const sceneFinal = stage.querySelector('#sceneFinal');

    // Clear previous
    cc.innerHTML = '';
    lnEl.innerHTML = '';
    wf.innerHTML = '';
    cc.style.transform = 'translateY(0)';
    stage.classList.remove('white');

    // Reset classes
    split.className = 'scene-split';
    editor.className = 'editor-panel';
    pbody.className = 'preview-body';
    real.className = 'real-site';

    // Reset scene 2 elements
    ['rsH1', 'rsSub', 'rsRule', 'rsTagline'].forEach((id) => {
      const el = stage.querySelector(`#${id}`);
      if (el) {
        el.classList.remove('show');
        el.style.cssText = '';
      }
    });

    // Reset scene 3
    sceneFinal.style.opacity = '0';
    const fLogo = stage.querySelector('#finalLogo');
    if (fLogo) {
      fLogo.style.opacity = '0';
      fLogo.style.transform = 'scale(0.9)';
    }

    // Reset nav
    const nav = stage.querySelector('.rs-nav');
    const chrome = stage.querySelector('.rs-chrome');
    if (nav) nav.style.cssText = '';
    if (chrome) chrome.style.cssText = '';

    // Line numbers
    for (let i = 1; i <= lines.length + 2; i++) {
      const s = document.createElement('span');
      s.textContent = i;
      lnEl.appendChild(s);
    }

    // Fade in from black
    blackFade.style.transition = 'none';
    blackFade.style.opacity = '1';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        split.classList.add('active');
        setTimeout(() => {
          blackFade.style.transition = 'opacity 1s ease';
          blackFade.style.opacity = '0';
        }, 300);
      });
    });

    const wrap = stage.querySelector('#codeWrap');
    const LINE_H = 9 * 1.65;
    const VISIBLE = Math.floor((wrap?.offsetHeight || 200) / LINE_H);
    let visCount = 0;
    let scrollOff = 0;
    let delay = 2000;
    const SPD = 120; // Slower, more relaxed typing

    lines.forEach((line) => {
      const el = document.createElement('div');
      el.className = 'cl';
      el.innerHTML = line.h;
      cc.appendChild(el);

      setTimeout(() => {
        stage.querySelectorAll('.cl.typing').forEach((e) => {
          e.classList.remove('typing');
          e.classList.add('show');
        });
        el.classList.add('typing');

        visCount++;
        if (visCount > VISIBLE) {
          scrollOff += LINE_H;
          cc.style.transform = `translateY(-${scrollOff}px)`;
        }

        if (line.p && previews[line.p]) {
          const tmp = document.createElement('div');
          tmp.innerHTML = previews[line.p];
          while (tmp.firstChild) {
            const child = tmp.firstChild;
            wf.appendChild(child);
            setTimeout(() => {
              if (child.classList?.contains('pw')) child.classList.add('show');
            }, 100);
          }
        }
      }, delay);

      delay += line.h.includes('"cm"') ? SPD * 1.8 : SPD;
    });

    const T = delay + 800; // Longer pause after code

    // Morph to real site
    setTimeout(() => {
      stage.querySelectorAll('.cl.typing').forEach((e) => e.classList.remove('typing'));
      stage.querySelectorAll('#wireframes .pw').forEach((el) => el.classList.add('fadeout'));

      setTimeout(() => {
        editor.classList.add('collapse');
        pbody.classList.add('expand');

        setTimeout(() => {
          real.classList.add('show');
          stage.classList.add('white');

          // Slower, more graceful text reveals
          setTimeout(() => stage.querySelector('#rsH1')?.classList.add('show'), 600);
          setTimeout(() => stage.querySelector('#rsRule')?.classList.add('show'), 1400);
          setTimeout(() => stage.querySelector('#rsSub')?.classList.add('show'), 2200);
          setTimeout(() => stage.querySelector('#rsTagline')?.classList.add('show'), 3200);
        }, 500);
      }, 400);
    }, T);

    const morphStart = T + 400 + 500 + 3200 + 6000; // Much longer display time

    // Scene 2 → 3
    setTimeout(() => {
      ['rsH1', 'rsRule', 'rsSub', 'rsTagline'].forEach((id) => {
        const el = stage.querySelector(`#${id}`);
        if (el) {
          el.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
          el.style.opacity = '0';
          el.style.transform = 'translateY(-10px)';
        }
      });

      if (nav) {
        nav.style.transition = 'opacity 1s ease';
        nav.style.opacity = '0';
      }
      if (chrome) {
        chrome.style.transition = 'opacity 1s ease';
        chrome.style.opacity = '0';
      }

      setTimeout(() => {
        sceneFinal.style.opacity = '1';
        const fLogo = stage.querySelector('#finalLogo');
        setTimeout(() => {
          if (fLogo) {
            fLogo.style.transition = 'opacity 1.5s ease, transform 1.5s cubic-bezier(0.16,1,0.3,1)';
            fLogo.style.opacity = '1';
            fLogo.style.transform = 'scale(1)';
          }
        }, 400);
      }, 1200);
    }, morphStart);

    // Loop - longer final display
    const loopStart = morphStart + 1200 + 1400 + 7000;
    setTimeout(() => {
      blackFade.style.transition = 'opacity 1.5s ease';
      blackFade.style.opacity = '1';
      setTimeout(() => runLoop(), 1500);
    }, loopStart);
  };

  return (
    <div className="hero-animation-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=JetBrains+Mono:wght@300;400&family=DM+Sans:wght@400;500&display=swap');
        
        .hero-animation-wrapper {
          width: 100%;
          background: linear-gradient(180deg, #000 0%, #0a0a0a 100%);
          overflow: hidden;
        }
        
        .stage {
          width: 100%;
          height: 55vh;
          min-height: 380px;
          max-height: 500px;
          background: transparent;
          overflow: hidden;
          position: relative;
          transition: background 0.8s ease;
        }
        .stage.white { background: #fff; }
        
        .scene-split {
          position: absolute;
          inset: 0;
          display: flex;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .scene-split.active { opacity: 1; }
        
        .editor-panel {
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255,255,255,0.08);
          transition: width 1.4s cubic-bezier(0.25,0.1,0.25,1), opacity 1.2s ease;
          overflow: hidden;
          background: rgba(0,0,0,0.3);
        }
        .editor-panel.collapse { width: 0%; opacity: 0; }
        
        .topbar {
          height: 32px;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          padding: 0 14px;
          gap: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dr { background: #ff5f57; }
        .dy { background: #febc2e; }
        .dg { background: #28c840; }
        
        .tabs { display: flex; margin-left: 12px; gap: 2px; }
        .tab {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          padding: 0 12px;
          letter-spacing: 0.02em;
          line-height: 32px;
          font-family: 'JetBrains Mono', monospace;
          border-radius: 4px 4px 0 0;
        }
        .tab.on { 
          color: rgba(255,255,255,0.8); 
          background: rgba(255,255,255,0.05);
        }
        
        .editor-body {
          flex: 1;
          padding: 12px 0;
          display: flex;
          overflow: hidden;
          position: relative;
        }
        .ln {
          display: flex;
          flex-direction: column;
          color: rgba(255,255,255,0.15);
          font-size: 9px;
          line-height: 1.65;
          padding: 0 12px;
          text-align: right;
          user-select: none;
          min-width: 32px;
          flex-shrink: 0;
          font-family: 'JetBrains Mono', monospace;
        }
        .code-scroll-wrap {
          flex: 1;
          overflow: hidden;
          position: relative;
          padding-right: 12px;
        }
        .code-col {
          display: flex;
          flex-direction: column;
          transition: transform 0.6s cubic-bezier(0.25,0.1,0.25,1);
        }
        .code-scroll-wrap::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 30px;
          background: linear-gradient(rgba(0,0,0,0.8), transparent);
          z-index: 2;
          pointer-events: none;
        }
        .code-scroll-wrap::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40px;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          z-index: 2;
          pointer-events: none;
        }
        
        .cl {
          font-size: 9px;
          line-height: 1.65;
          white-space: pre;
          overflow: hidden;
          max-width: 100%;
          opacity: 0;
          height: 0;
          font-family: 'JetBrains Mono', monospace;
          transition: opacity 0.4s ease, height 0.2s ease;
        }
        .cl.show { opacity: 1; height: 1.65em; }
        .cl.typing { 
          opacity: 1; 
          height: 1.65em;
        }
        .cl.typing::after {
          content: '|';
          color: #fff;
          animation: blink 0.8s infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .cm { color: rgba(255,255,255,0.25); }
        .ct { color: rgba(255,255,255,0.5); }
        .ca { color: #7dd3fc; }
        .cv { color: #fde68a; }
        .cw { color: rgba(255,255,255,0.7); }
        .cp { color: rgba(255,255,255,0.6); }
        .ck { color: rgba(255,255,255,0.5); }
        
        .preview-panel {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: flex 1s cubic-bezier(0.4,0,0.2,1);
          background: rgba(0,0,0,0.2);
        }
        
        .preview-body {
          flex: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow: hidden;
          position: relative;
          transition: padding 0.8s ease;
        }
        .preview-body.expand { padding: 0; }
        
        .pw {
          border-radius: 4px;
          opacity: 0;
          transform: translateY(8px) scale(0.98);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.25,0.1,0.25,1);
          flex-shrink: 0;
        }
        .pw.show { opacity: 1; transform: translateY(0) scale(1); }
        .pw.fadeout { 
          opacity: 0; 
          transform: translateY(-10px) scale(1.02); 
          transition: opacity 1s ease, transform 1s ease; 
        }
        
        .p-navbar {
          height: 28px;
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 0 12px;
          gap: 8px;
        }
        .p-nb-logo { width: 50px; height: 8px; background: rgba(255,255,255,0.2); border-radius: 2px; }
        .p-nb-links { margin-left: auto; display: flex; gap: 8px; }
        .p-nb-link { width: 24px; height: 6px; background: rgba(255,255,255,0.1); border-radius: 2px; }
        
        .p-hero {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 6px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }
        .p-h1 { height: 16px; background: rgba(255,255,255,0.15); border-radius: 3px; width: 70%; }
        .p-hsub { height: 8px; background: rgba(255,255,255,0.08); border-radius: 2px; width: 50%; }
        .p-btn { height: 20px; background: #fff; border-radius: 3px; width: 80px; margin-top: 10px; }
        
        .p-cards { display: flex; gap: 8px; }
        .p-card {
          flex: 1;
          height: 60px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 6px;
        }
        
        .p-footer {
          height: 24px;
          background: rgba(255,255,255,0.02);
          border-radius: 4px;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 0 12px;
          margin-top: auto;
        }
        .p-ft { height: 6px; background: rgba(255,255,255,0.1); border-radius: 2px; width: 60px; }
        
        .real-site {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transition: opacity 1.2s ease;
          background: #fff;
          pointer-events: none;
        }
        .real-site.show { opacity: 1; pointer-events: all; }
        
        .rs-chrome {
          height: 28px;
          background: #f5f5f5;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          align-items: center;
          padding: 0 12px;
          gap: 6px;
          flex-shrink: 0;
        }
        .rs-addr {
          margin-left: 10px;
          background: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          padding: 3px 12px;
          font-size: 9px;
          color: #666;
          letter-spacing: 0.02em;
          flex: 1;
          max-width: 200px;
          font-family: 'JetBrains Mono', monospace;
        }
        .rs-addr span { color: #000; }
        
        .rs-nav {
          height: 40px;
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          padding: 0 30px;
          flex-shrink: 0;
        }
        .rs-logo {
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          color: #000;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .rs-navlinks { margin-left: auto; display: flex; gap: 24px; }
        .rs-navlink {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          color: #888;
          letter-spacing: 0.05em;
        }
        
        .rs-hero {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 40px;
          background: #fff;
          position: relative;
          text-align: center;
          overflow: hidden;
        }
        .rs-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        
        .rs-h1 {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          color: #000;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.02em;
          text-align: center;
          z-index: 1;
          opacity: 0;
          transform: translateY(25px);
          transition: opacity 1.2s ease, transform 1.2s cubic-bezier(0.25,0.1,0.25,1);
          margin-bottom: 16px;
        }
        .rs-rule {
          width: 0;
          height: 2px;
          background: #000;
          transition: width 1.2s cubic-bezier(0.25,0.1,0.25,1);
          margin-bottom: 16px;
          flex-shrink: 0;
          z-index: 1;
        }
        .rs-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #444;
          max-width: 340px;
          line-height: 1.8;
          text-align: center;
          z-index: 1;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s ease, transform 1s cubic-bezier(0.25,0.1,0.25,1);
          margin-bottom: 16px;
        }
        .rs-tagline {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #000;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-align: center;
          z-index: 1;
          opacity: 0;
          transition: opacity 1s ease;
        }
        
        .rs-h1.show { opacity: 1; transform: translateY(0); }
        .rs-rule.show { width: 60px; }
        .rs-sub.show { opacity: 1; transform: translateY(0); }
        .rs-tagline.show { opacity: 1; }
        
        #sceneFinal {
          position: absolute;
          inset: 0;
          z-index: 22;
          background: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          opacity: 0;
          transition: opacity 1.4s ease;
        }
        
        #finalWord {
          font-family: 'Playfair Display', serif;
          font-size: 72px;
          font-weight: 700;
          color: #000;
          letter-spacing: -0.03em;
          text-align: center;
        }
        
        #finalRule {
          height: 2px;
          background: #000;
        }
        
        #finalSlogan {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: #000;
          letter-spacing: 0.12em;
          text-align: center;
        }
        .sl-p { color: #999; }
        .sl-t { color: #000; }
        
        #blackFade {
          position: absolute;
          inset: 0;
          z-index: 50;
          background: #000;
          pointer-events: none;
        }
        
        @media (max-width: 768px) {
          .stage {
            height: 40vh;
            min-height: 280px;
          }
          .editor-panel {
            width: 45%;
          }
          #finalWord {
            font-size: 48px;
          }
          .rs-h1 {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="stage" id="stage" ref={stageRef}>
        {/* Scene 1: Editor + Preview */}
        <div className="scene-split" id="sceneSplit">
          <div className="editor-panel" id="editorPanel">
            <div className="topbar">
              <div className="dot dr"></div>
              <div className="dot dy"></div>
              <div className="dot dg"></div>
              <div className="tabs">
                <div className="tab on">index.html</div>
                <div className="tab">style.css</div>
              </div>
            </div>
            <div className="editor-body">
              <div className="ln" id="ln"></div>
              <div className="code-scroll-wrap" id="codeWrap">
                <div className="code-col" id="codeCol"></div>
              </div>
            </div>
          </div>
          <div className="preview-panel" id="previewPanel">
            <div className="preview-body" id="previewBody">
              <div id="wireframes"></div>
            </div>
          </div>
        </div>

        {/* Scene 2: Real Site */}
        <div className="real-site" id="realSite">
          <div className="rs-chrome">
            <div className="dot" style={{ background: '#ccc', width: 10, height: 10 }}></div>
            <div className="dot" style={{ background: '#ccc', width: 10, height: 10 }}></div>
            <div className="dot" style={{ background: '#ccc', width: 10, height: 10 }}></div>
            <div className="rs-addr">yrvante.nl</div>
          </div>
          <div className="rs-nav">
            <div className="rs-logo">Yrvante</div>
            <div className="rs-navlinks">
              <div className="rs-navlink">Diensten</div>
              <div className="rs-navlink">Portfolio</div>
              <div className="rs-navlink">Contact</div>
            </div>
          </div>
          <div className="rs-hero">
            <div className="rs-h1" id="rsH1">Build Smarter.<br />Launch Faster.</div>
            <div className="rs-rule" id="rsRule"></div>
            <div className="rs-sub" id="rsSub">Yrvante creëert moderne websites voor freelancers, startups en bedrijven.</div>
            <div className="rs-tagline" id="rsTagline">Strak design · Slimme technologie</div>
          </div>
        </div>

        {/* Scene 3: Final Logo with Image */}
        <div id="sceneFinal">
          <img src={LOGO_URL} alt="Yrvante" id="finalLogo" style={{maxWidth: '320px', maxHeight: '200px', objectFit: 'contain'}} />
        </div>

        {/* Black Fade Overlay */}
        <div id="blackFade"></div>
      </div>
    </div>);

};

export default HeroAnimation;