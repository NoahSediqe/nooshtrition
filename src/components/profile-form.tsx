"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  age: z.coerce.number().min(18, {
    message: "You must be at least 18 years old.",
  }),
  weight: z.coerce.number().min(30, {
    message: "Weight must be at least 75 lbs.",
  }),
  height: z.object({
    feet: z.coerce.number().min(4, { message: "Height must be at least 4 feet." }).max(8, { message: "Height must be less than 8 feet." }),
    inches: z.coerce.number().min(0, { message: "Inches must be between 0 and 11." }).max(11, { message: "Inches must be between 0 and 11." }),
  }),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very-active"]),
  calorieGoal: z.coerce.number().min(1200, {
    message: "Calorie goal must be at least 1200.",
  }),
})

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 18,
      weight: 70,
      height: { feet: 5, inches: 7 },
      activityLevel: "moderate",
      calorieGoal: 2000,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter your age"
                  value={field.value}
                  onChange={e => {
                    const value = e.target.value === '' ? '' : +e.target.value;
                    field.onChange(value);
                  }} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (lbs)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter weight in pounds"
                  value={field.value}
                  onChange={e => {
                    const value = e.target.value === '' ? '' : +e.target.value;
                    field.onChange(value);
                  }} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (ft/in)</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Feet"
                    value={field.value.feet}
                    onChange={e => {
                      const value = e.target.value === '' ? '' : +e.target.value;
                      field.onChange({ ...field.value, feet: value });
                    }}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Inches"
                    value={field.value.inches}
                    onChange={e => {
                      const value = e.target.value === '' ? '' : +e.target.value;
                      field.onChange({ ...field.value, inches: value });
                    }}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activityLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your activity level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="very-active">Very Active</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="calorieGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Daily Calorie Goal</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Enter daily calorie target"
                  value={field.value}
                  onChange={e => {
                    const value = e.target.value === '' ? '' : +e.target.value;
                    field.onChange(value);
                  }} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Profile</Button>
      </form>
    </Form>
  )
}

