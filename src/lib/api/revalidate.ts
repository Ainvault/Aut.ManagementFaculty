// Phase H — after any admin write, invalidate the whole site so public pages
// (many are statically generated) regenerate with the fresh content on next
// request (ISR-on-demand). Called from admin write Route Handlers.

import { revalidatePath } from "next/cache";

export function revalidateSite(): void {
  revalidatePath("/", "layout");
}