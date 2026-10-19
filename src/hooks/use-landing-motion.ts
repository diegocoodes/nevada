"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const revealSelectors = [
  ".campaign-intro-grid > *",
  ".campaign-heading",
  ".atelier-process-grid > article",
  ".atelier-services-grid > *",
  ".campaign-offer-card",
  ".campaign-story-grid > *",
  ".studio-brands-inner > *",
  ".studio-information-grid > *",
  ".atelier-gallery-grid > figure",
  ".campaign-distributor .container > *",
  ".dl-material-strip .container > *",
  ".distributor-brands > a",
  ".lines-explorer > *",
  ".featured-section .section-heading > *",
  ".dl-faq-grid > *",
  ".dl-final > .container > *",
  ".footer-grid > div",
].join(",");

export function useLandingMotion(
  root: RefObject<HTMLDivElement | null>,
  pathname: string,
) {
  useEffect(() => {
    const element = root.current?.closest<HTMLDivElement>(".storefront");
    if (!element || !["/", "/distribuidora"].includes(pathname)) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let mounted = true;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const targets: HTMLElement[] = [];
      const seen = new WeakSet<Element>();
      const animateContent = () => {
        const entranceDelay = element.querySelector(".site-entrance")
          ? 0.75
          : 0;
        const heroCopy = element.querySelector(".campaign-hero-copy");
        if (heroCopy && !seen.has(heroCopy)) {
          seen.add(heroCopy);
          gsap.from(
            Array.from(heroCopy.children).filter(
              (child) => child.tagName !== "H1",
            ),
            {
              opacity: 0,
              y: 22,
              duration: 0.8,
              stagger: 0.1,
              delay: entranceDelay,
              ease: "power3.out",
              clearProps: "transform,opacity",
            },
          );
        }

        element.querySelectorAll<HTMLElement>("h1,h2").forEach((heading) => {
          const words = heading.querySelectorAll(".motion-word");
          if (!words.length || seen.has(heading)) return;
          seen.add(heading);
          const inHero = Boolean(heading.closest(".campaign-hero"));
          gsap.from(words, {
            yPercent: 112,
            opacity: 0,
            rotationX: 22,
            duration: 0.8,
            stagger: 0.055,
            delay: inHero ? entranceDelay + 0.1 : 0,
            ease: "power3.out",
            clearProps: "transform,opacity",
            ...(inHero
              ? {}
              : {
                  scrollTrigger: {
                    trigger: heading,
                    start: "top 93%",
                    once: true,
                  },
                }),
          });
        });

        const hero = element.querySelector(".campaign-hero");
        const photo = hero?.querySelector(".hero-photo");
        if (hero && photo && !seen.has(photo)) {
          seen.add(photo);
          gsap.from(photo, { scale: 1.055, duration: 1.5, ease: "power2.out" });
          gsap.to(photo, {
            y: 24,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        }

        const freshTargets = Array.from(
          element.querySelectorAll<HTMLElement>(revealSelectors),
        ).filter(
          (target) => !target.closest("[data-reveal]") && !seen.has(target),
        );

        freshTargets.forEach((target) => {
          seen.add(target);
          targets.push(target);
          gsap.from(target, {
            opacity: 0,
            y: 26,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: target,
              start: "top 92%",
              once: true,
            },
          });
        });
      };
      const context = gsap.context(animateContent, element);
      let frame = 0;
      const observer = new MutationObserver(() => {
        if (frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          context.add(animateContent);
          ScrollTrigger.refresh();
        });
      });
      observer.observe(element, { childList: true, subtree: true });

      const showFocusedContent = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) return;
        for (const target of targets) {
          if (target.contains(event.target)) {
            gsap.getTweensOf(target).forEach((tween) => tween.progress(1));
          }
        }
      };
      element.addEventListener("focusin", showFocusedContent);
      return () => {
        observer.disconnect();
        cancelAnimationFrame(frame);
        element.removeEventListener("focusin", showFocusedContent);
        context.revert();
      };
    });

    const refresh = () => {
      if (mounted) ScrollTrigger.refresh();
    };
    void document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });
    return () => {
      mounted = false;
      window.removeEventListener("load", refresh);
      media.revert();
    };
  }, [pathname, root]);
}
