import { Avatar } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  objSize?: string
  iconSize?: number
}

export const DefaultAvator = ({ objSize = 'md', iconSize = 30 }: Props) => {
  return (
    <Avatar size={objSize} bg="emerald.300">
      <Ionicons name="person" size={iconSize} color="white" />
    </Avatar>
  )
}
