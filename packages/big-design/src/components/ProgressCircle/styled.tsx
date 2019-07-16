import styled, { css, keyframes } from 'styled-components';

import { defaultTheme, remCalc } from '../../theme';
import { ErrorIcon, SuccessIcon } from '../Icons';

import { CIRCLE_CIRCUMFERENCES, CIRCLE_DIMENSIONS, CIRCLE_STROKE_WIDTHS } from './constants';
import { ProgressCircleProps } from './ProgressCircle';

export const StyledProgressCircle = styled.svg<ProgressCircleProps>`
  ${({ size }) => css`
    height: ${remCalc(getDimensions(size))};
    width: ${remCalc(getDimensions(size))};
  `}
`;

export const StyledCircle = styled.circle.attrs(({ size }: ProgressCircleProps) => ({
  cx: remCalc(getDimensions(size) / 2),
  cy: remCalc(getDimensions(size) / 2),
  r: remCalc(getDimensions(size) / 2 - getStrokeWidth(size) / 2),
}))<ProgressCircleProps>`
  fill: transparent;
  stroke-width: ${({ size }) => remCalc(getStrokeWidth(size))};
  stroke: ${({ theme }) => theme.colors.secondary20};
`;

export const StyledCircleFiller = styled(StyledCircle)<ProgressCircleProps>`
  stroke-dasharray: ${({ size }) => getStrokeDashArray(size)};
  stroke: ${({ theme }) => theme.colors.primary};
  transform-origin: 50% 50%;

  ${({ percent, size }) =>
    typeof percent === 'number'
      ? css`
          stroke-dashoffset: ${typeof percent === 'number' ? `${fillLength(percent, size)}` : 0};
          transform: rotate(-90deg);
          transition: stroke-dashoffset 0.35s;
        `
      : css`
          animation: ${spin(size)} 1s ease infinite;
          stroke-dashoffset: ${fillLength(0, size)};
          transform: rotate(-90deg);
          transition: stroke-dashoffset 0.35s;
        `};
`;

export const StyledText = styled.text.attrs(() => ({
  dominantBaseline: 'central',
  textAnchor: 'middle',
  x: '50%',
  y: '50%',
}))<ProgressCircleProps>`
  font-size: ${({ size, theme }) =>
    size === 'large' ? theme.typography.fontSize.large : theme.typography.fontSize.small};
  font-weight: ${({ size, theme }) =>
    size === 'large' ? theme.typography.fontWeight.semiBold : theme.typography.fontWeight.regular};
`;

export const StyledErrorIcon = styled(ErrorIcon)`
  color: ${({ theme }) => theme.colors.danger};
`;

export const StyledSuccessIcon = styled(SuccessIcon)`
  color: ${({ theme }) => theme.colors.success};
`;

const spin = (size: ProgressCircleProps['size']) => keyframes`
  0% {
    stroke-dashoffset: ${fillLength(0, size) * -1};
    transform: rotate(-90deg);
  }
  50% {
    stroke-dashoffset: ${fillLength(37.5, size) * -1};
  }
  100% {
    stroke-dashoffset: ${fillLength(0, size) * -1};
    transform: rotate(270deg);
  }
`;

function getDimensions(size: ProgressCircleProps['size'] = 'medium') {
  return CIRCLE_DIMENSIONS[size];
}

function getStrokeDashArray(size: ProgressCircleProps['size'] = 'medium') {
  return `${CIRCLE_CIRCUMFERENCES[size]} ${CIRCLE_CIRCUMFERENCES[size]}`;
}

function getStrokeWidth(size: ProgressCircleProps['size'] = 'medium') {
  return CIRCLE_STROKE_WIDTHS[size];
}

function fillLength(percent: number, size: ProgressCircleProps['size'] = 'medium') {
  return CIRCLE_CIRCUMFERENCES[size] - (percent / 100) * CIRCLE_CIRCUMFERENCES[size];
}

StyledCircle.defaultProps = { theme: defaultTheme };
StyledCircleFiller.defaultProps = { theme: defaultTheme };
StyledErrorIcon.defaultProps = { theme: defaultTheme };
StyledSuccessIcon.defaultProps = { theme: defaultTheme };
StyledText.defaultProps = { theme: defaultTheme };