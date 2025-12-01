export type DeviceSession = {
  id: string;
  name: string;
  platform: string;
  browser?: string;
  ip: string;
  location: { city: string; country: string };
  lastActive: string;
  loginDate: string;
  version: string;
  current: boolean;
};

export const deviceSessions: DeviceSession[] = [
  {
    id: "session_1",
    name: "Windows • Chrome 121",
    platform: "Windows",
    browser: "Chrome",
    ip: "46.201.113.52",
    location: { city: "Yerevan", country: "Armenia" },
    lastActive: "2 minutes ago",
    loginDate: "2025-01-02",
    version: "1.0.3",
    current: true,
  },
  {
    id: "session_2",
    name: "iPhone 12",
    platform: "iOS",
    browser: "Secure Call",
    ip: "185.122.44.10",
    location: { city: "Moscow", country: "Russia" },
    lastActive: "Yesterday",
    loginDate: "2024-12-29",
    version: "1.0.1",
    current: false,
  },
];
