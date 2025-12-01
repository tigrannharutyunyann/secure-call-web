export type CallHistoryType = "voice" | "missed";

export interface CallHistoryEntry {
  id: number;
  type: CallHistoryType;
  duration?: string;
  timestamp: string;
}

export const historyByContact: Record<string, CallHistoryEntry[]> = {
  "1": [
    { id: 1, type: "voice", duration: "01:35", timestamp: "12:04" },
    { id: 2, type: "missed", timestamp: "09:41" },
  ],
  "2": [
    { id: 1, type: "missed", timestamp: "08:15" },
    { id: 2, type: "voice", duration: "05:12", timestamp: "Yesterday" },
  ],
  "3": [
    { id: 1, type: "voice", duration: "15:48", timestamp: "Monday" },
  ],
  "4": [{ id: 1, type: "missed", timestamp: "Yesterday" }],
};
