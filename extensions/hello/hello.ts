import { ActionPoint, Effect, defineExtension, definePlugin, extensionNamespace, provideAction } from "kb-ext-sdk";
import { z } from "zod";
export const declaration = defineExtension({ name: "hello", label: "Hello sample" });
export default definePlugin({
  name: declaration.name,
  namespace: extensionNamespace(declaration.name),
  apply: (ctx) => ctx.contribute(ActionPoint, provideAction({
    id: "greet", title: "Say hello", description: "Synthetic install acceptance action",
    mode: { kind: "read" }, inputSchema: z.object({ name: z.string() }), outputSchema: z.string(),
    effect: ({ name }: { name: string }) => Effect.succeed(`hello from the reviewed line diff, ${name}`),
  })),
});
