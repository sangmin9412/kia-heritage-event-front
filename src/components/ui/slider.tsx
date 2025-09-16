"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  labelValue,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  labelValue?: number[];
}) {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max]
  );

  const _labelValue = React.useMemo(() => {
    if (Array.isArray(labelValue) && labelValue.length === 3) {
      // labelValue가 3개 요소를 가진 배열인 경우 [minLabel, middleLabel, maxLabel] 형태로 선형 보간
      const [minLabel, middleLabel, maxLabel] = labelValue;
      const middleValue = (min + max) / 2; // 실제 슬라이더의 중간값

      return _values.map(currentValue => {
        let interpolatedLabel;

        if (currentValue <= middleValue) {
          // min ~ middle 구간: minLabel에서 middleLabel로 선형 보간
          const ratio = (currentValue - min) / (middleValue - min);
          interpolatedLabel = minLabel + (middleLabel - minLabel) * ratio;
        } else {
          // middle ~ max 구간: middleLabel에서 maxLabel로 선형 보간
          const ratio = (currentValue - middleValue) / (max - middleValue);
          interpolatedLabel = middleLabel + (maxLabel - middleLabel) * ratio;
        }

        // 정수로 반올림하여 반환
        return Math.round(interpolatedLabel);
      });
    }

    if (Array.isArray(labelValue)) {
      return labelValue;
    }

    return [min, max];
  }, [labelValue, min, max, _values]);

  return (
    <SliderPrimitive.Root
      data-slot='slider'
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot='slider-track'
        className={cn(
          "bg-border relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-[4px] data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot='slider-range'
          className={cn("bg-border absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full")}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot='slider-thumb'
          key={index}
          className='border-[4px] border-primary bg-primary ring-ring/50 block size-[2.4rem] shrink-0 rounded-full shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50'
        >
          <em className='absolute top-full left-0 right-0 translate-y-[.4rem] [font-style:normal] desktop:text-[1.4rem] desktop:leading-[2.2rem] text-[1.2rem] leading-[2rem] text-center'>
            {labelValue ? _labelValue : _values}
          </em>
        </SliderPrimitive.Thumb>
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
