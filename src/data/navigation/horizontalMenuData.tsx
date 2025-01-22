// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'

const horizontalMenuData = (): HorizontalMenuDataType[] => [
  {
    label: 'Home',
    href: '/home',
    icon: 'ri-home-smile-line'
  },
  {
    label: 'Knowledge Base',
    href: '/knowledge-base',
    icon: 'bi:database-fill-gear'
  }
]

export default horizontalMenuData
