"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import type { SectionId } from "@/types/portfolio";
import { ArcadePanel } from "./panels/ArcadePanel";
import { DeploymentsPanel } from "./panels/DeploymentsPanel";
import { DossierPanel } from "./panels/DossierPanel";
import { MissionsPanel } from "./panels/MissionsPanel";
import { SkillTreePanel } from "./panels/SkillTreePanel";
import { UplinkPanel } from "./panels/UplinkPanel";
import { BootSequence } from "./BootSequence";
import { HudChrome } from "./HudChrome";
import { MainMenuHub } from "./MainMenuHub";
import { MobileDock } from "./MobileDock";
import { DungeonWall } from "./ui/DungeonWall";

export function PortfolioOS() {
  const [booted, setBooted] = useState(false);
  const [section, setSection] = useState<SectionId>("menu");
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(prefersReducedMotion());
  }, []);

  const openSection = useCallback((id: SectionId) => {
    setSection(id);
  }, []);

  const backToMenu = useCallback(() => {
    setSection("menu");
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!booted) return;
      if (e.key === "Escape" && section !== "menu") {
        e.preventDefault();
        setSection("menu");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [booted, section]);

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-canvas text-ink">
      <DungeonWall className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="scanlines pointer-events-none absolute inset-0" />

      <AnimatePresence mode="wait">
        {!booted ? (
          <BootSequence key="boot" onComplete={() => setBooted(true)} />
        ) : (
          <motion.div
            key="os"
            className="relative z-10 flex h-full flex-col"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            <HudChrome
              section={section}
              onHome={backToMenu}
              onNavigate={openSection}
            />

            <div className="relative flex min-h-0 flex-1 pb-16 md:pb-0">
              <AnimatePresence mode="wait">
                {section === "menu" ? (
                  <MainMenuHub key="menu" onSelect={openSection} />
                ) : (
                  <motion.main
                    key={section}
                    className="panel-scroll relative z-10 mx-auto w-full max-w-6xl flex-1 px-2 py-3 md:px-6 md:py-4"
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {section === "dossier" && <DossierPanel />}
                    {section === "loadout" && <SkillTreePanel />}
                    {section === "deployments" && <DeploymentsPanel />}
                    {section === "missions" && <MissionsPanel />}
                    {section === "arcade" && <ArcadePanel />}
                    {section === "uplink" && <UplinkPanel />}
                  </motion.main>
                )}
              </AnimatePresence>
            </div>

            <MobileDock
              section={section}
              onHome={backToMenu}
              onNavigate={openSection}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
