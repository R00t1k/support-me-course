"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PersonStandingIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { PasswordInput } from "@/components/ui/password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z
  .object({
    email: z.string().email(),
    accountType: z.enum(["personal", "company"]),
    companyName: z.string().optional(),
    numberOfEmployees: z.coerce.number().optional(),
    acceptTerms: z.boolean({
      required_error: "You must accept the terms and conditions",
    }).refine((checked) => checked, "You must accept the terms and conditions"),
    dob: z.date().refine((date) => {
      const today = new Date();
      const eighteedYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return date <= eighteedYearsAgo;
    }, "You must be at least 18 years old"),
    password: z
      .string()
      .min(8, "Password must contain at least 8 characters")
      .refine((password) => {
        // must contain at least 1 special character and 1 uppercase character
        return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password);
      }, "Password must contain at least 1 special character and 1 uppercase letter"),
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "Passwords do not match",
      });
    }

    if (data.accountType === "company" && !data.companyName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["companyName"],
        message: "Company name is required",
      });
    }

    if (
      data.accountType === "company" &&
      (!data.numberOfEmployees || data.numberOfEmployees < 1)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["numberOfEmployees"],
        message: "Number of employees is required",
      });
    }
  });

export default function SignUpPage() {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      companyName: "",
      
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log("login validation passed",data);
    router.push("/dashboard");
  };

  const accountType = form.watch("accountType");

  return (
    <>
      <PersonStandingIcon size={50} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Sign up to your SupportMe account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@doe.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select an account type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {accountType === "company" && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numberOfEmployees"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Employees</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            placeholder="Employees"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => {
                  const dobFromDate = new Date();
                  dobFromDate.setFullYear(dobFromDate.getFullYear() - 120);
                  return (
                    <FormItem className="flex flex-col pt-2 ">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="normal-case flex justify-between pr-1"
                            >
                              {!!field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar
                            mode="single"
                            defaultMonth={field.value}
                            selected={field.value}
                            onSelect={field.onChange}
                            fixedWeeks
                            weekStartsOn={1}
                            startMonth={dobFromDate}
                            captionLayout="dropdown"
                            disabled={[
                              {
                                after: new Date(),
                                before: dobFromDate,
                              },
                            ]}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Accept Terms and Conditions</FormLabel>
                    </div>
                    <FormDescription>
                      By clicking sign up, you agree to our{" "}
                      <Link href="/terms" className="text-primary hover:underline">Terms and Conditions</Link> and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={Loading}>
              {Loading ? "Creating account..." : "Create account"}
                </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <small>Already have an account?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
