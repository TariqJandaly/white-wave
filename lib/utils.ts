import { Camera } from "@/types/canvas"
import { type ClassValue, clsx } from "clsx"
import React from "react"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomColorFromId(id: number): string {
  const COLORS = ["#FF0000", "#FF8000", "#FFD700", "#80FF00", "#00FF80", "#0000FF", "#8000FF", "#800080"]

  return COLORS[id % COLORS.length]
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y
  }
}