const main_color = "purple";

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    fontFamily: {
      "roboto-mono": ["Roboto Mono", "monospace"],
    },
    container: {
      center: true,
    },

    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.grey.800"),
            a: {
              color: theme(`colors.${main_color}.500`),
              "text-decoration": "underline",
              "&:hover, &.active": {
                "text-decoration": "none",
              },
            },
            strong: {
              color: theme(`colors.${main_color}.500`),
            },
            h1: {
              color: theme("colors.grey.800"),
              // "margin-top": "0",
            },
            h2: {
              color: theme("colors.grey.800"),
              // "margin-top": "0",
            },
            h3: {
              color: theme("colors.grey.800"),
              // "margin-top": "0",
            },
            h4: {
              color: theme("colors.grey.800"),
              // "margin-top": "0",
            },
            // code: {
            //   color: "white",
            //   "background-color": theme("colors.grey.800"),
            //   "&:before, &:after": {
            //     display: "none",
            //   },
            // },
            p: {
              color: theme("colors.grey.800"),
              // "margin-top": "0",
              // "margin-bottom": "1em",
            },
            // img: {
            //   "margin-top": "0",
            //   "margin-bottom": "0",
            //   "box-shadow": "0px 2px 4px -2px rgba(0, 0, 0, 30%)",
            // },
            "ul > li": {
              "&::before": {
                "background-color": theme("colors.grey.800"),
                "font-weight": "bold",
              },
            },
            "ol > li": {
              "&::before": {
                color: theme("colors.grey.800"),
                "font-weight": "bold",
              },
            },
          },
        },

        dark: {
          css: {
            color: "white",
            a: {
              color: theme(`colors.${main_color}.500`),
              "text-decoration": "underline",
              "&:hover, &.active": {
                "text-decoration": "none",
              },
            },
            strong: {
              color: theme(`colors.${main_color}.500`),
            },
            h1: {
              color: "white",
              // "margin-top": "0",
            },
            h2: {
              color: "white",
              // "margin-top": "0",
            },
            h3: {
              color: "white",
              // "margin-top": "0",
            },
            h4: {
              color: "white",
              // "margin-top": "0",
            },
            // code: {
            //   color: theme("colors.grey.800"),
            //   "background-color": "white",
            //   "&:before, &:after": {
            //     display: "none",
            //   },
            // },
            p: {
              color: "white",
              // "margin-top": "0",
              // "margin-bottom": "1em",
            },
            // img: {
            //   "margin-top": "0",
            //   "margin-bottom": "0",
            //   "box-shadow": "0px 2px 4px -2px rgba(255, 255, 255, 30%)",
            // },
            "ul > li": {
              "&::before": {
                "background-color": "white",
                "font-weight": "bold",
              },
            },
            "ol > li": {
              "&::before": {
                color: "white",
                "font-weight": "bold",
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
  variants: {
    extend: {
      // borderWidth: ["last"],
      // transitionDuration: ["hover"],
      // transitionProperty: ["hover"],
      // margin: ["last"],
      // padding: ["last", "hover"],
      // height: ["group-hover"],
      // margin: ["group-hover"],
      typography: ["dark"],
    },
  },
};
