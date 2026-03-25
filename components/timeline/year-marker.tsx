interface YearMarkerProps {
  ano: number;
}

export function YearMarker({ ano }: YearMarkerProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div
        className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center shrink-0 z-10 relative"
        aria-hidden="true"
      >
        <span className="text-xs font-bold leading-none">{ano}</span>
      </div>
      <div className="h-[1px] flex-1 bg-border" aria-hidden="true" />
    </div>
  );
}
