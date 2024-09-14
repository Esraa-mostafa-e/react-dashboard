import { Col } from 'antd'
import styled from 'styled-components'
import { theme } from '../../styles'

const CustomFilterWrapper = styled.div`
    display: flex;
    align-items: center;

    >div{
        border-right: 1px solid ${theme.colors.grayColor}
        
    }
`
const StyledFilterCol = styled(Col)`
    margin-bottom: 0
`

export { StyledFilterCol,  CustomFilterWrapper }