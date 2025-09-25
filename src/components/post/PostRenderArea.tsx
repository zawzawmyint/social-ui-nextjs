"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PostFormValues } from "@/utils/validation-types/validation-types";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
import { Image, Video } from "lucide-react";

const PostRenderArea = ({ form }: { form: UseFormReturn<PostFormValues> }) => {
  return (
    <div className="space-y-3">
      {/* title  */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder={"Name"}
                {...field}
                className="w-full"
                hidden
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* content  */}
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder={"What is happening in your world?"}
                {...field}
                rows={5}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="space-y-4 mt-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" disabled={true}>
            <Image /> Photo
          </Button>
          <Button variant="outline" disabled={true}>
            <Video /> Video
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostRenderArea;
