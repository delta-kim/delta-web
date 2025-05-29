import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ params }) => {
  return {
    lang: params.lang || "en",
    stuff: {
      disableScroll: true,
    },
  };
};
