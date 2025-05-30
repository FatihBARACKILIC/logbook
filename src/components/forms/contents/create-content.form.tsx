import { toast } from "@/components/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import { actions, isInputError } from "astro:actions";
import { useState, type FormEvent } from "react";

type Props = {
  listId: string;
  className?: string;
};

export function CreateContentForm({ listId, className }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("listUUID", listId);
    const { data, error } = await actions.contents.createContent(formData);
    setIsSubmitting(false);
    if (error && isInputError(error)) {
      return toast.error(error.fields.title?.join(", ") ?? "Something went wrong");
    } else if (error) {
      return toast.error(error.message);
    }
    toast.info("Content created successfully");
  };

  return (
    <div className={cn(className)}>
      <h2 className="mb-4">Create Content</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Input type="text" name="title" placeholder="Title" />
        {/* TODO: Import other fields */}
        <Button className="w-full" disabled={isSubmitting} type="submit">
          Create
        </Button>
      </form>
    </div>
  );
}
