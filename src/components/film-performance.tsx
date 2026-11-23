import { BadgeCheck, Eclipse, ShieldCheck, SunDim } from "lucide-react";
import type { FilmPerformance as Performance } from "@/types/store";
import styles from "./film-performance.module.css";

export function FilmPerformance({
  performance,
  compact = false,
  brand = "origin",
}: {
  performance: Performance;
  compact?: boolean;
  brand?: "nevada" | "origin";
}) {
  const metrics = [
    {
      label: "Rejeição de energia solar",
      compactLabel: "Solar (TSER)",
      value: performance.solar,
      upTo: performance.solarUpTo,
      Icon: Eclipse,
      description: "Menos calor acumulado no interior.",
    },
    {
      label: "Retenção de raios IR",
      compactLabel: "Raios IR",
      value: performance.infrared,
      upTo: performance.infraredUpTo,
      Icon: SunDim,
      description: "Redução do calor causado pelos raios infravermelhos.",
    },
    {
      label: "Proteção UV / UVR",
      compactLabel: "UV / UVR",
      value: performance.ultraviolet,
      Icon: ShieldCheck,
      description: "Bloqueio dos raios ultravioleta UVA e UVB.",
    },
  ];

  return (
    <div
      className={`${styles.panel}${compact ? ` ${styles.compact}` : ""}${brand === "nevada" ? ` ${styles.nevada}` : ""}`}
      data-film-brand={brand}
    >
      <dl
        className={styles.metrics}
        aria-label="Desempenho e garantia da película"
      >
        {metrics.map(
          ({ label, compactLabel, value, upTo, Icon, description }) => (
            <div className={styles.metric} key={label}>
              <Icon className={styles.icon} size={32} aria-hidden="true" />
              <dt title={compact ? label : undefined}>
                {compact ? compactLabel : label}
              </dt>
              <dd>
                <span
                  className={`${styles.value}${value === null ? ` ${styles.pending}` : ""}`}
                >
                  {value === null ? (
                    "Sob consulta"
                  ) : (
                    <>
                      {upTo && <small>até </small>}
                      {value}%
                    </>
                  )}
                </span>
                {!compact && (
                  <span className={styles.description}>{description}</span>
                )}
              </dd>
            </div>
          ),
        )}
        <div className={styles.metric}>
          <BadgeCheck className={styles.icon} size={32} aria-hidden="true" />
          <dt>Garantia</dt>
          <dd>
            <span
              className={`${styles.value} ${styles.warranty}`}
              title={performance.warrantyDetails}
            >
              {compact &&
              performance.warranty === "Vitalícia" &&
              performance.warrantyDetails?.startsWith("Vitalícia no automotivo")
                ? "Vitalícia auto."
                : (performance.warranty ?? "Sob consulta")}
            </span>
            {!compact && performance.warrantyDetails && (
              <span className={styles.description}>
                {performance.warrantyDetails}
              </span>
            )}
          </dd>
        </div>
      </dl>
      <p className={styles.note}>
        {compact
          ? "Varia conforme a tonalidade."
          : "Índices de referência da linha. O desempenho varia conforme a tonalidade."}
      </p>
    </div>
  );
}
