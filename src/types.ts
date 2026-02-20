export type Severity = "low" | "medium" | "high";

export interface IssuePosition {
  line: number;
  column: number;
}

export interface DetectionIssue {
  type: string;
  message: string;
  severity: Severity;
  position: IssuePosition;
  suggestion: string;
}

export interface CodeFile {
  filePath: string;
  content: string;
}

export interface Detector {
  name: string;
  detect(file: CodeFile): DetectionIssue[];
}
