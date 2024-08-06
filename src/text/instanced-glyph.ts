import { computed, Signal } from "@preact/signals-core";
import { FontMap } from "./font.ts";

export function computedGlyphGroupDependencies(
  fontSignal: Signal<FontMap | undefined>,
) {
  return computed(() => ({ font: fontSignal.value }));
}
