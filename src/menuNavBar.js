import { mdiViewDashboard, mdiAccount, mdiBellRing, mdiLogout, mdiThemeLightDark } from '@mdi/js'

export default [
  {
    label: 'Dashboard',
    icon: mdiViewDashboard,
    to: '/dashboard',
  },
  {
    label: 'Notifications',
    icon: mdiBellRing,
    to: '/notifications',
  },
  {
    isCurrentUser: true,
    icon: mdiAccount,
    label: 'User',
    menu: [
      {
        icon: mdiAccount,
        label: 'My Profile',
        to: '/profile',
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: 'Log Out',
        isLogout: true,
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
]
