import { parseISO, format } from "date-fns";

export default function Date({
  dateString,
  className,
  style,
}: {
  dateString: string;
  className?: string;
  style?: any;
}) {
  const date = parseISO(dateString);
  return (
    <time className={className} style={style} dateTime={dateString}>
      {format(date, "LLLL d, yyyy")}
    </time>
  );
}
