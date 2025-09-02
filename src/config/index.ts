export const basePath = "";
export const EVENT_INFO = {
  info: {
    start: "2025. 09. 29 (Mon)",
    end: "2025. 11. 10 (Mon)",
    announcement: "2025. 11. 00 (Mon)"
  },
  date: {
    start: "2025-09-29",
    end: "2025-11-10",
    announcement: "2025-11-00"
  }
};

export const ROUTES = {
  HOME: {
    title: "메인",
    layoutTitle: "메인",
    link: "/"
  },
  ENTER_EVENT_FORM: {
    title: "이벤트 참여",
    layoutTitle: "이벤트 참여",
    link: "/form"
  },
  CREATE_FORM: {
    title: "포스터 제작하기",
    layoutTitle: "포스터 제작하기",
    link: "/create"
  },
  CREATE_SUBMIT: {
    title: "사연 작성하기",
    layoutTitle: "사연 작성하기",
    link: "/create/submit"
  },
  CREATE_COMPLETE_POSTER: {
    title: "포스터 생성 완료",
    layoutTitle: "사연 작성하기",
    link: "/create/complete/:posterId"
  }
} as const;
