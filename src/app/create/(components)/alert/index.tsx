"use client";

import { useEffect } from "react";
import { useAlertDialog } from "@/components/contexts";
import { useEventEnterFormStore } from "@/features/poster/store";
import { usePathname, useRouter } from "next/navigation";

export const CreateAlert = () => {
  const { open } = useAlertDialog();
  const pathname = usePathname();
  const router = useRouter();
  const userForm = useEventEnterFormStore(state => state.userForm);
  const posterForm = useEventEnterFormStore(state => state.posterForm);

  useEffect(() => {
    // 이벤트 참여 정보가 없으면 알림 띄우기
    const isEventEnterForm = Object.keys(userForm).length > 0;
    if (!isEventEnterForm && pathname === "/create") {
      open({
        title: "이벤트 참여 정보가 없습니다.",
        description: "메인 페이지로 이동하여<br /> 이벤트 참여 정보를 입력해주세요.",
        onConfirm() {
          router.push("/");
        },
        onClose() {
          router.push("/");
        }
      });
      return;
    }

    // 이벤트 참여 정보가 있으면 포스터 제작 페이지로 이동
    const isPosterForm =
      posterForm.carType && posterForm.posterTitle && posterForm.instagramName && posterForm.imageBase64;
    if (!isPosterForm && pathname === "/create/submit") {
      open({
        title: "포스터 제작 정보가 없습니다.",
        description: "포스터 제작 정보를 입력해주세요.",
        onConfirm() {
          if (!isEventEnterForm) {
            router.push("/");
          } else {
            router.push("/create");
          }
        },
        onClose() {
          if (!isEventEnterForm) {
            router.push("/");
          } else {
            router.push("/create");
          }
        }
      });
      return;
    }
  }, [router, open, userForm, pathname, posterForm]);

  return <></>;
};
