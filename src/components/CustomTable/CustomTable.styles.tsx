import { Table } from 'antd'
import styled from 'styled-components'
import { theme } from '../../styles'


const CustomTableWrapper = styled.div`
  position: relative;
  background-color: ${theme.colors.whiteColor};
  th{
    border: 1px solid ${theme.colors.grayColor}
  }
`

const StyledTable = styled(Table)`
  margin-top: 10px;
  .ant-table {
    border: none;
    border-radius: 0px;
  }
  .ant-table-cell {
    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    max-width: 200px;
  }
  .ant-table-thead {
    th {
      background: ${theme.colors.primary} !important;
      color: ${theme.colors.darkColor} !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      padding: 12px 15px !important;
      border-radius: 0 !important;
    }
  }
  tr {
    font-size: 14px !important;
    font-weight: 400 !important;
    color: ${theme.colors.darkColor} !important;
    td {
      padding: 10px 15px !important;
    }
  }
  .ant-table-tbody {
    tr {
        &:hover td {
          background-color: ${theme.colors.grayColor} !important;
        }

      td {
        border: 1px solid ${theme.colors.grayColor} !important;
      }
    }
  }
  .ant-table-pagination {
    display: flex;
    justify-content: center;
    background-color: ${theme.colors.whiteColor} !important;
    margin: 30px 0 !important;
    border-radius: 0px;
  }
  .ant-pagination-item-active {
    border: none;
    margin-top: -5px;
    a{
      color: black;
    }
  }
`

const FilterWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`
export { StyledTable, CustomTableWrapper, FilterWrapper }