import React from 'react'
import { Container } from '../components/Container'
import { Footer } from '../components/Footer'
import { Description, HomeSearch } from '../components/Home'

const Index = () => (
  <>
    <Container padding={'0'}>
      <HomeSearch />
      <Description />
      <Footer />
    </Container>
  </>
)

export default Index
