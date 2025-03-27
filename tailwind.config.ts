import { join } from "path";
import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import { skeleton } from "@skeletonlabs/tw-plugin";

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    join(
      require.resolve("@skeletonlabs/skeleton"),
      "../**/*.{html,js,svelte,ts}"
    ),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2C5F34",
        secondary: "#e69138",
      },
    },
  },
  plugins: [
    forms,
    skeleton({
      themes: {
        preset: [
          {
            name: "skeleton",
            enhancements: true,
          },
        ],
      },
    }),
  ],
} satisfies Config;
