"use client";
import { createAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SyntheticEvent, useState } from "react";

export default function Home() {
  const [state, setState] = useState("ready");
  async function handleOnSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if (state == "pending") return;
    setState("pending");
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    await createAction(formData);
    console.log("hey");
  }
  return (
    <main className="flex flex-col h-screen gap-6 max-w-5xl mx-auto my-12">
      <div className="flex justify-between">
        <h1 className="text-5xl font-bold">Create a New Invoice</h1>
      </div>

      <form
        action={createAction}
        onSubmit={handleOnSubmit}
        className="grid gap-4 max-w-xs"
      >
        <div>
          <Label
            htmlFor="name"
            className="block font-semibold text-small mb-2 "
          >
            Billing Name
          </Label>
          <Input id="name" name="name" type="text" />
        </div>
        <div>
          <Label
            htmlFor="email"
            className="block font-semibold text-small mb-2 "
          >
            Email
          </Label>
          <Input id="email" name="email" type="email" />
        </div>
        <div>
          <Label
            htmlFor="value"
            className="block font-semibold text-small mb-2 "
          >
            Value
          </Label>
          <Input id="value" name="value" type="text" />
        </div>
        <div>
          <Label
            htmlFor="description"
            className="block font-semibold text-small mb-2 "
          >
            Description
          </Label>
          <Textarea id="description" name="description" />
        </div>
        <div>
          <Button className="w-full">Submit</Button>
        </div>
      </form>
    </main>
  );
}
