import { prisma } from '@/lib/prisma'
import { Avatar, Heading, Text } from '@ignite-ui/react'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { ScheduleForm } from './ScheduleForm/index.page'
import * as Styled from './styles'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${user.name} | Ignite Call`} />
      <Styled.Container>
        <Styled.UserHeader>
          <Avatar src={user.avatarUrl} />
          <Heading>{user.name}</Heading>
          <Text>{user.bio}</Text>
        </Styled.UserHeader>
        <ScheduleForm />
      </Styled.Container>
    </>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
      revalidate: 60 * 60 * 24, // 1 day
    },
  }
}
