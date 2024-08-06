import { effect, signal, Signal } from "@preact/signals-core";
import {
  computedInheritableProperty,
  FontFamilyUrls,
  FontWeight,
  Initializers,
  MergedProperties,
  readReactive,
} from "@pmndrs/uikit";
import { Font, FontFamilies } from "@pmndrs/uikit/internals";
import { Texture, TextureLoader, WebGLRenderer } from "three";
import { FontInfo } from "../../lib/types.ts";
import { createRenderer } from "../../lib";

const fontCache = new Map<string, Set<(font: Font) => void> | Font>();

const textureLoader = new TextureLoader();

export function loadCachedFont(
  url: string,
  renderer: WebGLRenderer,
  onLoad: (font: Font) => void,
): void {
  let entry = fontCache.get(url);
  if (entry instanceof Set) {
    entry.add(onLoad);
    return;
  }
  if (entry != null) {
    onLoad(entry);
    return;
  }

  const set = new Set<(font: Font) => void>();
  set.add(onLoad);
  fontCache.set(url, set);

  loadFont(url, renderer)
    .then((font) => {
      for (const fn of set) {
        fn(font);
      }
      fontCache.set(url, font);
    })
    .catch(console.error);
}

async function loadFont(url: string, renderer: WebGLRenderer): Promise<Font> {
  const info: FontInfo = await (await fetch(url)).json();

  if (info.pages.length !== 1) {
    throw new Error("only supporting exactly 1 page");
  }

  const page = await textureLoader.loadAsync(
    new URL(info.pages[0], new URL(url, window.location.href)).href,
  );

  page.anisotropy = renderer.capabilities.getMaxAnisotropy();
  page.flipY = false;

  return new Font(info, page);
}

const defaultFontFamilyUrls: FontFamilies = {
  inter: {
    light: "https://pmndrs.github.io/uikit/fonts/inter-light.json",
    normal: "https://pmndrs.github.io/uikit/fonts/inter-normal.json",
    medium: "https://pmndrs.github.io/uikit/fonts/inter-medium.json",
    "semi-bold": "https://pmndrs.github.io/uikit/fonts/inter-semi-bold.json",
    bold: "https://pmndrs.github.io/uikit/fonts/inter-bold.json",
  },
};

const fontWeightNames = {
  thin: 100,
  "extra-light": 200,
  light: 300,
  normal: 400,
  medium: 500,
  "semi-bold": 600,
  bold: 700,
  "extra-bold": 800,
  black: 900,
  "extra-black": 950,
};

export function computedFont(
  properties: Signal<MergedProperties>,
  fontFamiliesSignal: Signal<FontFamilies | undefined> | undefined,
  renderer: WebGLRenderer,
  initializers: Initializers,
): Signal<Font | undefined> {
  const result = signal<Font | undefined>(undefined);
  const fontFamily = computedInheritableProperty<string | undefined>(
    properties,
    "fontFamily",
    undefined,
  );
  const fontWeight = computedInheritableProperty<FontWeight>(
    properties,
    "fontWeight",
    "normal",
  );
  initializers.push(() =>
    effect(() => {
      const fontFamilies = fontFamiliesSignal?.value ?? defaultFontFamilyUrls;
      let resolvedFontFamily = fontFamily.value;
      if (resolvedFontFamily == null) {
        resolvedFontFamily = Object.keys(fontFamilies)[0];
      }
      const url = getMatchingFontUrl(
        fontFamilies[resolvedFontFamily],
        typeof fontWeight.value === "string"
          ? fontWeightNames[fontWeight.value]
          : fontWeight.value,
      );
      let canceled = false;
      loadCachedFont(url, renderer, (font) =>
        canceled ? undefined : (result.value = font),
      );
      return () => (canceled = true);
    }),
  );
  return result;
}

export type FontMap = Record<string, Font>;

const { renderer, imageData, fontData } = await createRenderer();
await renderer.setFonts(["/Inter-Bold.otf"]);

export function computedFonts(
  textSignal: Signal<string | Signal<string> | Array<string | Signal<string>>>,
  properties: Signal<MergedProperties>,
  fontFamiliesSignal: Signal<FontFamilies | undefined> | undefined,
  initializers: Initializers,
): Signal<FontMap | undefined> {
  const result = signal<FontMap | undefined>(undefined);
  const fontFamily = computedInheritableProperty<string | undefined>(
    properties,
    "fontFamily",
    undefined,
  );
  const fontWeight = computedInheritableProperty<FontWeight>(
    properties,
    "fontWeight",
    "normal",
  );
  initializers.push(() =>
    effect(() => {
      const fontFamilies = fontFamiliesSignal?.value ?? defaultFontFamilyUrls;
      let resolvedFontFamily = fontFamily.value;
      if (resolvedFontFamily == null) {
        resolvedFontFamily = Object.keys(fontFamilies)[0];
      }
      const url = getMatchingFontUrl(
        fontFamilies[resolvedFontFamily],
        typeof fontWeight.value === "string"
          ? fontWeightNames[fontWeight.value]
          : fontWeight.value,
      );
      const text = textSignal.value;
      let canceled = false;
      const textStr = Array.isArray(text)
        ? text.map((t) => readReactive(t)).join("")
        : readReactive(text);

      renderer.addGlyphs(textStr + "?");

      // loadCachedFont(url, renderer, (font) =>
      //   canceled ? undefined : (result.value = [font]),
      // );
      if (!fontData.value) {
        return;
      }
      const font = new Font(fontData.value, new Texture(imageData.value));

      result.value = {
        H: font,
        e: font,
        l: font,
        o: font,
        "?": font,
      };
      return () => (canceled = true);
    }),
  );
  return result;
}

function getMatchingFontUrl(
  fontFamily: FontFamilyUrls,
  weight: number,
): string {
  let distance = Infinity;
  let result: string | undefined;
  for (const fontWeight in fontFamily) {
    const d = Math.abs(weight - getWeightNumber(fontWeight));
    if (d === 0) {
      return fontFamily[fontWeight]!;
    }
    if (d < distance) {
      distance = d;
      result = fontFamily[fontWeight];
    }
  }
  if (result == null) {
    throw new Error(`font family has no entries ${fontFamily}`);
  }
  return result;
}

function getWeightNumber(value: string): number {
  if (value in fontWeightNames) {
    return fontWeightNames[value as keyof typeof fontWeightNames];
  }
  const number = parseFloat(value);
  if (isNaN(number)) {
    throw new Error(`invalid font weight "${value}"`);
  }
  return number;
}
