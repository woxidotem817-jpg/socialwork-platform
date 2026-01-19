import React, { useEffect, useState } from 'react'

interface BackgroundWrapperProps {
  children: React.ReactNode
  backgroundType?: 'professional' | 'warm' | 'none'
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children, backgroundType = 'none' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'true')
    }

    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('darkMode')
      setIsDarkMode(currentTheme === 'true')
    }

    window.addEventListener('storage', handleThemeChange)
    return () => window.removeEventListener('storage', handleThemeChange)
  }, [])

  const getBackgroundStyle = () => {
    if (isDarkMode) {
      return {
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }
    }

    switch (backgroundType) {
      case 'professional':
        return {
          backgroundImage: 'url(/images/decorative/gradient-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }
      case 'warm':
        return {
          backgroundImage: 'url(/images/decorative/gradient-2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }
      default:
        return {}
    }
  }

  const containerStyle = {
    ...getBackgroundStyle(),
    minHeight: 'calc(100vh - 112px)',
    padding: '24px',
    borderRadius: '0',
    transition: 'all 0.3s ease',
  }

  const contentStyle = {
    background: isDarkMode ? 'rgba(22, 33, 62, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: isDarkMode ? '0 4px 16px rgba(0, 0, 0, 0.4)' : '0 4px 16px rgba(0, 0, 0, 0.1)',
    minHeight: '400px',
    animation: 'fadeIn 0.3s ease-in-out',
  }

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  )
}

export default BackgroundWrapper
