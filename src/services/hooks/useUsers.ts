import { useQuery, UseQueryOptions, UseQueryResult } from "react-query"
import { api } from "../api"

type User = {
  id: string
  name: string
  email: string
  createdAt: string
}

type GetUsersResponse = {
  totalCount: number
  users: User[]
}

export async function getUsers(currentPage: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("users", {
    params: {
      currentPage,
    },
  })

  const totalCount = Number(headers["x-total-count"])

  const users = data.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    }
  })

  return {
    totalCount,
    users,
  }
}

export function useUsers(currentPage: number, options?: UseQueryOptions) {
  return useQuery(["users", currentPage], () => getUsers(currentPage), {
    staleTime: 1000 * 60 * 10,
    ...options,
  }) as UseQueryResult<GetUsersResponse, unknown>
}
