import { Heading, Text } from '@ignite-ui/react'
import * as Styled from './styles'

import previewImage from '../../assets/app-preview.png'
import Image from 'next/image'
import { ClaimUserNameForm } from './components/ClaimUsernameForm'
import { NextSeo } from 'next-seo'

export default function Home() {
  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Ignite Call"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />
      <Styled.Container>
        <Styled.Hero>
          <Heading size="4xl">Agendamento descomplicado</Heading>
          <Text size="xl">
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre
          </Text>

          <ClaimUserNameForm />
        </Styled.Hero>

        <Styled.Preview>
          <Image
            src={previewImage}
            height={400}
            quality={100}
            priority
            alt="Calendário simbolizando aplicação em funcionamento"
          />
        </Styled.Preview>
      </Styled.Container>
    </>
  )
}
