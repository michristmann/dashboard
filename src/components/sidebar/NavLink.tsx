import {
  Link as ChackraLink,
  Icon,
  Text,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react"
import { ElementType } from "react"
import { ActiveLink } from "../ActiveLink"

interface NavLinkProps extends ChakraLinkProps {
  icon: ElementType
  label: string
  href: string
}

export function NavLink({ icon, href, label, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChackraLink display='flex' alignItems='center' {...rest}>
        <Icon as={icon} fontSize={20} />
        <Text ml={4} fontWeight='medium'>
          {label}
        </Text>
      </ChackraLink>
    </ActiveLink>
  )
}
