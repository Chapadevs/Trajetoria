import React from 'react'
import DiscIcon from '../assets/icons-tests/disc-icon.svg'
import RiasecIcon from '../assets/icons-tests/riasec-icon.svg'
import ArchetypesIcon from '../assets/icons-tests/arquetipos-icon-35.svg'
import MultipleIntelligencesIcon from '../assets/icons-tests/muitiplas-inteligencias-icon.svg'
import AnamneseIcon from '../assets/icons-tests/amanamnese-icon.svg'

/**
 * Mapeia testId para a URL do ícone SVG correspondente
 */
export const getTestIcon = (testId) => {
  const iconMap = {
    'anamnese-inicial': AnamneseIcon,
    'disc-insight': DiscIcon,
    'multiple-intelligences': MultipleIntelligencesIcon,
    'riasec': RiasecIcon,
    'archetypes': ArchetypesIcon
  }

  return iconMap[testId] || null
}

/**
 * Componente que renderiza o ícone SVG do teste
 */
export const TestIcon = ({ testId, className = '', style = {} }) => {
  const iconUrl = getTestIcon(testId)
  
  if (!iconUrl) {
    return null
  }

  return (
    <img 
      src={iconUrl} 
      alt={`${testId} icon`}
      className={className}
      style={style}
    />
  )
}

/**
 * Componente inline SVG para uso em badges pequenos
 */
export const TestIconInline = ({ testId, className = '', size = 24 }) => {
  const iconUrl = getTestIcon(testId)
  
  if (!iconUrl) {
    return null
  }

  return (
    <img 
      src={iconUrl} 
      alt={`${testId} icon`}
      className={className}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`, 
        objectFit: 'contain',
        objectPosition: 'center center',
        display: 'block',
        margin: '0',
        padding: '0'
      }}
    />
  )
}

