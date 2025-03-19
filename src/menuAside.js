import { mdiMonitor, mdiViewList, mdiTelevisionGuide, mdiServerNetwork } from '@mdi/js'

export default [
  {
    to: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    to: '/teams',
    icon: mdiViewList,
    label: 'Teams',
  },
  {
    to: '/projects',
    icon: mdiTelevisionGuide,
    label: 'Projects',
  },
  // TODO: Remove before main, release.
  {
    href: 'http://localhost:8080/swagger-ui/',
    label: 'Swagger-UI',
    icon: mdiServerNetwork,
    target: '_blank',
  },
]
