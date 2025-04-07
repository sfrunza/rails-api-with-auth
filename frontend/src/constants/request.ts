import { TStatus } from "@/types/request";

export type TStatusExtended = {
  [key in Partial<TStatus | "all">]: number
}

type TStatusOptions = {
  [key in TStatus]: "Pending" | "Pending Info" | "Pending Date" | "Hold" | "Not Confirmed" | "Confirmed" | "Not Available" | "Completed" | "Spam" | "Canceled" | "Refused" | "Closed" | "Expired" | "Archived";
};

const STATUS_OPTIONS: TStatusOptions = {
  pending: "Pending",
  pending_info: "Pending Info",
  pending_date: "Pending Date",
  hold: "Hold",
  not_confirmed: "Not Confirmed",
  confirmed: "Confirmed",
  not_available: "Not Available",
  completed: "Completed",
  spam: "Spam",
  canceled: "Canceled",
  refused: "Refused",
  closed: "Closed",
  expired: "Expired",
  archived: "Archived",
};

type TStatusOption = {
  label: keyof TStatusOptions;
  value: TStatus;
};


export const statusOptions: TStatusOption[] = Object.entries(STATUS_OPTIONS).map(
  ([value, label]) => ({
    label: label as keyof TStatusOptions,
    value: value as TStatus,
  })
);

// Ttabs --------------------------------------

type TTab =
  | "All Requests"
  | "Pending"
  | "Not Confirmed"
  | "Confirmed"
  | "Not Available"
  | "Completed"
  | "Spam"
  | "Canceled"
  | "Refused"
  | "Closed"
  | "Expired"
  | "Archived";

type TTabOptions = {
  [key in
  | "all"
  | "pending"
  | "not_confirmed"
  | "confirmed"
  | "not_available"
  | "completed"
  | "spam"
  | "canceled"
  | "refused"
  | "closed"
  | "expired"
  | "archived"]: TTab;
};

const TAB_OPTIONS: TTabOptions = {
  all: "All Requests",
  pending: "Pending",
  not_confirmed: "Not Confirmed",
  confirmed: "Confirmed",
  not_available: "Not Available",
  completed: "Completed",
  spam: "Spam",
  canceled: "Canceled",
  refused: "Refused",
  closed: "Closed",
  expired: "Expired",
  archived: "Archived",
};

type TTabOption = {
  label: TTab;
  value: keyof TTabOptions;
};

export const tabOptions: TTabOption[] = Object.entries(TAB_OPTIONS).map(
  ([value, label]) => ({
    label: label as TTab,
    value: value as keyof TTabOptions,
  })
);

export const statusTextColors: Record<TStatus | "all", string> = {
  "all": "text-foreground",
  "pending": "text-amber-500",
  "pending_info": "text-red-500",
  "pending_date": "text-red-500",
  "hold": "text-amber-500",
  "not_confirmed": "text-indigo-500",
  "confirmed": "text-[#00a455]",
  "not_available": "text-foreground",
  "completed": "text-[#26a9f4]",
  "spam": "text-foreground",
  "canceled": "text-red-500",
  "refused": "text-foreground",
  "closed": "text-foreground",
  "expired": "text-foreground",
  "archived": "text-foreground",
};

export const statusBgColors: Record<TStatus | "all", string> = {
  "all": "bg-muted-foreground",
  "pending": "bg-amber-500",
  "pending_info": "bg-red-500",
  "pending_date": "bg-red-500",
  "hold": "bg-amber-500",
  "not_confirmed": "bg-indigo-500",
  "confirmed": "bg-[#00a455]",
  "not_available": "bg-foreground",
  "completed": "bg-[#26a9f4]",
  "spam": "bg-muted-foreground",
  "canceled": "bg-red-500",
  "refused": "bg-muted-foreground",
  "closed": "bg-muted-foreground",
  "expired": "bg-muted-foreground",
  "archived": "bg-muted-foreground",
};

type TFloorOption = { label: string; value: string; isDisabled?: boolean };


export enum FloorOptions {
  "1st/ground floor" = 1,
  "2nd floor" = 2,
  "3rd floor" = 3,
  "4th floor" = 4,
  "5th floor" = 5,
  "Private House" = 6,
  "Storage Unit" = 7,
  "Elevator Building" = 8,
}

export type FloorOptionKeys = keyof typeof FloorOptions;

export const floorOptions: TFloorOption[] = [
  {
    label: "Elevator",
    value: "Elevator Building",
  },
  {
    label: "1",
    value: "1st/ground floor",
  },
  {
    label: "2",
    value: "2nd floor",
  },
  {
    label: "3",
    value: "3rd floor",
  },
  {
    label: "4",
    value: "4th floor",
  },
  {
    label: "5",
    value: "5th floor",
    isDisabled: true,
  },
  {
    label: "House",
    value: "Private House",
  },

  {
    label: "Storage",
    value: "Storage Unit",
  },
];

function generateWorkTimeOptions() {
  const options = [];
  for (let hours = 0; hours < 24; hours++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      const timeInMinutes = hours * 60 + minutes;
      options.push({
        value: timeInMinutes,
        label: `${hours.toString()}:${minutes.toString().padStart(2, "0")}`,
      });
    }
  }
  return options;
}

const generateTimeOptions = (options?: { withMeridiem?: boolean | null }) => {
  const withMeridiem = options?.withMeridiem ?? false;
  const timeOptions = [];
  for (let i = 0; i < 24 * 60; i += 15) {
    const hours = Math.floor(i / 60);
    const minutes = i % 60;

    // Format time based on `withMeridiem` parameter
    const timeString = withMeridiem
      ? new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      : `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    timeOptions.push({ label: timeString, value: i });
  }
  return timeOptions;
};

export const TIME_OPTIONS_WITH_MERIDIEM = generateTimeOptions({ withMeridiem: true });
export const TIME_OPTIONS = generateWorkTimeOptions();
