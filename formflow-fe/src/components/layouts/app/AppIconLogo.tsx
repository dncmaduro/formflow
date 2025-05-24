import { Box, Image } from '@mantine/core'
import logo from '../../../public/iconformflow.png'

interface Props {
  h?: number
  w?: number
}

export const AppIconLogo = ({ h, w }: Props) => {
  return (
    <Box w={w ?? 40} h={h ?? 40}>
      <Image src={logo} fit="contain" />
    </Box>
  )
}
