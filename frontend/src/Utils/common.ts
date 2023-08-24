import Mustache from 'mustache';
import { SizeBreakpoints } from '../Types';

export const LG_BREAKPOINT = 992;
export const MD_BREAKPOINT = 768;
export const SM_BREAKPOINT = 576;

export const SizeBreakpointValues: Record<SizeBreakpoints, number> = {
  xxs: 10,
  xs: 12,
  sm: 16,
  md: 24,
  lg: 36,
  xl: 52,
  xxl: 72,
  xxxl: 96
};

export const isNumeric = (value: any): boolean => !isNaN(value);
export const sizeBreakpointToValue = (size: SizeBreakpoints | number): number => {
  if (isNumeric(size)) {
    return Number.parseInt(size as string, 10);
  }

  return SizeBreakpointValues[size as SizeBreakpoints] ? SizeBreakpointValues[size as SizeBreakpoints] : SizeBreakpointValues.md;
};

export const generateRoutePath = (
  path: string,
  view?: Record<string, any>,
): string => `${view ? Mustache.render(path as string, view) : path}`;
