import { CodeFile, DetectionIssue, Detector } from "../types";

const riskyPatterns: Array<{ regex: RegExp; message: string; suggestion: string }> = [
  {
    regex: /\bawait\s+[^;\n]+/,
    message: "Awaited async call may be missing explicit error handling.",
    suggestion: "Wrap risky async operations with try/catch or handle Promise rejection explicitly."
  },
  {
    regex: /\bfetch\s*\([^\)]*\)(?!\s*\.catch)/,
    message: "fetch() call appears without .catch() handling.",
    suggestion: "Add .catch() or use async/await inside try/catch to handle network errors."
  }
];

function getLineAndColumn(content: string, index: number): { line: number; column: number } {
  const upToMatch = content.slice(0, index);
  const lines = upToMatch.split("\n");
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

function lineHasErrorHandling(line: string): boolean {
  return /\b(try|catch|\.catch\s*\()\b/.test(line);
}

export const missingErrorHandlingDetector: Detector = {
  name: "missing-error-handling",
  detect(file: CodeFile): DetectionIssue[] {
    const issues: DetectionIssue[] = [];
    const lines = file.content.split("\n");

    for (const rule of riskyPatterns) {
      const matches = file.content.matchAll(new RegExp(rule.regex.source, "g"));
      for (const match of matches) {
        if (match.index === undefined) {
          continue;
        }

        const position = getLineAndColumn(file.content, match.index);
        const lineText = lines[position.line - 1] ?? "";

        if (lineHasErrorHandling(lineText)) {
          continue;
        }

        issues.push({
          type: "missing-error-handling",
          message: rule.message,
          severity: "medium",
          position,
          suggestion: rule.suggestion
        });
      }
    }

    return issues;
  }
};
