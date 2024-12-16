import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      singleTurfData: {},
      selectedSideBarTab: "DashBoard",
      isLogin: false,
      isLoading: false,
      superAdminTurfViewData: {},
      isNewUser: false,
      ownerDetails: {},
      owerinnerdetails: {},
      dashboardLocationList: {},
      selectedLocationData: {},
      selectedViewTypeTurf: "gridView",
      ForgotEmailId: "",
      ForgotPasswordPage: 0,
      OtpVerifyHoldData: [],
      Statusactive: false,
      BranchRecords: [],
      OrganizationID: "",
      ToggleBars: false,
      TicketIDS:"",
      settheTicketIDs:(newData)=>set({TicketIDS:newData}),
      setToggleBars: (newData) => set({ ToggleBars: newData }),
      setOrganizationIDS: (newData) => set({ OrganizationID: newData }),
      setBranchRecords: (newData) => set({ BranchRecords: newData }),
      setStatusActive: (newData) => set(() => ({ Statusactive: newData })),
      setForgotEmailId: (newData) => set(() => ({ ForgotEmailId: newData })),
      setForgotPasswordInPage: (newData) => set(() => ({ ForgotPasswordPage: newData })),
      setOtpVerifyHoldData: (newData) => set(() => ({ OtpVerifyHoldData: newData })),
      setSingleTurfData: (newData) => set(() => ({ singleTurfData: newData })),
      setSelectedSideBarTab: (val) => set(() => ({ selectedSideBarTab: val })),
      setIsLogin: (val) => set(() => ({ isLogin: val })),
      setIsLoading: (val) => set(() => ({ isLoading: val })),
      setSuperAdminTurfViewData: (data) => set(() => ({ superAdminTurfViewData: data })),
      setIsNewUser: (val) => set(() => ({ isNewUser: val })),
      setOwnerDetails: (val) => set(() => ({ ownerDetails: val })),
      setOwnerinnerDetails: (val) => set(() => ({ owerinnerdetails: val })),
      setSelectedViewTypeTurf: (val) => set(() => ({ selectedViewTypeTurf: val })),
      setDashboardLocationList: (val) => set(() => ({ dashboardLocationList: val })),
      setSelectedLocationData: (val) => set(() => ({ selectedLocationData: val }))
    }),
    {
      name: 'Ticking-store', // unique name for the storage
      getStorage: () => localStorage, // use localStorage for persistence

    }
  )
);

export default useStore;



