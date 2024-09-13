import { Table } from 'antd'
import styled from 'styled-components'
import { theme } from '../../styles'


const CustomTableWrapper = styled.div`
  position: relative;
  background-color: ${theme.colors.whiteColor};
  padding: 16px;
  border-radius: 6px;
`

const StyledTable = styled(Table)`
  margin-top: 10px;
  .ant-table {
    border: none;
    overflow: auto;
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
      padding: 12px 15px !important;
    }
  }
  .ant-table-tbody {
    tr {
      &:nth-of-type(odd) {
        &:hover td {
          background-color: ${theme.colors.whiteColor} !important;
        }
      }
      &:nth-of-type(even) {
        background-color: #00000005;
      }
      td {
        border: 0;
      }
    }
  }
  .ant-table-pagination {
    background-color: ${theme.colors.whiteColor} !important;
    margin-bottom: 0 !important;
    border-radius: 0px 0px 12px 12px;
  }
  .ant-select-selector {
    border-radius: 22px !important;
  }
`

export { StyledTable, CustomTableWrapper }
