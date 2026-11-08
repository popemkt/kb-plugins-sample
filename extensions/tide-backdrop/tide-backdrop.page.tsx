import { Effect, declarationPlugin, definePlugin } from "kb-ext-sdk";
import { BACKDROP_BUDGETS, BackdropPoint, provideBackdrop } from "kb-ext-sdk/page";
import { Tide, declaration } from "./tide-backdrop/key.ts";
import { TideScene } from "./tide-backdrop/scene.tsx";

/** The page half: Tide's scene, contributed under the key its declaration names. */
export default definePlugin({
  name: declaration.name,
  apply: (ctx) =>
    Effect.all(
      [
        ctx.plugin(declarationPlugin(declaration)),
        ctx.contribute(
          BackdropPoint,
          provideBackdrop(Tide, {
            presentation: {
              space: 56,
              height: 200,
              span: { reach: "region" },
              offset: 0,
              directions: ["down", "up"],
              opacity: { subtle: 0.3, soft: 0.55, vivid: 0.85 },
            },
            budget: BACKDROP_BUDGETS.canvas,
            interactions: [
              { cue: "pointer", does: "the bands lean toward the cursor" },
              { cue: "editing", does: "the tide runs faster while you type" },
            ],
            Component: TideScene,
          }),
        ),
      ],
      { discard: true },
    ),
});
