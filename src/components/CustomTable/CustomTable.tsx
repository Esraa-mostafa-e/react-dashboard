import React, { useState } from 'react'
import { TablePaginationConfig } from 'antd'
import { CustomTableWrapper, StyledTable } from './CustomTable.styles'
import { ICustomTable } from './CustomTable.types'
import { useSearchParams } from 'react-router-dom'
// import { useAppSelector } from '@/store'

const CustomTable = <T extends {}>({ columns, dataSources, totalData}: ICustomTable<T>) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState<number>(searchParams.get('page') ? Number(searchParams.get('page')) : 1)
  const [pageSize, setPageSize] = useState<number>(searchParams.get('limit') ? Number(searchParams.get('limit')) : 5)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [forceRender, setForceRender] = useState<boolean>(false) // New state variable
  interface LastSearchParams {
    page: number
    limit: number
  }

  const rowkey = (
    record:
    | {
      id?: undefined
    }
    | { id: number }
  ) => record?.id ?? ''

  const tablePagination = {
    total: totalData,
    showSizeChanger: true,
    pageSize,
    current: currentPage
  }

  const handlePagination = (pagination: TablePaginationConfig) => {
    const page = pagination.current ?? 1
    const limit = pagination.pageSize ?? 5

    setCurrentPage(page)
    setPageSize(limit)
    const paramsObject = Object.fromEntries(searchParams.entries())
    setSearchParams({
      ...paramsObject,
      page: page.toString(),
      limit: limit.toString()
    })
    window.scrollTo(0, 0)
  }
  
  return (
    <CustomTableWrapper>
      <StyledTable
        key={forceRender ? 'forceRenderKey' : 'normalKey'}
        columns={columns}
        dataSource={dataSources}
        pagination={tablePagination}
        onChange={(pagination: TablePaginationConfig) => handlePagination(pagination)}
      />
    </CustomTableWrapper>
  )
}

export default CustomTable
