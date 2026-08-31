interface StepperProps {
  /** Array of step labels to display */
  steps: string[];
  /** Currently active step (0-indexed) */
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center w-full px-2">
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive    = index === currentStep;
        const isLast      = index === steps.length - 1;

        return (
          <div key={index} className="flex items-center flex-1 last:flex-none">

            {/* ── Step node ── */}
            <div className="flex flex-col items-center gap-1.5 shrink-0">

              {/* Circle */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300"
                style={
                  isCompleted
                    ? {
                        background: 'var(--primary)',
                        color: '#fff',
                        boxShadow: '0 0 0 3px rgba(0,82,204,0.15)',
                      }
                    : isActive
                    ? {
                        background: 'var(--primary)',
                        color: '#fff',
                        boxShadow: '0 0 0 4px rgba(0,82,204,0.20)',
                      }
                    : {
                        background: 'transparent',
                        color: 'var(--text-muted)',
                        border: '1.5px solid var(--border-color)',
                      }
                }
              >
                {isCompleted ? (
                  /* Checkmark for completed */
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Label */}
              <span
                className="text-[9px] font-semibold tracking-widest uppercase whitespace-nowrap transition-colors duration-300"
                style={{
                  color: isActive
                    ? 'var(--primary)'
                    : isCompleted
                    ? 'var(--text-muted)'
                    : 'var(--text-muted)',
                  opacity: isActive ? 1 : isCompleted ? 0.9 : 0.65,
                }}
              >
                {label}
              </span>
            </div>

            {/* ── Connector line (not after last step) ── */}
            {!isLast && (
              <div
                className="flex-1 h-px mx-2 mb-5 transition-all duration-500"
                style={{
                  background: isCompleted
                    ? 'var(--primary)'
                    : 'var(--border-color)',
                  opacity: isCompleted ? 0.8 : 0.6,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
