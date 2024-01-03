import { Locales, type Region } from '@/constants/constants'
import { useLocale } from '@/hooks/useLocale'
import { Language } from '@mui/icons-material'
import { Box, IconButton, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'

type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][]

export default function LanguageMenu() {
  const { locale, setLocale } = useLocale()

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)

  const handleIconClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleItemClick = (key: Region) => {
    setLocale(key)
    setAnchorEl(null)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const languageEntries = Object.entries(Locales) as Entries<typeof Locales>

  return (
    <Box position="relative">
      <IconButton color="primary" onClick={handleIconClick}>
        <Language />
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        disableScrollLock={true}
      >
        {languageEntries.map(([key, language]) => (
          <MenuItem
            key={key}
            selected={key === locale.meta.code}
            onClick={() => handleItemClick(key)}
            sx={(theme) => ({
              display: 'flex',
              gap: 1,
              '.code': {
                color: theme.palette.text.secondary,
                textTransform: 'uppercase',
              },
              '.name': {
                color: theme.palette.text.primary,
              },
              '&.Mui-selected': {
                pointerEvents: 'none',
                '.code, .name': {
                  color: theme.palette.primary.main,
                },
              },
            })}
            disableRipple
          >
            <Box className="code" component="span">
              {language.meta.code}
            </Box>
            <Box className="name" component="span">
              {language.meta.name}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
