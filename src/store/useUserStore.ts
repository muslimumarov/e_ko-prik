// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// import { AuthInterface } from "../core/interfaces/auth/auth.interface";
//
// type UserStoreState = {
//   me: AuthInterface | null;
//   setMe: (_info: UserStoreState["me"]) => void;
// };
//
// const useUserStore = create<UserStoreState>()(
//   persist(
//     (set) => ({
//       setMe: (data) => {
//         set({ me: data });
//       },
//       me: null,
//     }),
//     {
//       name: "userStore",
//       storage: createJSONStorage(() => localStorage),
//     },
//   ),
// );
//
// export default useUserStore;
