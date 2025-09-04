import { sendGAEvent } from "@next/third-parties/google";

/* eslint-disable @next/next/no-img-element */
export enum Event {
  BTN_CLCK_LEARN_MORE = "KIA_KOR_BRAND_BTN-CLCK_LEARN-MORE-HERITAGE2025",
  BTN_CLCK_REGISTER = "KIA_KOR_BRAND_BTN-CLCK_REGISTER-HERITAGE2025",
  BTN_CLCK_SUBMIT = "KIA_KOR_BRAND_BTN-CLCK_SUBMIT-HERITAGE2025",
  BTN_CLICK_CREATE = "KIA_KOR_BRAND_BTN-CLICK_CREATE-HERITAGE2025",
  PAGEVIEW_20S_VISIT = "KIA_KOR_BRAND_PAGEVIEW_20S-VISIT-HERITAGE2025",
  PAGEVIEW_CREATE = "KIA_KOR_BRAND_PAGEVIEW_CREATE-HERITAGE2025",
  PAGEVIEW_VISIT = "KIA_KOR_BRAND_PAGEVIEW_VISIT-HERITAGE2025"
}

export const ANALYTICS_HANDLER = {
  [Event.BTN_CLCK_LEARN_MORE]: {
    event: () => {
      sendGAEvent("conversion", {
        allow_custom_scripts: true,
        send_to: "DC-10576537/conveo0/kia_k006+standard"
      });
    },
    noscript: () => (
      <>
        <noscript>
          <img
            src='https://ad.doubleclick.net/ddm/activity/src=10576537;type=conveo0;cat=kia_k006;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?'
            width='1'
            height='1'
            alt=''
          />
        </noscript>
      </>
    )
  },
  [Event.BTN_CLCK_REGISTER]: {
    event: () => {
      sendGAEvent("conversion", {
        allow_custom_scripts: true,
        send_to: "DC-10576537/conveo0/kia_k007+standard"
      });
    },
    noscript: () => (
      <>
        <noscript>
          <img
            src='https://ad.doubleclick.net/ddm/activity/src=10576537;type=conveo0;cat=kia_k007;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?'
            width='1'
            height='1'
            alt=''
          />
        </noscript>
      </>
    )
  },
  [Event.BTN_CLCK_SUBMIT]: {
    event: () => {
      sendGAEvent("conversion", {
        allow_custom_scripts: true,
        send_to: "DC-10576537/conveo0/kia_k008+standard"
      });
    },
    noscript: () => (
      <>
        <noscript>
          <img
            src='https://ad.doubleclick.net/ddm/activity/src=10576537;type=conveo0;cat=kia_k008;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?'
            width='1'
            height='1'
            alt=''
          />
        </noscript>
      </>
    )
  },
  [Event.BTN_CLICK_CREATE]: {
    event: () => {
      sendGAEvent("conversion", {
        allow_custom_scripts: true,
        send_to: "DC-10576537/conveo0/kia_k009+standard"
      });
    },
    noscript: () => (
      <>
        <noscript>
          <img
            src='https://ad.doubleclick.net/ddm/activity/src=10576537;type=conveo0;cat=kia_k009;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?'
            width='1'
            height='1'
            alt=''
          />
        </noscript>
      </>
    )
  },
  [Event.PAGEVIEW_20S_VISIT]: {
    event: () => {
      sendGAEvent("conversion", {
        allow_custom_scripts: true,
        send_to: "DC-10576537/pagev0/kia_k001+standard"
      });
    },
    noscript: () => (
      <>
        <noscript>
          <img
            src='https://ad.doubleclick.net/ddm/activity/src=10576537;type=pagev0;cat=kia_k001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?'
            width='1'
            height='1'
            alt=''
          />
        </noscript>
      </>
    )
  },
  [Event.PAGEVIEW_CREATE]: {
    event: () => {
      sendGAEvent("conversion", {
        allow_custom_scripts: true,
        send_to: "DC-10576537/pagev0/kia_k002+standard"
      });
    },
    noscript: () => (
      <>
        <noscript>
          <img
            src='https://ad.doubleclick.net/ddm/activity/src=10576537;type=pagev0;cat=kia_k002;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?'
            width='1'
            height='1'
            alt=''
          />
        </noscript>
      </>
    )
  },
  [Event.PAGEVIEW_VISIT]: {
    event: () => {
      sendGAEvent("conversion", {
        allow_custom_scripts: true,
        send_to: "DC-10576537/pagev0/kia_k000+standard"
      });
    },
    noscript: () => (
      <>
        <noscript>
          <img
            src='https://ad.doubleclick.net/ddm/activity/src=10576537;type=pagev0;cat=kia_k000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755};ord=1?'
            width='1'
            height='1'
            alt=''
          />
        </noscript>
      </>
    )
  }
};
