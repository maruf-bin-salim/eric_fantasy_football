import React from "react";
import Image from "next/image";
import Link from "next/link";


interface LogoProps {
  className: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={`${className} transition-all`}>
      <Image
        className={`invert dark:invert-0 transition-all`}
        src="/logo.png"
        width={135}
        height={63}
        alt="OnceFantasy Logo"
        style={{ height: "63", width: "135" }}
        priority
      />
    </Link>
  );
};

export default Logo;
