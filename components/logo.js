import Link from 'next/link'
import { Text, Box, useColorModeValue } from '@chakra-ui/react'
import FootprintIcon from './icons/footprint'
import styled from '@emotion/styled'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  > svg {
    transition: 200ms ease;
  }

  &:hover > svg {
    transform: rotate(20deg);
  }
`

const Badge = styled(Box)`
  display: inline-block;
  background-color: ${props => props.bgColor}; // Use background color from props
  color: ${props => props.color}; // Use text color from props
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 0.75rem;
  margin-left: 5px;
`

const Logo = () => {
  const badgeBgColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.2)');
  const badgeColor = useColorModeValue('black', 'white');

  return (
    <Link href="/" scroll={false}>
      <LogoBox>
        <FootprintIcon />
        <Text
          color={useColorModeValue('gray.800', 'whiteAlpha.900')}
          fontFamily='"M PLUS Rounded 1c", sans-serif'
          fontWeight="bold"
          ml={3}
        >
          Centi Crescendo
          <Badge bgColor={badgeBgColor} color={badgeColor}>
            v4.1.2
          </Badge>
        </Text>
      </LogoBox>
    </Link>
  )
}

export default Logo
