import { ActionPoint, Effect, defineExtension, definePlugin, extensionNamespace, provideAction } from "kb-ext-sdk";
import { z } from "zod";
export const declaration = defineExtension({ name: "aurora", label: "Aurora sample" });
export default definePlugin({
  name: declaration.name,
  namespace: extensionNamespace(declaration.name),
  apply: (ctx) => ctx.contribute(ActionPoint, provideAction({
    id: "palette", title: "An aurora palette", description: "Synthetic second extension for marketplace acceptance",
    mode: { kind: "read" }, inputSchema: z.object({}), outputSchema: z.array(z.string()),
    effect: () => Effect.succeed(["#86efac", "#67e8f9", "#c4b5fd"]),
  })),
});
