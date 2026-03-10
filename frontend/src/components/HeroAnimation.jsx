import React, { useEffect, useRef, useState } from 'react';

const HeroAnimation = () => {
  const [started, setStarted] = useState(false);
  const stageRef = useRef(null);
  const actxRef = useRef(null);

  const getAudioContext = () => {
    if (!actxRef.current) {
      actxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return actxRef.current;
  };

  const playClickSound = () => {
    try {
      const c = getAudioContext();
      const b = c.createBuffer(1, c.sampleRate * 0.028, c.sampleRate);
      const d = b.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 10);
      const s = c.createBufferSource();
      s.buffer = b;
      const g = c.createGain();
      g.gain.setValueAtTime(0.06 + Math.random() * 0.03, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.028);
      const f = c.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = 2800 + Math.random() * 1200;
      f.Q.value = 1.4;
      s.connect(f);
      f.connect(g);
      g.connect(c.destination);
      s.start();
    } catch (e) {}
  };

  const lines = [
    { h: '<span class="cm">&lt;!-- Yrvante — Smart Web &amp; Software --&gt;</span>', p: null },
    { h: '<span class="ct">&lt;!DOCTYPE html&gt;</span>', p: null },
    { h: '<span class="ct">&lt;<span class="ca">html</span> lang=<span class="cv">"nl"</span>&gt;</span>', p: null },
    { h: '<span class="ct">  &lt;<span class="ca">head</span>&gt;</span>', p: null },
    { h: '<span class="cw">    &lt;<span class="ct">meta</span> charset=<span class="cv">"UTF-8"</span>&gt;</span>', p: null },
    { h: '<span class="cw">    &lt;<span class="ct">meta</span> name=<span class="cv">"viewport"</span> content=<span class="cv">"width=device-width, initial-scale=1.0"</span>&gt;</span>', p: null },
    { h: '<span class="cw">    &lt;<span class="ct">title</span>&gt;<span class="cv">Yrvante — Smart Web &amp; Software</span>&lt;/<span class="ct">title</span>&gt;</span>', p: null },
    { h: '<span class="cw">    &lt;<span class="ct">link</span> rel=<span class="cv">"stylesheet"</span> href=<span class="cv">"./style.css"</span>&gt;</span>', p: null },
    { h: '<span class="cw">    &lt;<span class="ct">script</span> defer src=<span class="cv">"./main.js"</span>&gt;&lt;/<span class="ct">script</span>&gt;</span>', p: null },
    { h: '<span class="ct">  &lt;/<span class="ca">head</span>&gt;</span>', p: null },
    { h: '<span class="ct">  &lt;<span class="ca">body</span>&gt;</span>', p: null },
    { h: '<span class="cm">    &lt;!-- Navigation --&gt;</span>', p: null },
    { h: '<span class="cw">    &lt;<span class="ct">header</span> class=<span class="cv">"header"</span>&gt;</span>', p: 'navbar' },
    { h: '<span class="cp">      &lt;<span class="ct">a</span> class=<span class="cv">"logo"</span> href=<span class="cv">"/"</span>&gt;Yrvante&lt;/<span class="ct">a</span>&gt;</span>', p: null },
    { h: '<span class="cw">      &lt;<span class="ct">nav</span>&gt;</span>', p: null },
    { h: '<span class="cp">        &lt;<span class="ct">a</span> href=<span class="cv">"#diensten"</span>&gt;Diensten&lt;/<span class="ct">a</span>&gt;</span>', p: null },
    { h: '<span class="cp">        &lt;<span class="ct">a</span> href=<span class="cv">"#portfolio"</span>&gt;Portfolio&lt;/<span class="ct">a</span>&gt;</span>', p: null },
    { h: '<span class="cp">        &lt;<span class="ct">a</span> href=<span class="cv">"#contact"</span>&gt;Contact&lt;/<span class="ct">a</span>&gt;</span>', p: null },
    { h: '<span class="cw">      &lt;/<span class="ct">nav</span>&gt;</span>', p: null },
    { h: '<span class="cw">    &lt;/<span class="ct">header</span>&gt;</span>', p: null },
    { h: '<span class="cm">    &lt;!-- Hero Section --&gt;</span>', p: null },
    { h: '<span class="cw">    &lt;<span class="ct">section</span> class=<span class="cv">"hero"</span>&gt;</span>', p: null },
    { h: '<span class="cp">      &lt;<span class="ct">h1</span>&gt;Build Smarter. Launch Faster.&lt;/<span class="ct">h1</span>&gt;</span>', p: 'hero' },
    { h: '<span class="ck">      &lt;<span class="ct">p</span>&gt;Yrvante creëert moderne websites&lt;/<span class="ct">p</span>&gt;</span>', p: 'sub' },
    { h: '<span class="ck">      &lt;<span class="ct">p</span>&gt;voor freelancers en bedrijven in NL.&lt;/<span class="ct">p</span>&gt;</span>', p: null },
    { h: '<span class="cw">      &lt;<span class="ct">p</span> class=<span class="cv">"tagline"</span>&gt;Strak design. Slimme technologie.&lt;/<span class="ct">p</span>&gt;</span>', p: 'body1' },
    { h: '<span class="cp">      &lt;<span class="ct">a</span> class=<span class="cv">"btn"</span> href=<span class="cv">"#contact"</span>&gt;Website aanvragen&lt;/<span class="ct">a</span>&gt;</span>', p: 'btn' },
    { h: '<span class="cw">    &lt;/<span class="ct">section</span>&gt;</span>', p: null },
    { h: '<span class="cm">    &lt;!-- Services --&gt;</span>', p: null },
    { h: '<span class="cw">    &lt;<span class="ct">section</span> class=<span class="cv">"services"</span>&gt;</span>', p: null },
    { h: '<span class="cp">      &lt;<span class="ct">h2</span>&gt;Onze Diensten&lt;/<span class="ct">h2</span>&gt;</span>', p: 'seclabel' },
    { h: '<span class="cp">      &lt;<span class="ct">div</span> class=<span class="cv">"card"</span>&gt;Web Design&lt;/<span class="ct">div</span>&gt;</span>', p: 'cards' },
    { h: '<span class="cp">      &lt;<span class="ct">div</span> class=<span class="cv">"card"</span>&gt;Development&lt;/<span class="ct">div</span>&gt;</span>', p: null },
    { h: '<span class="cp">      &lt;<span class="ct">div</span> class=<span class="cv">"card"</span>&gt;Software&lt;/<span class="ct">div</span>&gt;</span>', p: null },
    { h: '<span class="cw">    &lt;/<span class="ct">section</span>&gt;</span>', p: null },
    { h: '<span class="cm">    &lt;!-- Testimonial --&gt;</span>', p: null },
    { h: '<span class="cp">      &lt;<span class="ct">blockquote</span>&gt;Yrvante transformeerde onze aanwezigheid.&lt;/<span class="ct">blockquote</span>&gt;</span>', p: 'testi' },
    { h: '<span class="cm">    &lt;!-- Footer --&gt;</span>', p: null },
    { h: '<span class="cw">    &lt;<span class="ct">footer</span>&gt;</span>', p: 'footer' },
    { h: '<span class="cp">      &lt;<span class="ct">p</span>&gt;© 2025 Yrvante · yrvante.nl&lt;/<span class="ct">p</span>&gt;</span>', p: null },
    { h: '<span class="cw">    &lt;/<span class="ct">footer</span>&gt;</span>', p: null },
    { h: '<span class="ct">  &lt;/<span class="ca">body</span>&gt;</span>', p: null },
    { h: '<span class="ct">&lt;/<span class="ca">html</span>&gt;</span>', p: null },
  ];

  const previews = {
    navbar: `<div class="pw p-navbar"><div class="p-nb-logo"></div><div class="p-nb-tagline"></div><div class="p-nb-links"><div class="p-nb-link"></div><div class="p-nb-link"></div><div class="p-nb-link"></div><div class="p-nb-cta"></div></div></div>`,
    hero: `<div class="pw p-hero"><div class="p-eyebrow"></div><div class="p-h1a"></div><div class="p-h1b"></div><div class="p-rule"></div><div class="p-hsub"></div><div class="p-hsub2"></div><div class="p-hbody"></div><div class="p-btn-row"><div class="p-btn"></div><div class="p-btn2"></div></div></div>`,
    sub: `<div class="pw p-hsub" style="margin-top:2px;"></div><div class="pw p-hsub2"></div>`,
    body1: `<div class="pw p-hbody"></div>`,
    btn: `<div class="pw p-btn-row"><div class="p-btn"></div><div class="p-btn2"></div></div>`,
    seclabel: `<div class="pw p-sec-label"><div class="p-sec-title"></div><div class="p-sec-line"></div></div>`,
    cards: `<div class="pw p-cards"><div class="p-card"><div class="p-ci"></div><div class="p-ct"></div><div class="p-cs"></div><div class="p-cs2"></div><div class="p-cs3"></div><div class="p-card-arrow"></div></div><div class="p-card"><div class="p-ci"></div><div class="p-ct"></div><div class="p-cs"></div><div class="p-cs2"></div><div class="p-cs3"></div><div class="p-card-arrow"></div></div><div class="p-card"><div class="p-ci"></div><div class="p-ct"></div><div class="p-cs"></div><div class="p-cs2"></div><div class="p-cs3"></div><div class="p-card-arrow"></div></div></div>`,
    testi: `<div class="pw p-testi"><div class="p-testi-mark"></div><div class="p-qt"></div><div class="p-qt2"></div><div class="p-qt3"></div><div class="p-av-row"><div class="p-av"></div><div class="p-av-info"><div class="p-an"></div><div class="p-an2"></div></div></div></div>`,
    footer: `<div class="pw p-footer"><div class="p-ft"></div><div class="p-ft2"></div><div class="p-fl"><div class="p-fli"></div><div class="p-fli"></div><div class="p-fli"></div></div></div>`,
  };

  const runLoop = () => {
    const stage = stageRef.current;
    if (!stage) return;

    const split = stage.querySelector('#sceneSplit');
    const editor = stage.querySelector('#editorPanel');
    const ptop = stage.querySelector('#previewTopbar');
    const pbody = stage.querySelector('#previewBody');
    const real = stage.querySelector('#realSite');
    const cc = stage.querySelector('#codeCol');
    const lnEl = stage.querySelector('#ln');
    const wf = stage.querySelector('#wireframes');
    const blackFade = stage.querySelector('#blackFade');

    // Clear previous
    cc.innerHTML = '';
    lnEl.innerHTML = '';
    wf.innerHTML = '';
    cc.style.transform = 'translateY(0)';
    stage.classList.remove('white');

    const fadeToBlack = (cb, holdMs = 200) => {
      blackFade.style.transition = 'opacity 2s ease';
      blackFade.style.opacity = '1';
      setTimeout(() => cb(), 2000);
      setTimeout(() => {
        blackFade.style.transition = 'opacity 1.8s ease';
        blackFade.style.opacity = '0';
      }, 2000 + holdMs);
    };

    // Reset classes
    split.className = 'scene-split';
    editor.className = 'editor-panel';
    ptop.className = 'preview-topbar';
    pbody.className = 'preview-body';
    real.className = 'real-site';

    // Reset scene 2 elements
    const s2els = {
      rsH1: 'opacity:0;transform:translateY(18px);',
      rsSub: 'opacity:0;transform:translateY(10px);',
      rsRule: 'width:0;',
      rsTagline: 'opacity:0;'
    };
    Object.entries(s2els).forEach(([id, css]) => {
      const el = stage.querySelector(`#${id}`);
      if (el) {
        el.style.cssText = css;
        el.classList.remove('show');
      }
    });

    requestAnimationFrame(() => requestAnimationFrame(() => {
      ['rsH1', 'rsSub', 'rsRule', 'rsTagline'].forEach(id => {
        const el = stage.querySelector(`#${id}`);
        if (el) el.style.cssText = '';
      });
    }));

    // Reset scene 3
    const sf = stage.querySelector('#sceneFinal');
    sf.style.opacity = '0';
    sf.style.pointerEvents = 'none';
    const fw = stage.querySelector('#finalWord');
    fw.style.opacity = '0';
    fw.style.transform = 'translateY(8px)';
    fw.style.transition = 'none';
    stage.querySelector('#finalRule').style.cssText = 'width:0;transition:none;';
    stage.querySelector('#finalSlogan').style.cssText = 'opacity:0;transition:none;';

    requestAnimationFrame(() => {
      fw.style.transition = '';
      stage.querySelector('#finalRule').style.transition = '';
      stage.querySelector('#finalSlogan').style.transition = '';
    });

    // Reset nav + chrome
    const nav = stage.querySelector('.rs-nav');
    const chrome = stage.querySelector('.rs-chrome');
    if (nav) nav.style.cssText = '';
    if (chrome) chrome.style.cssText = '';

    const urlEl = stage.querySelector('#previewUrl');
    if (urlEl) urlEl.classList.remove('type');

    // Line numbers
    for (let i = 1; i <= lines.length + 4; i++) {
      const s = document.createElement('span');
      s.textContent = i;
      lnEl.appendChild(s);
    }

    // Fade in
    blackFade.style.transition = 'none';
    blackFade.style.opacity = '1';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        split.classList.add('active');
        setTimeout(() => { if (urlEl) urlEl.classList.add('type'); }, 1500);
        setTimeout(() => {
          blackFade.style.transition = 'opacity 1.6s ease';
          blackFade.style.opacity = '0';
        }, 900);
      });
    });

    const wrap = stage.querySelector('#codeWrap');
    const LINE_H = 8.5 * 1.7;
    const VISIBLE = Math.floor((wrap?.offsetHeight || 240) / LINE_H);
    let visCount = 0;
    let scrollOff = 0;
    let delay = 3200;
    const SPD = 95;

    lines.forEach((line) => {
      const el = document.createElement('div');
      el.className = 'cl';
      el.innerHTML = line.h;
      cc.appendChild(el);

      setTimeout(() => {
        stage.querySelectorAll('.cl.typing').forEach(e => {
          e.classList.remove('typing');
          e.classList.add('show');
        });
        el.classList.add('typing');
        playClickSound();

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
              child.querySelectorAll?.('.pw').forEach(p => p.classList.add('show'));
            }, 80);
          }
        }
      }, delay);

      delay += line.h.includes('"cm"') ? SPD * 1.2 : SPD;
    });

    const T = delay + 300;

    // MORPH: scene 1 → scene 2
    setTimeout(() => {
      stage.querySelectorAll('.cl.typing').forEach(e => e.classList.remove('typing'));
      stage.querySelectorAll('#wireframes .pw').forEach(el => el.classList.add('fadeout'));

      setTimeout(() => {
        editor.classList.add('collapse');
        ptop.classList.add('hide');
        pbody.classList.add('expand');

        setTimeout(() => {
          real.classList.add('show');
          stage.classList.add('white');

          setTimeout(() => stage.querySelector('#rsH1')?.classList.add('show'), 700);
          setTimeout(() => stage.querySelector('#rsRule')?.classList.add('show'), 1600);
          setTimeout(() => stage.querySelector('#rsSub')?.classList.add('show'), 2200);
          setTimeout(() => stage.querySelector('#rsTagline')?.classList.add('show'), 3800);
        }, 500);
      }, 300);
    }, T);

    const morphStart = T + 300 + 500 + 3800 + 7000;

    // Scene 2 → 3
    setTimeout(() => {
      ['rsH1', 'rsRule', 'rsSub', 'rsTagline'].forEach(id => {
        const el = stage.querySelector(`#${id}`);
        if (el) {
          el.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
          el.style.opacity = '0';
          el.style.transform = 'translateY(-6px)';
        }
      });

      const navEl = stage.querySelector('.rs-nav');
      const chromeEl = stage.querySelector('.rs-chrome');
      if (navEl) {
        navEl.style.transition = 'opacity 1s ease';
        navEl.style.opacity = '0';
      }
      if (chromeEl) {
        chromeEl.style.transition = 'opacity 1s ease';
        chromeEl.style.opacity = '0';
      }

      setTimeout(() => {
        sf.style.opacity = '1';
        sf.style.pointerEvents = 'all';
        setTimeout(() => {
          fw.style.opacity = '1';
          fw.style.transform = 'translateY(0)';
        }, 300);
        setTimeout(() => { stage.querySelector('#finalRule').style.width = '150px'; }, 900);
        setTimeout(() => { stage.querySelector('#finalSlogan').style.opacity = '1'; }, 1400);
      }, 1200);
    }, morphStart);

    // Loop
    const loopStart = morphStart + 1200 + 1400 + 8000;
    setTimeout(() => { fadeToBlack(() => runLoop(), 800); }, loopStart);
  };

  const startAnimation = () => {
    if (started) return;
    setStarted(true);
    getAudioContext();
    runLoop();
  };

  return (
    <div className="hero-animation-wrapper">
      <style>{`
        .hero-animation-wrapper {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #050505;
        }
        
        .stage {
          width: 100%;
          height: 50vh;
          min-height: 300px;
          max-height: 440px;
          background: #070707;
          overflow: hidden;
          position: relative;
          transition: background 1.2s ease;
        }
        .stage.white { background: #fff; }
        
        .vignette {
          position: absolute;
          inset: 0;
          z-index: 18;
          pointer-events: none;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%);
          transition: opacity 1.2s ease;
        }
        .stage.white .vignette { opacity: 0; }
        
        .start-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 30;
          background: transparent;
          color: #3a3a3a;
          border: 1px solid #222;
          padding: 10px 28px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .start-btn:hover { color: #666; border-color: #444; }
        .start-btn.hidden { opacity: 0; pointer-events: none; }
        
        .scene-split {
          position: absolute;
          inset: 0;
          display: flex;
          opacity: 0;
          transition: opacity 1s ease;
        }
        .scene-split.active { opacity: 1; }
        .scene-split.fadeout { opacity: 0; }
        
        .editor-panel {
          width: 54%;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #111;
          transition: width 1.6s cubic-bezier(0.77,0,0.175,1), opacity 1s ease, border-color 0.4s;
          overflow: hidden;
        }
        .editor-panel.collapse { width: 0%; opacity: 0; border-color: transparent; }
        
        .topbar {
          height: 28px;
          background: #0c0c0c;
          display: flex;
          align-items: center;
          padding: 0 12px;
          gap: 6px;
          border-bottom: 1px solid #111;
          flex-shrink: 0;
        }
        .dot { width: 7px; height: 7px; border-radius: 50%; }
        .dr { background: #242424; }
        .dy { background: #1f1f1f; }
        .dg { background: #1a1a1a; }
        
        .tabs { display: flex; margin-left: 8px; }
        .tab {
          font-size: 8px;
          color: #282828;
          padding: 0 10px;
          letter-spacing: 0.05em;
          border-right: 1px solid #111;
          line-height: 28px;
          font-family: 'JetBrains Mono', monospace;
        }
        .tab.on { color: #555; background: #070707; }
        
        .editor-body {
          flex: 1;
          padding: 6px 0;
          display: flex;
          overflow: hidden;
          position: relative;
        }
        .ln {
          display: flex;
          flex-direction: column;
          color: #181818;
          font-size: 8.5px;
          line-height: 1.7;
          padding: 0 8px 0 10px;
          text-align: right;
          user-select: none;
          min-width: 28px;
          flex-shrink: 0;
          font-family: 'JetBrains Mono', monospace;
        }
        .code-scroll-wrap {
          flex: 1;
          overflow: hidden;
          position: relative;
          padding-right: 6px;
        }
        .code-col {
          display: flex;
          flex-direction: column;
          will-change: transform;
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .code-scroll-wrap::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 24px;
          background: linear-gradient(#070707, transparent);
          z-index: 2;
          pointer-events: none;
        }
        .code-scroll-wrap::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 36px;
          background: linear-gradient(transparent, #070707);
          z-index: 2;
          pointer-events: none;
        }
        
        .cl {
          font-size: 8.5px;
          line-height: 1.7;
          white-space: pre;
          overflow: hidden;
          max-width: 100%;
          opacity: 0;
          height: 0;
          font-family: 'JetBrains Mono', monospace;
          transition: opacity 0.25s ease, height 0.12s ease;
        }
        .cl.show { opacity: 1; height: 1.7em; }
        .cl.typing { opacity: 1; height: 1.7em; }
        
        .cm { color: #1e1e1e; }
        .ct { color: #484848; }
        .ca { color: #3e3e3e; }
        .cv { color: #686868; }
        .cw { color: #888; }
        .cp { color: #545454; }
        .ck { color: #606060; }
        
        .preview-panel {
          flex: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #070707;
          position: relative;
          transition: flex 1.6s cubic-bezier(0.77,0,0.175,1);
        }
        .preview-topbar {
          height: 28px;
          background: #090909;
          display: flex;
          align-items: center;
          padding: 0 10px;
          gap: 6px;
          border-bottom: 1px solid #111;
          flex-shrink: 0;
          transition: height 0.8s ease, opacity 0.6s ease;
        }
        .preview-topbar.hide { height: 0; opacity: 0; overflow: hidden; }
        
        .preview-url {
          flex: 1;
          background: #0d0d0d;
          border: 1px solid #161616;
          border-radius: 2px;
          height: 16px;
          margin: 0 8px;
          display: flex;
          align-items: center;
          padding: 0 7px;
          gap: 4px;
          overflow: hidden;
        }
        .preview-url-lock { font-size: 7px; color: #252525; }
        .preview-url-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 7px;
          color: #282828;
          white-space: nowrap;
          overflow: hidden;
          width: 0;
          transition: width 1.4s ease;
        }
        .preview-url-text.type { width: 80px; }
        .live {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #181818;
          flex-shrink: 0;
          animation: lp 2s ease-in-out infinite;
        }
        @keyframes lp {
          0%, 100% { background: #181818; }
          50% { background: #2a2a2a; box-shadow: 0 0 5px rgba(255,255,255,0.06); }
        }
        
        .preview-body {
          flex: 1;
          padding: 8px 10px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          overflow: hidden;
          position: relative;
          transition: padding 1s ease;
          background: #070707;
        }
        .preview-body.expand { padding: 0; }
        .preview-body::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
          top: 0;
          pointer-events: none;
          z-index: 5;
          animation: scanDown 3s ease-in-out infinite;
        }
        @keyframes scanDown {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
        
        .pw {
          border-radius: 2px;
          opacity: 0;
          transform: translateY(5px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1);
          flex-shrink: 0;
        }
        .pw.show { opacity: 1; transform: translateY(0); }
        .pw.fadeout { opacity: 0; transform: translateY(-8px) scale(1.02); transition: opacity 0.8s ease, transform 0.8s ease; }
        
        .p-navbar {
          height: 22px;
          background: #0e0e0e;
          border-radius: 2px;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 0 8px;
          gap: 5px;
          border-bottom: 1px solid #131313;
        }
        .p-nb-logo { width: 38px; height: 7px; background: #1e1e1e; border-radius: 1px; }
        .p-nb-tagline { width: 55px; height: 4px; background: #141414; border-radius: 1px; margin-left: 6px; }
        .p-nb-links { margin-left: auto; display: flex; gap: 5px; }
        .p-nb-link { width: 18px; height: 4px; background: #161616; border-radius: 1px; }
        .p-nb-cta { width: 36px; height: 14px; background: #1c1c1c; border-radius: 1px; border: 1px solid #222; }
        
        .p-hero {
          background: linear-gradient(160deg, #0d0d0d, #060606);
          border: 1px solid #121212;
          border-radius: 3px;
          padding: 12px 10px 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          position: relative;
          overflow: hidden;
        }
        .p-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: linear-gradient(rgba(255,255,255,0.008) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.008) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .p-eyebrow { height: 4px; background: #141414; border-radius: 1px; width: 42%; margin-bottom: 6px; }
        .p-h1a { height: 11px; background: #1d1d1d; border-radius: 1px; width: 68%; }
        .p-h1b { height: 11px; background: #191919; border-radius: 1px; width: 50%; margin-top: 2px; }
        .p-rule { height: 1px; background: #1a1a1a; width: 30px; margin: 6px 0; }
        .p-hsub { height: 4px; background: #131313; border-radius: 1px; width: 88%; }
        .p-hsub2 { height: 4px; background: #101010; border-radius: 1px; width: 72%; margin-top: 2px; }
        .p-hbody { height: 4px; background: #0e0e0e; border-radius: 1px; width: 60%; margin-top: 2px; }
        .p-btn-row { display: flex; gap: 5px; margin-top: 8px; }
        .p-btn { height: 14px; background: #e8e8e8; border-radius: 2px; width: 56px; }
        .p-btn2 { height: 14px; background: transparent; border: 1px solid #1e1e1e; border-radius: 2px; width: 50px; }
        
        .p-sec-label { display: flex; align-items: center; gap: 6px; margin-top: 2px; }
        .p-sec-title { height: 5px; background: #161616; border-radius: 1px; width: 30%; }
        .p-sec-line { flex: 1; height: 1px; background: #111; }
        
        .p-cards { display: flex; gap: 5px; }
        .p-card {
          flex: 1;
          background: #0a0a0a;
          border: 1px solid #131313;
          border-radius: 3px;
          padding: 6px 5px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .p-ci { width: 14px; height: 14px; background: #171717; border-radius: 3px; border: 1px solid #1e1e1e; }
        .p-ct { height: 4px; background: #181818; border-radius: 1px; width: 70%; margin-top: 3px; }
        .p-cs { height: 3px; background: #111; border-radius: 1px; width: 92%; }
        .p-cs2 { height: 3px; background: #0e0e0e; border-radius: 1px; width: 72%; }
        .p-cs3 { height: 3px; background: #0c0c0c; border-radius: 1px; width: 55%; }
        .p-card-arrow { height: 4px; background: #1a1a1a; border-radius: 1px; width: 14px; margin-top: 4px; }
        
        .p-testi {
          background: #080808;
          border: 1px solid #111;
          border-radius: 3px;
          padding: 6px 8px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .p-testi-mark { height: 6px; background: #141414; border-radius: 1px; width: 10px; margin-bottom: 3px; }
        .p-qt { height: 4px; background: #171717; border-radius: 1px; width: 94%; }
        .p-qt2 { height: 4px; background: #131313; border-radius: 1px; width: 70%; }
        .p-qt3 { height: 4px; background: #111; border-radius: 1px; width: 50%; }
        .p-av-row { display: flex; align-items: center; gap: 5px; margin-top: 4px; }
        .p-av { width: 10px; height: 10px; border-radius: 50%; background: #1c1c1c; border: 1px solid #222; }
        .p-av-info { display: flex; flex-direction: column; gap: 2px; }
        .p-an { height: 3px; background: #161616; border-radius: 1px; width: 44px; }
        .p-an2 { height: 2px; background: #111; border-radius: 1px; width: 30px; }
        
        .p-footer {
          height: 16px;
          background: #070707;
          border-radius: 2px;
          width: 100%;
          border-top: 1px solid #0f0f0f;
          display: flex;
          align-items: center;
          padding: 0 8px;
          gap: 6px;
          margin-top: auto;
        }
        .p-ft { height: 3px; background: #141414; border-radius: 1px; width: 50px; }
        .p-ft2 { height: 3px; background: #111; border-radius: 1px; width: 30px; }
        .p-fl { display: flex; gap: 4px; margin-left: auto; }
        .p-fli { width: 16px; height: 3px; background: #111; border-radius: 1px; }
        
        .real-site {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transition: opacity 1.1s ease;
          background: #fff;
          pointer-events: none;
        }
        .real-site.show { opacity: 1; pointer-events: all; }
        
        .rs-chrome {
          height: 22px;
          background: #f8f8f8;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          padding: 0 10px;
          gap: 5px;
          flex-shrink: 0;
        }
        .rs-addr {
          margin-left: 8px;
          background: #efefef;
          border: 1px solid #e4e4e4;
          border-radius: 3px;
          padding: 2px 10px;
          font-size: 7px;
          color: #aaa;
          letter-spacing: 0.04em;
          flex: 1;
          max-width: 180px;
          font-family: 'JetBrains Mono', monospace;
        }
        .rs-addr span { color: #666; }
        
        .rs-nav {
          height: 32px;
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          padding: 0 24px;
          flex-shrink: 0;
        }
        .rs-logo {
          font-family: 'Playfair Display', serif;
          font-size: 12px;
          color: #000;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .rs-navlinks { margin-left: auto; display: flex; gap: 18px; }
        .rs-navlink {
          font-family: 'JetBrains Mono', monospace;
          font-size: 7px;
          color: #ccc;
          letter-spacing: 0.14em;
          text-transform: uppercase;
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
          background-image: radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
          animation: dotDrift 12s linear infinite;
        }
        @keyframes dotDrift { from { background-position: 0 0; } to { background-position: 28px 28px; } }
        
        .rs-corner { position: absolute; width: 22px; height: 22px; pointer-events: none; z-index: 2; }
        .rs-corner.tl { top: 12px; left: 12px; border-top: 1px solid rgba(0,0,0,0.15); border-left: 1px solid rgba(0,0,0,0.15); }
        .rs-corner.tr { top: 12px; right: 12px; border-top: 1px solid rgba(0,0,0,0.15); border-right: 1px solid rgba(0,0,0,0.15); }
        .rs-corner.bl { bottom: 12px; left: 12px; border-bottom: 1px solid rgba(0,0,0,0.15); border-left: 1px solid rgba(0,0,0,0.15); }
        .rs-corner.br { bottom: 12px; right: 12px; border-bottom: 1px solid rgba(0,0,0,0.15); border-right: 1px solid rgba(0,0,0,0.15); }
        
        .rs-h1 {
          font-family: 'Playfair Display', serif;
          font-size: 27px;
          color: #000;
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.02em;
          text-align: center;
          z-index: 1;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 1.1s ease, transform 1.1s cubic-bezier(0.16,1,0.3,1);
          margin-bottom: 18px;
        }
        .rs-rule {
          width: 0;
          height: 1px;
          background: #000;
          transition: width 1.2s cubic-bezier(0.77,0,0.175,1);
          margin-bottom: 18px;
          flex-shrink: 0;
          z-index: 1;
        }
        .rs-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px;
          color: #000;
          max-width: 310px;
          line-height: 1.95;
          text-align: center;
          z-index: 1;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 1s ease, transform 1s ease;
          margin-bottom: 18px;
        }
        .rs-tagline {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: #000;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-align: center;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.9s ease;
        }
        
        .rs-h1.show { opacity: 1; transform: translateY(0); }
        .rs-rule.show { width: 54px; }
        .rs-sub.show { opacity: 1; transform: translateY(0); }
        .rs-tagline.show { opacity: 1; }
      `}</style>

      <div className="stage" id="stage" ref={stageRef}>
        <div className="vignette"></div>
        <button
          className={`start-btn ${started ? 'hidden' : ''}`}
          onClick={startAnimation}
          data-testid="hero-animation-start"
        >
          ▶ &nbsp;Afspelen
        </button>

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
                <div className="tab">main.js</div>
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
            <div className="preview-topbar" id="previewTopbar">
              <div className="dot dr"></div>
              <div className="dot dy"></div>
              <div className="dot dg"></div>
              <div className="preview-url">
                <span className="preview-url-lock">🔒</span>
                <span className="preview-url-text" id="previewUrl">yrvante.nl</span>
              </div>
              <div className="live"></div>
            </div>
            <div className="preview-body" id="previewBody">
              <div id="wireframes"></div>
            </div>
          </div>
        </div>

        {/* Scene 2: Real Site */}
        <div className="real-site" id="realSite">
          <div className="rs-chrome">
            <div className="dot" style={{ background: '#d0d0d0' }}></div>
            <div className="dot" style={{ background: '#d8d8d8' }}></div>
            <div className="dot" style={{ background: '#e0e0e0' }}></div>
            <div className="rs-addr">🔒 <span>yrvante.nl</span></div>
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
            <div className="rs-corner tl"></div>
            <div className="rs-corner tr"></div>
            <div className="rs-corner bl"></div>
            <div className="rs-corner br"></div>
            <div className="rs-h1" id="rsH1">Build Smarter.<br />Launch Faster.</div>
            <div className="rs-rule" id="rsRule"></div>
            <div className="rs-sub" id="rsSub">Yrvante creëert moderne websites<br />voor freelancers, startups en bedrijven.</div>
            <div className="rs-tagline" id="rsTagline">Strak design · Slimme technologie · Betrouwbare resultaten</div>
          </div>
        </div>

        {/* Scene 3: Final Logo */}
        <div
          id="sceneFinal"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 22,
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 1.4s ease'
          }}
        >
          <div
            id="finalWord"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '60px',
              fontWeight: 700,
              color: '#000',
              letterSpacing: '-0.03em',
              textAlign: 'center',
              opacity: 0,
              transform: 'translateY(8px)',
              transition: 'opacity 1.2s ease, transform 1.2s cubic-bezier(0.16,1,0.3,1)'
            }}
          >
            Yrvante
          </div>
          <div
            id="finalRule"
            style={{
              width: 0,
              height: '1px',
              background: '#000',
              transition: 'width 1.1s ease'
            }}
          ></div>
          <div
            id="finalSlogan"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#000',
              letterSpacing: '0.18em',
              opacity: 0,
              transition: 'opacity 1s ease',
              textAlign: 'center'
            }}
          >
            <span style={{ color: '#bbb' }}>(</span>
            <span style={{ color: '#111' }}>"Smart web & software"</span>
            <span style={{ color: '#bbb' }}>)</span>
            <span style={{ color: '#bbb' }}>;</span>
          </div>
        </div>

        {/* Black Fade Overlay */}
        <div
          id="blackFade"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 50,
            background: '#000',
            opacity: 0,
            pointerEvents: 'none',
            transition: 'opacity 1s ease'
          }}
        ></div>
      </div>
    </div>
  );
};

export default HeroAnimation;
