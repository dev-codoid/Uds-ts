import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      singleTurfData: {},
      selectedSideBarTab: "DashBoard",
      isLogin: false,
      isLoading: false,
      isLoading2: false,

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
      TicketIDS: "",
      thanksContent: false,
      thanksContentticketview: false,
      Client_idStore:"",
      ActiveBars: "All",
      PrioritValues: { value: "", label: "ALL" },
      TicketCreateREsponse:[],
      setClientID_store: (newData) => set({ Client_idStore: newData }),

      setTicketResponse: (newData) => set({ TicketCreateREsponse: newData }),
      setPriorityValuesstore: (newData) => set({ PrioritValues: newData }),
      SetActiveBars: (newData) => set({ ActiveBars: newData }),
      settheThankpopup: (newData) => set({ thanksContent: newData }),
      settheThankpopupticketview: (newData) => set({ thanksContentticketview: newData }),

      settheTicketIDs: (newData) => set({ TicketIDS: newData }),
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
      setIsLoadingtwo: (val) => set(() => ({ isLoading2: val })),

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



