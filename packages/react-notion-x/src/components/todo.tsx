import type * as types from 'notion-types'
import * as React from 'react'

import { cs } from '../utils'
import { Text } from './text'

interface TodoProps {
  block: types.Block
  blockId: string
  components: any
  recordMap: any
  children?: React.ReactNode
}

export function Todo({
  block,
  blockId,
  components,
  recordMap,
  children
}: TodoProps) {
  const initialChecked = block.properties?.checked?.[0]?.[0] === 'Yes'
  const [isChecked, setIsChecked] = React.useState(initialChecked)

  React.useEffect(() => {
    const currentChecked = block.properties?.checked?.[0]?.[0] === 'Yes'
    setIsChecked(currentChecked)
  }, [block.properties?.checked])

  const handleCheck = React.useCallback(
    (checked: boolean) => {
      setIsChecked(checked)

      if (block.properties?.onCheck) {
        block.properties.onCheck(checked)
      } else {
        const updatedBlock = { ...block }
        if (!updatedBlock.properties) {
          updatedBlock.properties = {
            title: [],
            checked: checked ? [['Yes']] : [['No']]
          }
        } else {
          updatedBlock.properties = {
            ...updatedBlock.properties,
            checked: checked ? [['Yes']] : [['No']]
          }
        }

        if (recordMap.block[block.id]?.value) {
          recordMap.block[block.id]!.value = updatedBlock
        }
      }
    },
    [block, recordMap]
  )

  return (
    <div className={cs('notion-to-do', blockId)}>
      <div className='notion-to-do-item'>
        <components.Checkbox
          blockId={blockId}
          isChecked={isChecked}
          onCheck={handleCheck}
        />

        <div
          className={cs(
            'notion-to-do-body',
            isChecked && `notion-to-do-checked`
          )}
        >
          <Text value={block.properties?.title} block={block} />
        </div>
      </div>

      <div className='notion-to-do-children'>{children}</div>
    </div>
  )
}
