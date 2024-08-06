import { computed, Signal } from "@preact/signals-core";
import {
  computedInheritableProperty,
  CustomLayouting,
  MergedProperties,
  readReactive,
} from "@pmndrs/uikit";
import { MeasureMode } from "yoga-layout/load";
import { FontMap } from "./font.ts";
import { GlyphInfo } from "../../lib/types.ts";

export type GlyphLayoutProperties = {
  text: string;
  fonts: FontMap;
  letterSpacing: number;
  lineHeight: number | `${number}%`;
  fontSize: number;
  wordBreak: keyof typeof wrappers;
};
export type GlyphLayoutLine = {
  charIndexOffset: number;
  charLength: number;
  nonWhitespaceCharLength: number;
  nonWhitespaceWidth: number;
  whitespacesBetween: number;
};
export type GlyphLayout = {
  lines: Array<GlyphLayoutLine>;
  availableWidth: number;
  availableHeight: number;
} & GlyphLayoutProperties;

export function computedCustomLayouting(
  properties: Signal<MergedProperties>,
  fontsSignal: Signal<FontMap | undefined>,
  textSignal: Signal<string | Signal<string> | Array<Signal<string> | string>>,
  propertiesRef: { current: GlyphLayoutProperties | undefined },
  defaultWordBreak: GlyphLayoutProperties["wordBreak"],
) {
  const fontSize = computedInheritableProperty(properties, "fontSize", 16);
  const letterSpacing = computedInheritableProperty(
    properties,
    "letterSpacing",
    0,
  );
  const lineHeight = computedInheritableProperty<number | `${number}%`>(
    properties,
    "lineHeight",
    "120%",
  );
  const wordBreak = computedInheritableProperty(
    properties,
    "wordBreak",
    defaultWordBreak,
  );
  return computed<CustomLayouting | undefined>(() => {
    const fonts = fontsSignal.value;
    if (fonts == null) {
      return undefined;
    }
    const text = textSignal.value;
    const layoutProperties: GlyphLayoutProperties = {
      fonts,
      fontSize: fontSize.value,
      letterSpacing: letterSpacing.value,
      lineHeight: lineHeight.value,
      text: Array.isArray(text)
        ? text.map((t) => readReactive(t)).join("")
        : readReactive(text),
      wordBreak: wordBreak.value,
    };
    propertiesRef.current = layoutProperties;

    const { width: minWidth } = measureGlyphLayout(layoutProperties, 0);
    const { height: minHeight } = measureGlyphLayout(
      layoutProperties,
      undefined,
    );

    return {
      minHeight,
      minWidth,
      measure: (width, widthMode) =>
        measureGlyphLayout(
          layoutProperties,
          widthMode === MeasureMode.Undefined ? undefined : width,
        ),
    };
  });
}
export type GlyphWrapper = (
  layout: GlyphLayoutProperties,
  availableWidth: number | undefined,
  textStartIndex: number,
  target: GlyphLayoutLine,
) => void;

function skipWhitespace(text: string, index: number): number {
  const textLength = text.length;
  while (text[index] === " " && index < textLength) {
    index++;
  }
  return index;
}

function getOffsetToNextGlyph(
  fontSize: number,
  glyphInfo: GlyphInfo,
  letterSpacing: number,
): number {
  return glyphInfo.xadvance * fontSize + letterSpacing;
}

export const NowrapWrapper: GlyphWrapper = (
  { text, fontSize, fonts, letterSpacing },
  _,
  charIndex,
  target,
) => {
  charIndex = skipWhitespace(text, charIndex);
  const firstIndex = charIndex;
  target.charIndexOffset = firstIndex;
  target.nonWhitespaceCharLength = 0;
  target.charLength = 0;
  target.nonWhitespaceWidth = 0;
  target.whitespacesBetween = 0;

  let position = 0;
  let whitespaces = 0;

  for (; charIndex < text.length; charIndex++) {
    const char = text[charIndex];
    if (char === "\n") {
      target.charLength = charIndex - firstIndex + 1;
      return;
    }
    const font = fonts[char];
    position += getOffsetToNextGlyph(
      fontSize,
      font.getGlyphInfo(char),
      letterSpacing,
    );

    if (char === " ") {
      whitespaces += 1;
      continue;
    }

    target.nonWhitespaceWidth = position;
    target.whitespacesBetween = whitespaces;
    target.nonWhitespaceCharLength = charIndex - firstIndex + 1;
  }

  //not "+1" because we break when we want to remove the last one
  target.charLength = charIndex - firstIndex;
};

const wrappers = {
  // TODO: Implement all wrappers
  "keep-all": NowrapWrapper, // NowrapWrapper,
  "break-all": NowrapWrapper, // BreakallWrapper,
  "break-word": NowrapWrapper, // WordWrapper,
};

const lineHelper = {} as GlyphLayoutLine;

export const percentageRegex = /(-?\d+(?:\.\d+)?)%/;

function lineHeightToAbsolute(
  lineHeight: GlyphLayoutProperties["lineHeight"],
  fontSize: number,
): number {
  if (typeof lineHeight === "number") {
    return lineHeight;
  }
  const result = percentageRegex.exec(lineHeight);
  if (result == null) {
    throw new Error(`invalid line height "${lineHeight}"`);
  }
  return (fontSize * parseFloat(result[1])) / 100;
}

export function getGlyphLayoutHeight(
  linesAmount: number,
  { lineHeight, fontSize }: GlyphLayoutProperties,
): number {
  return Math.max(linesAmount, 1) * lineHeightToAbsolute(lineHeight, fontSize);
}

export function measureGlyphLayout(
  properties: GlyphLayoutProperties,
  availableWidth?: number,
): {
  width: number;
  height: number;
} {
  const wrapper = wrappers[properties.wordBreak];
  const text = properties.text;

  let width = 0;
  let lines = 0;
  let charIndex = 0;

  while (charIndex < text.length) {
    wrapper(properties, availableWidth, charIndex, lineHelper);
    width = Math.max(width, lineHelper.nonWhitespaceWidth);
    lines += 1;
    charIndex = lineHelper.charLength + lineHelper.charIndexOffset;
  }

  if (text[text.length - 1] === "\n") {
    lines += 1;
  }

  return { width, height: getGlyphLayoutHeight(lines, properties) };
}

export function buildGlyphLayout(
  properties: GlyphLayoutProperties,
  availableWidth: number,
  availableHeight: number,
): GlyphLayout {
  const lines: Array<GlyphLayoutLine> = [];
  const wrapper = wrappers[properties.wordBreak];
  const text = properties.text;

  let charIndex = 0;

  while (charIndex < text.length) {
    const line = {} as GlyphLayoutLine;
    wrapper(properties, availableWidth, charIndex, line);
    lines.push(line);
    charIndex = line.charLength + line.charIndexOffset;
  }

  if (lines.length === 0 || text[text.length - 1] === "\n") {
    lines.push({
      charLength: 0,
      nonWhitespaceWidth: 0,
      whitespacesBetween: 0,
      charIndexOffset: text.length,
      nonWhitespaceCharLength: 0,
    });
  }

  return {
    lines,
    availableHeight,
    availableWidth,
    ...properties,
  };
}
