import { computed, Signal } from "@preact/signals-core";
import { Font } from "@pmndrs/uikit/internals";

export function computedGlyphGroupDependencies(
  fontSignal: Signal<Font[] | undefined>,
) {
  return computed(() => ({ font: fontSignal.value?.[0] }));
}
