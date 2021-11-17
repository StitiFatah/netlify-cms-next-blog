import Link from "next/link";
import Image from "next/image";
import Date from "./dates";

interface TypeText {
  title: Element | string;
  body: string;
  stack: string[];
  link?: {
    href: string;
    name: string;
  };
  date: string;
  lang;
}

interface TypeBlogCard extends TypeText {
  image: string;
  className?: string;
}

function Text({ title, body, link, stack, date, lang }: TypeText) {
  return (
    <div className="flex flex-col justify-center h-full p-6 ">
      <div className="flex flex-col mb-6">
        {title}
        <div className="text-sm mb-4">
          <Date className={`text-gray-500 dark:text-white`} dateString={date} />
        </div>
        <p className="text-gray-600 dark:text-white ">{body}</p>
      </div>

      <div className="mb-4">
        <div className="mb-2 font-semibold text-gray-500 dark:text-white text-xs uppercase">
          {lang === "fr" && "Technologies utilisees"}
          {lang === "en" && "Used stack"}
          {":"}
        </div>
        <div className="flex  flex-wrap items-center ">
          {stack.map((elem, index) => (
            <div
              key={index}
              className="border shadow-md mx-2 px-2 py-1 rounded my-1 text-xs text-gray-500 dark:text-white "
            >
              {elem}
            </div>
          ))}
        </div>
      </div>
      {link && (
        <div className="flex flex-row justify-end">
          <Link href={link.href}>
            <a className="text-sm text-purple-500 dark:text-purple-200">
              {link.name}
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}

export default function BlogCard({
  image,
  title,
  body,
  link,
  stack,
  className,
  date,
  lang,
}: TypeBlogCard) {
  const text_props = { lang, title, body, link, stack, date };

  return (
    <div
      className={`flex flex-col lg:flex-row border hover:shadow-lg ${
        className && className
      } 
      }`}
    >
      <div className="hidden lg:w-2/5 lg:block" style={{ fontSize: 0 }}>
        <div
          className="photo h-full"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      <div className="lg:w-3/5 ">
        <Text {...text_props} />
      </div>
      <style>
        {`
        .photo{
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        }
            
                  `}
      </style>
    </div>
  );
}
