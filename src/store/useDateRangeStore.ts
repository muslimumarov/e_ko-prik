import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import moment from "moment";
import { DATE } from "../core/constants/date.constants";

export interface DateRange {
  from: string;
  to: string;
}

type DateRangeStoreState = {
  range: DateRange;
  setRange: (_range: DateRangeStoreState["range"]) => void;
};

const useDateRangeStore = create<DateRangeStoreState>()(
  persist(
    (set) => ({
      setRange: (range) => {
        set({ range });
      },
      range: {
        from: moment(new Date()).subtract(14, "d").format(DATE),
        to: moment().format(DATE),
      },
    }),
    {
      name: "DATE",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useDateRangeStore;
