import { CodeFile, DetectionIssue, Detector } from "../types";

const suspiciousApiPatterns: Array<{ regex: RegExp; message: string; suggestion: string }> = [
  {
    regex: /\b(fetchDataFromGPT|openAIMagicCall|autoFixCodeWithAI)\s*\(/,
    message: "Possible hallucinated API call detected.",
    suggestion: "Verify this API exists in official documentation and replace it with a valid SDK/API method."
  },
  {
    regex: /\b(ai\.generateCode|llm\.fixAllBugs|chatgpt\.execute)\s*\(/,
    message: "Non-standard AI API method usage detected.",
    suggestion: "Use documented methods from the chosen provider SDK instead of guessed method names."
  }
];

function getLineAndColumn(content: string, index: number): { line: number; column: number } {
  const upToMatch = content.slice(0, index);
  const lines = upToMatch.split("\n");
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

export const hallucinatedApiDetector: Detector = {
  name: "hallucinated-api",
  detect(file: CodeFile): DetectionIssue[] {
    const issues: DetectionIssue[] = [];

    for (const rule of suspiciousApiPatterns) {
      const matches = file.content.matchAll(new RegExp(rule.regex.source, "g"));
      for (const match of matches) {
        if (match.index === undefined) {
          continue;
        }
        const position = getLineAndColumn(file.content, match.index);
        issues.push({
          type: "hallucinated-api",
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
