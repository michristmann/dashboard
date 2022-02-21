import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import { ApexOptions } from "apexcharts"

import { Header } from "../components/header"
import { Sidebar } from "../components/sidebar"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2022-01-03T20:10:00.00Z",
      "2022-01-04T20:10:00.00Z",
      "2022-01-05T20:10:00.00Z",
      "2022-01-06T20:10:00.00Z",
      "2022-01-07T20:10:00.00Z",
      "2022-01-08T20:10:00.00Z",
      "2022-01-09T20:10:00.00Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.4,
    },
  },
}
const series = [{ name: "series1", data: [31, 120, 10, 28, 51, 18, 109] }]

export default function Dashboard() {
  return (
    <Flex direction='column' h='100vh'>
      <Header />
      <Flex w='100%' my={6} maxW='1480px' mx='auto' px={6}>
        <Sidebar />

        <SimpleGrid flex='1' gap={4} minChildWidth='320px' align='flex-start'>
          <Box p={[6, 8]} bg='gray.800' borderRadius={8} pb={4}>
            <Text fontSize='large' mb={4}>
              Inscritos da semana
            </Text>
            <Chart type='area' height={160} options={options} series={series} />
          </Box>
          <Box p={8} bg='gray.800' borderRadius={8} pb={4}>
            <Text fontSize='large' mb={4}>
              Taxa de abertura
            </Text>
            <Chart type='area' height={160} options={options} series={series} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
