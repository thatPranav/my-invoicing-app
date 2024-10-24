"use server";
import { db } from "@/db";
import { Invoices, Status } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAction(formData: FormData) {
  const { userId } = await auth();
  const value = Math.floor(parseFloat(String(formData.get("value"))) * 100);
  const description = formData.get("description") as string;

  if (!userId) {
    return;
  }

  const results = await db
    .insert(Invoices)
    .values({
      value,
      description,
      userId,
      status: "open",
    })
    .returning({
      id: Invoices.id,
    });

  redirect(`/invoices/${results[0].id}`);
}

export async function updateStatusAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return;
  }

  const id = formData.get("id") as string;
  const status = formData.get("status") as Status;

  const results = await db
    .update(Invoices)
    .set({
      status,
    })
    .where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));

  revalidatePath(`/invoices/${id}`, "page");

}
