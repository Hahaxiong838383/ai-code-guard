#!/usr/bin/env node
import * as fs from "node:fs";
import * as path from "node:path";
import { deprecatedSyntaxDetector } from "./detectors/deprecated-syntax";
import { hallucinatedApiDetector } from "./detectors/hallucinated-api";
import { insecurePatternDetector } from "./detectors/insecure-pattern";
import { missingErrorHandlingDetector } from "./detectors/missing-error-handling";
import { generateAlipayDonateLink, generatePayPalMeLink, SupportedCurrency } from "./payment";
import { CodeFile, DetectionIssue, Detector } from "./types";

const detectors: Detector[] = [
  hallucinatedApiDetector,
  insecurePatternDetector,
  missingErrorHandlingDetector,
  deprecatedSyntaxDetector
];

function isSupportedFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return [".ts", ".tsx", ".js", ".jsx"].includes(ext);
}

function collectFiles(targetPath: string): string[] {
  if (!fs.existsSync(targetPath)) {
    return [];
  }

  const stat = fs.statSync(targetPath);
  if (stat.isFile()) {
    return isSupportedFile(targetPath) ? [targetPath] : [];
  }

  if (!stat.isDirectory()) {
    return [];
  }

  const collected: string[] = [];
  const entries = fs.readdirSync(targetPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(targetPath, entry.name);
    if (entry.isDirectory()) {
      collected.push(...collectFiles(fullPath));
    } else if (entry.isFile() && isSupportedFile(fullPath)) {
      collected.push(fullPath);
    }
  }

  return collected;
}

function analyzeFile(filePath: string): DetectionIssue[] {
  const content = fs.readFileSync(filePath, "utf8");
  const codeFile: CodeFile = { filePath, content };
  const issues: DetectionIssue[] = [];

  for (const detector of detectors) {
    issues.push(...detector.detect(codeFile));
  }

  return issues;
}

function printIssues(filePath: string, issues: DetectionIssue[]): void {
  if (issues.length === 0) {
    return;
  }

  console.log(`\n${filePath}`);
  for (const issue of issues) {
    console.log(
      `  [${issue.severity.toUpperCase()}] ${issue.type} at ${issue.position.line}:${issue.position.column}`
    );
    console.log(`    ${issue.message}`);
    console.log(`    Suggestion: ${issue.suggestion}`);
  }
}

function printUsage(): void {
  console.log("Usage: ai-sentinel <file-or-directory> [more paths...]");
  console.log("       ai-sentinel pay --amount <number> [--currency usd|cny]");
}

function parsePayArgs(args: string[]): { amount: number; currency: SupportedCurrency } | null {
  let amount: number | null = null;
  let currency: SupportedCurrency = "usd";

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === "--amount") {
      const value = args[i + 1];
      if (!value) {
        return null;
      }
      amount = Number.parseFloat(value);
      i += 1;
      continue;
    }

    if (arg === "--currency") {
      const value = args[i + 1]?.toLowerCase();
      if (value !== "usd" && value !== "cny") {
        return null;
      }
      currency = value;
      i += 1;
    }
  }

  if (amount === null || Number.isNaN(amount) || amount <= 0) {
    return null;
  }

  return { amount, currency };
}

function handlePayCommand(args: string[]): void {
  const parsed = parsePayArgs(args);
  if (!parsed) {
    console.log("Usage: ai-sentinel pay --amount <number> [--currency usd|cny]");
    process.exit(1);
  }

  const { amount, currency } = parsed;
  console.log(`Payment links for ${amount.toFixed(2)} ${currency.toUpperCase()}:`);
  console.log(`PayPal: ${generatePayPalMeLink(amount)}`);
  console.log(`Alipay: ${generateAlipayDonateLink(amount)}`);
  process.exit(0);
}

function main(): void {
  const inputPaths = process.argv.slice(2);
  if (inputPaths.length === 0) {
    printUsage();
    process.exit(1);
  }

  if (inputPaths[0] === "pay") {
    handlePayCommand(inputPaths.slice(1));
  }

  const files = inputPaths.flatMap((p) => collectFiles(path.resolve(process.cwd(), p)));
  if (files.length === 0) {
    console.log("No supported files found. Use .ts/.tsx/.js/.jsx files.");
    process.exit(1);
  }

  let totalIssues = 0;
  for (const filePath of files) {
    const issues = analyzeFile(filePath);
    totalIssues += issues.length;
    printIssues(filePath, issues);
  }

  console.log(`\nScanned ${files.length} file(s), found ${totalIssues} issue(s).`);
  process.exit(totalIssues > 0 ? 2 : 0);
}

main();
