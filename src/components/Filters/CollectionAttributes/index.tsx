import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  chakra,
  Container,
  Flex,
} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useCollection } from '../../../context'
import { Attributes } from './Attributes'

const CollectionAttributesContainer = chakra(Container, {
  baseStyle: {
    padding: 0,
    borderTop: '1px solid #E1E2E8',
    paddingTop: '32px',
  },
})

export const CollectionAttributes = () => {
  const {
    state: { collection },
  } = useCollection()
  const [indexes, setIndexes] = useState([])

  const accordionChange = useCallback((values) => {
    setIndexes(values)
  }, [])

  return (
    <CollectionAttributesContainer>
      <Accordion allowMultiple onChange={accordionChange}>
        {collection.attributes.map((item, index) => {
          return (
            <AccordionItem border={'none'} key={item.attributes_name}>
              <h2>
                <AccordionButton padding="16px 0" _hover={{ background: 'transparent' }}>
                  <Flex
                    flex="1"
                    textAlign="left"
                    justifyContent={'space-between'}
                    fontSize={'md'}
                    marginBottom={'8px'}
                    fontWeight={600}
                    color="#333"
                    lineHeight={'24px'}
                  >
                    {item.attributes_name}
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h2>

              {indexes.includes(index) && (
                <AccordionPanel padding="0">
                  <Attributes data={item.attributes_values} attributesName={item.attributes_name} />
                </AccordionPanel>
              )}
            </AccordionItem>
          )
        })}
      </Accordion>
    </CollectionAttributesContainer>
  )
}
