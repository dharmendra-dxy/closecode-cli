export type DeviceVerificationData = {
  user_code: string;
  status: "pending" | "approved" | "denied";
  client_id?: string;
  scope?: string | null;
};

export type DeviceStep = "enter-code" | "review" | "approved" | "denied";