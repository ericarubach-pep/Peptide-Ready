import { AlertTriangle } from "lucide-react";

// Section 9.2: regulatory tracker content must note status can change, link
// primary sources, recommend legal counsel.
export function AlertBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-start gap-2 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
      <div>
        {children}
        <p className="mt-1 text-xs text-blue-700">
          Regulatory status may change. Verify at FDA.gov and consult legal counsel before relying
          on this information.
        </p>
      </div>
    </div>
  );
}
