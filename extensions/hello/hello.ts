import {ActionPoint,Effect,defineExtension,definePlugin,extensionNamespace,provideAction} from "kb-ext-sdk";
import {z} from "zod";
export const declaration=defineExtension({name:"hello",label:"Hello sample",seed:at=>[{id:"hello.sample",text:"Synthetic sample node",props:{},children:[],createdAt:at,updatedAt:at}]});
export default definePlugin({name:declaration.name,namespace:extensionNamespace(declaration.name),apply:ctx=>Effect.all([
 ctx.contribute(ActionPoint,provideAction({id:"greet",title:"Say hello",description:"Synthetic acceptance greeting",mode:{kind:"read"},inputSchema:z.object({name:z.string()}),outputSchema:z.string(),effect:({name})=>Effect.succeed("hello, "+name)})),
 ctx.contribute(ActionPoint,provideAction({id:"revision",title:"Sample revision",description:"Synthetic acceptance revision",mode:{kind:"read"},inputSchema:z.object({}),outputSchema:z.number(),effect:()=>Effect.succeed(1)})),
],{discard:true})});
