import type { FC } from 'react'

export const Footer: FC = () => {
  return (
    <footer style={{ background: 'lightsalmon', padding: 20 }}>
      Powered by123 Nextra {new Date().getFullYear()}
    </footer>
  )
}