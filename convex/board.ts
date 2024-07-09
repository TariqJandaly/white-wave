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

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) => 
        q
          .eq('userId', identity.subject)
          .eq('boardId', args.id)
      )
      .unique()

    if(existingFavorite) {
      await ctx.db.delete(existingFavorite._id)
    }
    
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

export const favorite = mutation({
  args: {
    id: v.id('boards'),
    orgId: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if(!identity) {
      throw new Error("Unauthorized")
    }

    const board = await ctx.db.get(args.id)

    if(!board) {
      throw new Error("Board not found")
    }

    const userId = identity.subject

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) => 
        q
          .eq('userId', userId)
          .eq('boardId', board._id)
          .eq('orgId', args.orgId)
      )
      .unique()

    if(existingFavorite) {
      throw new Error("Board already favorited")
    }

    await ctx.db.insert('userFavorites', {
      userId,
      boardId: board._id,
      orgId: args.orgId
    })
    
    return board
  },
})

export const unfavorite = mutation({
  args: {
    id: v.id('boards')
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if(!identity) {
      throw new Error("Unauthorized")
    }

    const board = await ctx.db.get(args.id)

    if(!board) {
      throw new Error("Board not found")
    }

    const userId = identity.subject

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) => 
        q
          .eq('userId', userId)
          .eq('boardId', board._id)
          .eq('orgId', board.orgId)
      )
      .unique()

    if(!existingFavorite) {
      throw new Error("Favorited board is not found")
    }

    await ctx.db.delete(existingFavorite._id)
    
    return board
  },
})