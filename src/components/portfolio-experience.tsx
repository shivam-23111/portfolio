"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowDown,
  ArrowRight,
  Download,
  ExternalLink,
  Mail,
  Menu,
  MousePointer2,
  Send,
  X,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  certifications,
  contactMethods,
  education,
  experiences,
  narrative,
  profile,
  projects,
  responsibilities,
  skillGroups,
  stats,
} from "@/lib/data";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Story", href: "#story" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const projectImageMap = {
  hms: "/project-hms.svg",
  waste: "/project-waste.svg",
  classroom: "/project-classroom.svg",
} as const;

function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function splitWords(text: string) {
  return text.split(" ").map((word, index) => (
    <span className="word-mask" key={`${word}-${index}`}>
      <span className="word">{word}&nbsp;</span>
    </span>
  ));
}

export default function PortfolioExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotionPreference();

  const skillMarquee = useMemo(
    () => skillGroups.flatMap((group) => group.skills.map((skill) => ({ skill, group: group.label }))),
    [],
  );

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, [reducedMotion]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(".word", { yPercent: 112 });
      gsap.set(".intro-panel", { yPercent: 0 });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .to(".intro-panel", { yPercent: -100, duration: 1.2, delay: 0.35 })
        .to(".word", { yPercent: 0, duration: 1.05, stagger: 0.022 }, "-=0.65")
        .from(".hero-support", { y: 24, opacity: 0, duration: 0.85 }, "-=0.52")
        .from(".hero-action", { y: 16, opacity: 0, duration: 0.65, stagger: 0.08 }, "-=0.42");

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 42,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".chapter").forEach((section) => {
        const tint = section.dataset.tint ?? "#74f7ff";
        gsap.to(".scroll-light", {
          "--light-color": tint,
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            end: "bottom 45%",
            scrub: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".tilt-card").forEach((card) => {
        const onMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const rotateY = ((x / rect.width) - 0.5) * 8;
          const rotateX = ((y / rect.height) - 0.5) * -8;
          gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 900,
            duration: 0.35,
            ease: "power2.out",
          });
        };
        const onLeave = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "elastic.out(1, 0.45)" });
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });

      const track = root.querySelector<HTMLElement>(".project-track");
      const shell = root.querySelector<HTMLElement>(".project-shell");
      if (track && shell) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - shell.clientWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-pin",
            start: "top top",
            end: () => `+=${Math.max(900, track.scrollWidth - shell.clientWidth + window.innerHeight)}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((stat) => {
        const value = Number(stat.dataset.value);
        const suffix = stat.dataset.suffix ?? "";
        const snap = value % 1 === 0 ? 1 : 0.1;
        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            textContent: value,
            duration: 1.8,
            snap: { textContent: snap },
            ease: "power2.out",
            onUpdate: () => {
              const current = Number(stat.textContent);
              stat.textContent = `${Number.isInteger(value) ? Math.round(current) : current.toFixed(1)}${suffix}`;
            },
            scrollTrigger: {
              trigger: stat,
              start: "top 84%",
            },
          },
        );
      });

      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
          trigger: ".experience-flow",
          start: "top 72%",
          end: "bottom 55%",
          scrub: true,
        },
      });

      gsap.to(".aurora-sheet", {
        backgroundPosition: "100% 50%",
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, root);

    const moveCursor = (event: MouseEvent) => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.22,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <div className="site-shell" ref={rootRef}>
      <div className="intro-panel">
        <div className="intro-mark">ST</div>
        <div className="intro-scan" />
      </div>
      <div className="scroll-light" aria-hidden="true" />
      <div className="aurora-sheet" aria-hidden="true" />
      <div className="noise-layer" aria-hidden="true" />
      <div className="cursor-light" ref={cursorRef} aria-hidden="true" />

      <header className="floating-nav">
        <a className="nav-brand" href="#top" aria-label="Go to top">
          <span>ST</span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a
            className={cn(buttonVariants({ variant: "glass", size: "sm" }), "hidden sm:inline-flex")}
            href={profile.resume}
            download
          >
            <Download className="size-4" />
            Resume
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      )}

      <main id="top">
        <section className="hero-section chapter" data-tint="#77f8ff">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow reveal">{narrative.kicker}</p>
              <h1>{splitWords(narrative.headline)}</h1>
              <p className="hero-support">{narrative.body}</p>
              <div className="hero-actions">
                <a className={cn(buttonVariants({ size: "lg" }), "hero-action magnetic")} href={profile.resume} download>
                  <Download className="size-5" />
                  Download resume
                </a>
                <a className={cn(buttonVariants({ variant: "glass", size: "lg" }), "hero-action magnetic")} href="#contact">
                  <Mail className="size-5" />
                  Contact
                </a>
              </div>
              <div className="social-row hero-support" aria-label="Social links">
                <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <ExternalLink className="size-5" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <ExternalLink className="size-5" />
                </a>
                <a href={profile.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode">
                  <MousePointer2 className="size-5" />
                </a>
              </div>
            </div>

            <motion.div
              className="hero-visual reveal"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="portrait-glass">
                <Image
                  src="/hero-system.svg"
                  alt="Abstract AI and IoT system visual for Shivam Tiwari"
                  width={680}
                  height={760}
                  priority
                />
                <div className="profile-chip">
                  <span>Available for AI and frontend roles</span>
                  <strong>2026</strong>
                </div>
              </div>
            </motion.div>
          </div>
          <a className="scroll-cue" href="#story" aria-label="Scroll to story">
            <ArrowDown className="size-4" />
          </a>
        </section>

        <section className="story-section chapter" id="story" data-tint="#f8b84e">
          <div className="section-kicker reveal">01 / The Signal</div>
          <div className="story-layout">
            <div className="story-statement reveal">
              <h2>Built around the moment when a model, an app, or a device has to behave reliably.</h2>
            </div>
            <div className="story-panels">
              {stats.map((stat) => (
                <article className="stat-panel tilt-card" key={stat.label}>
                  <strong className="stat-value" data-value={stat.value} data-suffix={stat.suffix}>
                    0{stat.suffix}
                  </strong>
                  <span>{stat.label}</span>
                  <p>{stat.detail}</p>
                </article>
              ))}
            </div>
          </div>
          <blockquote className="quote-block reveal">{narrative.quote}</blockquote>
        </section>

        <section className="skills-section chapter" id="skills" data-tint="#72ffad">
          <div className="section-heading reveal">
            <span className="section-kicker">02 / Capability Field</span>
            <h2>A stack that moves from datasets to deployed systems to physical automation.</h2>
          </div>
          <div className="skill-orbit">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <article
                  className="skill-cluster tilt-card reveal"
                  data-accent={group.accent}
                  style={{ "--delay": `${index * 0.08}s` } as React.CSSProperties}
                  key={group.label}
                >
                  <div className="cluster-head">
                    <Icon className="size-5" />
                    <h3>{group.label}</h3>
                  </div>
                  <div className="skill-cloud">
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="marquee reveal" aria-hidden="true">
            <div className="marquee-track">
              {[...skillMarquee, ...skillMarquee].map((item, index) => (
                <span key={`${item.skill}-${index}`}>{item.skill}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="projects-section chapter projects-pin" id="projects" data-tint="#ff7d9d">
          <div className="section-heading project-intro reveal">
            <span className="section-kicker">03 / Proof in Motion</span>
            <h2>Three builds, three environments: hospital workflows, edge vision, and classroom automation.</h2>
          </div>
          <div className="project-shell">
            <div className="project-track">
              {projects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <article className="project-panel tilt-card" key={project.slug}>
                    <div className="project-copy">
                      <span className="project-index">0{index + 1}</span>
                      <div>
                        <p className="project-label">{project.label}</p>
                        <h3>{project.title}</h3>
                      </div>
                      <p>{project.summary}</p>
                      <div className="project-stack">
                        {project.stack.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        <Link className={cn(buttonVariants({ variant: "glass", size: "sm" }))} href={`/projects/${project.slug}`}>
                          <ArrowRight className="size-4" />
                          Case study
                        </Link>
                        <a
                          className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink className="size-4" />
                          GitHub
                        </a>
                      </div>
                    </div>
                    <div className="project-visual">
                      <Image
                        src={projectImageMap[project.visual]}
                        alt={`${project.title} visual interface preview`}
                        width={720}
                        height={520}
                      />
                      <Icon className="project-icon size-10" />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="experience-section chapter" id="experience" data-tint="#9db2ff">
          <div className="section-heading reveal">
            <span className="section-kicker">04 / Model Quality Workbench</span>
            <h2>LLM post-training experience shaped by evaluation discipline and practical engineering.</h2>
          </div>
          <div className="experience-flow">
            <div className="timeline-line" aria-hidden="true" />
            {experiences.map((item) => {
              const Icon = item.icon;
              return (
                <article className="experience-card reveal" key={`${item.company}-${item.role}`}>
                  <div className="experience-marker">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <p>{item.date}</p>
                    <h3>{item.role}</h3>
                    <span>
                      {item.company} / {item.mode}
                    </span>
                  </div>
                  <ul>
                    {item.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="credentials-section chapter" data-tint="#ffe06a">
          <div className="credentials-grid">
            <div className="credential-column reveal">
              <span className="section-kicker">05 / Foundation</span>
              <h2>Education, certifications, and leadership that explain the range.</h2>
            </div>
            <div className="credential-lanes">
              <div className="credential-lane reveal">
                <h3>Education</h3>
                {education.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={`${item.title}-${item.meta}`}>
                      <Icon className="size-5" />
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.place}</span>
                        <p>{item.meta}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="credential-lane reveal">
                <h3>Certifications</h3>
                {certifications.map((item) => (
                  <article key={item}>
                    <ExternalLink className="size-5" />
                    <div>
                      <strong>{item}</strong>
                    </div>
                  </article>
                ))}
              </div>
              <div className="credential-lane reveal">
                <h3>Leadership</h3>
                {responsibilities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title}>
                      <Icon className="size-5" />
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.detail}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section chapter" id="contact" data-tint="#75f0d3">
          <div className="contact-grid">
            <div className="contact-copy reveal">
              <span className="section-kicker">06 / Transmission</span>
              <h2>Let’s build something precise enough to trust and polished enough to remember.</h2>
              <p>
                Open to opportunities across LLM post-training, AI evaluation, frontend engineering, and applied IoT systems.
              </p>
              <div className="contact-methods">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <a href={method.href} key={method.label} target={method.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      <Icon className="size-5" />
                      <span>{method.label}</span>
                      <strong>{method.value}</strong>
                    </a>
                  );
                })}
              </div>
            </div>
            <form
              className="contact-form reveal"
              action={`mailto:${profile.email}`}
              method="post"
              encType="text/plain"
            >
              <label>
                <span>Name</span>
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                <span>Message</span>
                <textarea name="message" rows={5} required />
              </label>
              <Button type="submit" size="lg" className="magnetic">
                <Send className="size-5" />
                Send message
              </Button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
