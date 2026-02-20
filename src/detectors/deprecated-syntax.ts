import { CodeFile, DetectionIssue, Detector } from "../types";

const deprecatedSyntaxRules: Array<{ regex: RegExp; message: string; suggestion: string }> = [
  {
    regex: /\bvar\s+[a-zA-Z_$][\w$]*/,
    message: "Deprecated variable declaration style with var.",
    suggestion: "Use let or const for block-scoped declarations."
  },
  {
    regex: /\bnew\s+Buffer\s*\(/,
    message: "Deprecated Buffer constructor usage detected.",
    suggestion: "Use Buffer.from(), Buffer.alloc(), or Buffer.allocUnsafe() instead."
  },
  {
    regex: /\bsubstr\s*\(/,
    message: "substr() is legacy and may be removed in future runtimes.",
    suggestion: "Use slice() or substring() instead."
  }
];

function getLineAndColumn(content: string, index: number): { line: number; column: number } {
  const upToMatch = content.slice(0, index);
  const lines = upToMatch.split("\n");
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

export const deprecatedSyntaxDetector: Detector = {
  name: "deprecated-syntax",
  detect(file: CodeFile): DetectionIssue[] {
    const issues: DetectionIssue[] = [];

    for (const rule of deprecatedSyntaxRules) {
      const matches = file.content.matchAll(new RegExp(rule.regex.source, "g"));
      for (const match of matches) {
        if (match.index === undefined) {
          continue;
        }
        const position = getLineAndColumn(file.content, match.index);
        issues.push({
          type: "deprecated-syntax",
          message: rule.message,
          severity: "low",
          position,
          suggestion: rule.suggestion
        });
      }
    }

    return issues;
  }
};
