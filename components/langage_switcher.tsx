import Link from "next/link";
import styles from "../styles/lang_switch.module.css";

const fr_index = "/";
const en_index = "/en";

const french_flag = (is_actual) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="flag-icon-css-fr"
      viewBox="0 0 640 480"
      className={`h-7 w-7 ${!is_actual && "filter grayscale"} `}
    >
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#fff" d="M0 0h640v480H0z" />
        <path fill="#00267f" d="M0 0h213.3v480H0z" />
        <path fill="#f31830" d="M426.7 0H640v480H426.7z" />
      </g>
    </svg>
  );
};

const british_flag = (is_actual) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="flag-icon-css-gb"
      viewBox="0 0 640 480"
      className={`h-7 w-7 ${!is_actual && "filter grayscale"} `}
    >
      <path fill="#012169" d="M0 0h640v480H0z" />
      <path
        fill="#FFF"
        d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"
      />
      <path
        fill="#C8102E"
        d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"
      />
      <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z" />
      <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z" />
    </svg>
  );
};

const lang_object = {
  fr: { flag: french_flag, link: fr_index },
  en: { flag: british_flag, link: en_index },
};

const acronym_styling = (lang, actual_langage) => {
  if (actual_langage === lang) {
    return styles.active;
  }
};

const get_flag = (lang, actual_langage) => {
  if (actual_langage === lang) {
    return lang_object[actual_langage].flag(true);
  } else if (actual_langage !== lang) {
    return (
      <Link href={lang_object[lang].link}>
        <a> {lang_object[lang].flag(false)} </a>
      </Link>
    );
  }
};

export default function LangageSwitcher({ actual_langage }) {
  return (
    <div className="flex flex-row items-center">
      <div className="mx-1">{get_flag("fr", actual_langage)}</div>
      <div className="mx-1">{get_flag("en", actual_langage)}</div>
    </div>
  );
}
