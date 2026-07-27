export function RooflineMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 220"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Motif graphique de toits stylisés, signature visuelle ROC Immobilier Services */}
      <g fill="currentColor">
        <path d="M0 220V150L60 100L120 150V220Z" opacity="0.9" />
        <path d="M100 220V120L180 60L260 120V220Z" opacity="0.75" />
        <path d="M240 220V140L300 95L360 140V220Z" opacity="0.9" />
        <path d="M340 220V110L430 45L520 110V220Z" opacity="0.6" />
        <path d="M500 220V150L560 100L620 150V220Z" opacity="0.9" />
        <path d="M600 220V125L680 65L760 125V220Z" opacity="0.75" />
        <path d="M740 220V140L800 95L860 140V220Z" opacity="0.9" />
        <path d="M840 220V105L930 40L1020 105V220Z" opacity="0.6" />
        <path d="M1000 220V150L1060 100L1120 150V220Z" opacity="0.9" />
        <path d="M1090 220V135L1150 90L1200 135V220Z" opacity="0.75" />
      </g>
    </svg>
  );
}
