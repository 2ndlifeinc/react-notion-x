import type * as React from 'react'

import CheckIcon from '../icons/check'

export function Checkbox({
  isChecked,
  onCheck
}: {
  isChecked: boolean
  blockId?: string
  onCheck?: (checked: boolean) => void
}) {
  let content = null

  if (isChecked) {
    content = (
      <div className='notion-property-checkbox-checked'>
        <CheckIcon />
      </div>
    )
  } else {
    content = <div className='notion-property-checkbox-unchecked' />
  }

  const handleClick = () => {
    if (onCheck) onCheck(!isChecked)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onCheck && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault()
      onCheck(!isChecked)
    }
  }

  return (
    <span
      className='notion-property notion-property-checkbox'
      tabIndex={0}
      role='checkbox'
      aria-checked={isChecked}
      aria-label='Toggle checkbox'
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ cursor: onCheck ? 'pointer' : undefined }}
    >
      {content}
    </span>
  )
}
