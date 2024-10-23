import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  const invoiceId = parseInt(params.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  const [invoice] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  if (!invoice) {
    notFound();
  }

  const currentStatus = invoice.status;
  return (
    <main className="w-screen h-screen">
      <Container>
        <div className="flex justify-between mb-8">
          <h1 className="flex items-center gap-4 text-3xl font-semibold">
            Invoices {invoiceId}
            <Badge
              className={cn(
                "rounded-full",
                "rounded-full capitalize",
                currentStatus === "open" && "bg-blue-500",
                currentStatus === "paid" && "bg-green-600",
                currentStatus === "void" && "bg-zinc-700",
                currentStatus === "uncollectible" && "bg-red-600"
              )}
            >
              {invoice.status}
            </Badge>
          </h1>
          <p></p>
        </div>

        <p className="text-3xl mb-3">${(invoice.value / 100).toFixed(2)}</p>

        <p className="text-lg mb-8">{invoice.description}</p>

        <h2 className="font-bold text-lg mb-4">Billing Details</h2>

        <ul className="grid gap-2">
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{invoice.id}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>
            <span>{new Date(invoice.createTs).toLocaleDateString()}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            {/* <span>{invoice.customer.name}</span> */}
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            {/* <span>{invoice.customer.email}</span> */}
          </li>
        </ul>
      </Container>
    </main>
  );
}
