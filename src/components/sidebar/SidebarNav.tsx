import { Stack } from "@chakra-ui/react"
import {
  RiDashboardLine,
  RiContactsLine,
  RiInputMethodLine,
  RiGitMergeLine,
} from "react-icons/ri"

import { NavLink } from "./NavLink"
import { NavSection } from "./NavSection"

export function SidebarNav() {
  return (
    <Stack spacing={12} align='flex-start'>
      <NavSection title='GERAL'>
        <NavLink href='/dashboard' icon={RiDashboardLine} label='Dashboard' />
        <NavLink href='/users' icon={RiContactsLine} label='Usuários' />
      </NavSection>
      <NavSection title='AUTOMAÇÃO'>
        <NavLink href='forms' icon={RiInputMethodLine} label='Formulários' />
        <NavLink href='automation' icon={RiGitMergeLine} label='Automação' />
      </NavSection>
    </Stack>
  )
}
