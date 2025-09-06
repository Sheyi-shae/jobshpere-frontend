import { CheckCircle2, Circle } from "lucide-react";

// Renamed for clarity
export const evaluatePassword = (password) => ({
  length: password?.length >= 6,
  lowercase: /[a-z]/.test(password || ""),
  uppercase: /[A-Z]/.test(password || ""),
  number: /\d/.test(password || ""),
  special: /[@$!%*?&]/.test(password || ""),
});

export const renderCheck = (condition, text) => (
  <div className="flex items-center space-x-2 text-sm">
    {condition ? (
      <CheckCircle2 className="text-amber-500 w-4 h-4" />
    ) : (
      <Circle className="text-gray-400 w-4 h-4" />
    )}
    <span className={condition ? "text-amber-500" : "text-gray-500"}>{text}</span>
  </div>
);

export const renderPasswordChecks = (password) => {
  const checks = evaluatePassword(password);
  return (
    <div className="space-y-1 mt-2 ml-1">
      {renderCheck(checks.length, "At least 6 characters")}
      {renderCheck(checks.lowercase, "At least one lowercase letter")}
      {renderCheck(checks.uppercase, "At least one uppercase letter")}
      {renderCheck(checks.number, "At least one number")}
      {renderCheck(checks.special, "At least one special character")}
    </div>
  );
};
