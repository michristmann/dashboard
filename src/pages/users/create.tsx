import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react"
import Link from "next/link"
import { yupResolver } from "@hookform/resolvers/yup"
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"
import { useMutation } from "react-query"

import { Input } from "../../components/form/Input"
import { Header } from "../../components/header"
import { Sidebar } from "../../components/sidebar"
import { api } from "../../services/api"
import { queryClient } from "../../services/queryClient"
import { useRouter } from "next/router"

type CreateUserFormData = {
  name: string
  email: string
  password: string
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome de usuário obrigatório"),
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("Deve ser um e-mail válido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Deve conter pelo menos 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "Ambas senhas precisam ser iguais"),
})

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      })

      return response.data.user
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users")
      },
    }
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(createUserFormSchema),
  })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await createUser.mutateAsync(values)

    router.push("/users")
  }

  return (
    <Box>
      <Header />
      <Flex w='100%' my={6} maxW='1480px' mx='auto' px={6}>
        <Sidebar />
        <Box
          as='form'
          flex='1'
          borderRadius={8}
          bg='gray.800'
          p={[6, 8]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size='lg' fontWeight='normal'>
            Criar usuário
          </Heading>
          <Divider my={6} borderColor='gray.700' />
          <VStack spacing={[6, 8]}>
            <SimpleGrid minChildWidth='240px' spacing={[6, 8]} w='100%'>
              <Input
                name='name'
                label='Nome completo'
                error={errors.name}
                {...register("name")}
              />
              <Input
                name='email'
                label='E-mail'
                error={errors.email}
                {...register("email")}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth='240px' spacing={[6, 8]} w='100%'>
              <Input
                name='password'
                type='password'
                label='Senha'
                error={errors.password}
                {...register("password")}
              />
              <Input
                name='password_confirmation'
                type='password'
                label='Confirmar senha'
                error={errors.password_confirmation}
                {...register("password_confirmation")}
              />
            </SimpleGrid>
          </VStack>
          <Flex mt={8} justifyContent={["center", "flex-end"]}>
            <HStack spacing={4}>
              <Link href='/users' passHref>
                <Button as='a' colorScheme='whiteAlpha'>
                  Cancelar
                </Button>
              </Link>
              <Button type='submit' isLoading={isSubmitting} colorScheme='pink'>
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}