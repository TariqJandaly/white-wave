import { v } from 'convex/values'

import { mutation } from "./_generated/server";



export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
    color: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if(!identity) {
      throw new Error("Unauthorized")
    }

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      color: args.color
    })

    return board
  }
})

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if(!identity) {
      throw new Error("Unauthorized")
    }

    // TODO: Remove fav as well

    await ctx.db.delete(args.id)

  }
})

export const update = mutation({
  args: { id: v.id("boards"), title: v.string(), color: v.string() },
  handler: async (ctx, args) => {

    const title = args.title.trim()
    const color = args.color.trim()

    if(!title) {
      throw new Error("Title is required")
    }

    if(!color) {
      throw new Error("Color is required")
    }

    const identity = await ctx.auth.getUserIdentity()

    if(!identity) {
      throw new Error("Unauthorized")
    }

    const board = await ctx.db.patch(args.id, {
      title: args.title,
      color: args.color
    })

    return board

  }
})