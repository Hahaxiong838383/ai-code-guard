import { CodeFile, DetectionIssue, Detector } from "../types";

const insecurePatterns: Array<{ regex: RegExp; message: string; severity: DetectionIssue["severity"]; suggestion: string }> = [
  {
    regex: /\beval\s*\(/,
    message: "Use of eval() can lead to code injection vulnerabilities.",
    severity: "high",
    suggestion: "Replace eval() with safe parsing or explicit logic."
  },
  {
    regex: /\bnew\s+Function\s*\(/,
    message: "Dynamic Function constructor detected; this is a code injection risk.",
    severity: "high",
    suggestion: "Avoid runtime code generation from strings."
  },
  {
    regex: /\b(innerHTML)\s*=\s*[^;]+/,
    message: "Direct innerHTML assignment may introduce XSS.",
    severity: "high",
    suggestion: "Use textContent or sanitize untrusted HTML before rendering."
  },
  {
    regex: /\b(md5|sha1)\s*\(/,
    message: "Weak cryptographic hash usage detected.",
    severity: "medium",
    suggestion: "Use modern algorithms such as SHA-256 or stronger password hashing (bcrypt/argon2)."
  }
];

function getLineAndColumn(content: string, index: number): { line: number; column: number } {
  const upToMatch = content.slice(0, index);
  const lines = upToMatch.split("\n");
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

export const insecurePatternDetector: Detector = {
  name: "insecure-pattern",
  detect(file: CodeFile): DetectionIssue[] {
    const issues: DetectionIssue[] = [];

    for (const rule of insecurePatterns) {
      const matches = file.content.matchAll(new RegExp(rule.regex.source, "g"));
      for (const match of matches) {
        if (match.index === undefined) {
          continue;
        }
        const position = getLineAndColumn(file.content, match.index);
        issues.push({
          type: "insecure-pattern",
          message: rule.message,
          severity: rule.severity,
          position,
          suggestion: rule.suggestion
        });
      }
    }

    return issues;
  }
};
