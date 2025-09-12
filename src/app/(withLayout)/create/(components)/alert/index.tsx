"use client";

import { useEffect } from "react";
import { useAlertDialog } from "@/components/contexts";
import { useEventEnterFormStore } from "@/features/poster/store";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/config";
import { getParticipationStatus } from "@/features/poster/api";

export const CreateAlert = () => {
  const { open } = useAlertDialog();
  const pathname = usePathname();
  const router = useRouter();
  const userForm = useEventEnterFormStore(state => state.userForm);
  const posterForm = useEventEnterFormStore(state => state.posterForm);
  const hasHydrated = useEventEnterFormStore(state => state._hasHydrated);

  const isCreateFormPage = pathname === ROUTES.CREATE_FORM.link;
  const isCreateSubmitPage = pathname === ROUTES.CREATE_SUBMIT.link;

  useEffect(() => {
    if (!userForm.phone) return;

    async function checkParticipationStatus() {
      const response = await getParticipationStatus({ phone: userForm.phone as string });
      if (response.data.posterId) {
        open({
          title: "이벤트 안내",
          description: "이미 참여하셨습니다. 포스터 제작 페이지로 이동합니다.",
          onConfirm() {
            if (response.data.posterId) {
              router.push(ROUTES.CREATE_COMPLETE_POSTER.link.replace(":posterId", response.data.posterId.toString()));
            }
          }
        });
      }
    }

    if (isCreateFormPage || isCreateSubmitPage) {
      checkParticipationStatus();
    }
  }, [userForm.phone, open, router, isCreateFormPage, isCreateSubmitPage]);

  useEffect(() => {
    if (!hasHydrated) return;

    // 이벤트 참여 정보가 없으면 알림 띄우기
    const isEventEnterForm = Object.keys(userForm).length > 0;
    if (!isEventEnterForm && isCreateFormPage) {
      // open({
      //   title: "이벤트 참여 정보가 없습니다.",
      //   description: "메인 페이지로 이동하여<br /> 이벤트 참여 정보를 입력해주세요.",
      //   onConfirm() {
      //     router.push(ROUTES.HOME.link);
      //   },
      //   onClose() {
      //     router.push(ROUTES.HOME.link);
      //   }
      // });
      return;
    }

    // 이벤트 참여 정보가 있으면 포스터 제작 페이지로 이동
    const isPosterForm = posterForm.carCode && posterForm.title && posterForm.instagramId && posterForm.imageBase64;
    if (!isPosterForm && isCreateSubmitPage) {
      // open({
      //   title: "포스터 제작 정보가 없습니다.",
      //   description: "포스터 제작 정보를 입력해주세요.",
      //   onConfirm() {
      //     if (!isEventEnterForm) {
      //       router.push(ROUTES.HOME.link);
      //     } else {
      //       router.push(ROUTES.CREATE_FORM.link);
      //     }
      //   },
      //   onClose() {
      //     if (!isEventEnterForm) {
      //       router.push(ROUTES.HOME.link);
      //     } else {
      //       router.push(ROUTES.CREATE_FORM.link);
      //     }
      //   }
      // });
      return;
    }
  }, [router, open, userForm, posterForm, hasHydrated, isCreateFormPage, isCreateSubmitPage]);

  return <></>;
};
