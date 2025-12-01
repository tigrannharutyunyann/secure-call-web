export type CallType = "voice" | "missed";

export interface Contact {
  id: string;
  name: string;
  status: string;
  avatar: string;
  lastCallTime?: string;
  lastCallType?: CallType;
}

export const contacts: Contact[] = [
  {
    id: "1",
    name: "Narek Ohanyan",
    status: "Online • Secure",
    avatar: "https://i.pravatar.cc/100?img=12",
    lastCallTime: "10:23",
    lastCallType: "voice",
  },
  {
    id: "2",
    name: "Ani Petrosyan",
    status: "Last seen 5m ago",
    avatar: "https://i.pravatar.cc/100?img=32",
    lastCallTime: "09:41",
    lastCallType: "missed",
  },
  {
    id: "3",
    name: "Karen Davtyan",
    status: "Online • Key pinned",
    avatar: "https://i.pravatar.cc/100?img=14",
    lastCallTime: "Yesterday",
    lastCallType: "voice",
  },
  {
    id: "4",
    name: "Lilit Hakobyan",
    status: "Do not disturb",
    avatar: "https://i.pravatar.cc/100?img=5",
    lastCallTime: "Mon",
    lastCallType: "missed",
  },
];
