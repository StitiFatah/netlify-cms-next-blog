import Image from "next/image";
export default function ProfilePicture() {
  return (
    <Image
      src="/images/arch_logo.png"
      height={144}
      width={144}
      alt="ProfilePicture"
    />
  );
}
