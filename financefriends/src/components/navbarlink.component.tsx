import { Url } from "next/dist/shared/lib/router/router"
import Link from "next/link"

type Props = {
  href: Url,
  text: String
}

export default function Navbarlink({ href, text }: Props){
  return(
    <Link href={href} className="text-xl hover:underline  hover:bg-gradient-to-r from-[#2DE1FC] to-[#5887FF] hover:bg-clip-text hover:text-transparent decoration-white underline-offset-8 decoration-2">{text}</Link>
  )
}