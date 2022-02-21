import { Box, Stack, Text } from "@chakra-ui/react"
import { PaginateButton } from "./PaginationButton"

interface PaginationProps {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  currentPage = 1,
  onPageChange,
  registersPerPage = 10,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : []

  return (
    <Stack
      direction={["column", "row"]}
      spacing={6}
      mt={8}
      justifyContent='space-between'
      align='center'
    >
      <Box>
        <strong>0</strong> - <strong>{registersPerPage}</strong> de{" "}
        <strong>{totalCountOfRegisters}</strong>
      </Box>
      <Stack direction='row' spacing={2}>
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginateButton onPageChange={onPageChange} pageNumber={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color='gray.300' w={8} textAlign='center'>
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return (
              <PaginateButton
                onPageChange={onPageChange}
                key={page}
                pageNumber={page}
              />
            )
          })}

        <PaginateButton
          onPageChange={onPageChange}
          pageNumber={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginateButton
                onPageChange={onPageChange}
                key={page}
                pageNumber={page}
              />
            )
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color='gray.300' w={8} textAlign='center'>
                ...
              </Text>
            )}
            <PaginateButton onPageChange={onPageChange} pageNumber={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  )
}
