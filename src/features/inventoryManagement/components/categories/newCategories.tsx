import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { useCategories } from '../../api/queries/categoryQueries';
import { CreateCategoryDTO } from '../../types';

const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  parent_ID: z.string().optional()
});

const formSchema = z.object({
  categories: z.array(categorySchema).min(1, 'Add at least one category')
});

type FormValues = z.infer<typeof formSchema>;

interface NewCategoriesProps {
  onSubmit: (categories: CreateCategoryDTO[]) => void;
  loading?: boolean;
}

const NewCategories = ({ onSubmit, loading = false }: NewCategoriesProps) => {
  const { data: categoriesData } = useCategories();
  const categories = useMemo(() => {
    return categoriesData?.data || [];
  }, [categoriesData?.data]);

  const availableCategories = useMemo(() => {
    return categories.map((c) => ({
      id: c.Category_ID,
      name: c.name
    }));
  }, [categories]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categories: [{ name: '', parent_ID: '' }]
    }
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: 'categories'
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values.categories);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start">
              <div className="flex-1 space-y-4">
                <FormField
                  control={form.control}
                  name={`categories.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter category name"
                          className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`categories.${index}.parent_ID`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Parent Category</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={(value) => field.onChange(value)} disabled={loading}>
                          <SelectTrigger className="border-gray-200 focus:border-[#4A36EC] focus:ring-[#4A36EC]">
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
              {fields.length > 1 && (
                <Button type="button" variant="outline" size="icon" className="mt-6 hover:bg-gray-100" onClick={() => remove(index)}>
                  <Trash2 className="w-4 h-4 text-gray-600" />
                </Button>
              )}
            </div>
          ))}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              className="hover:bg-gray-100"
              onClick={() => append({ name: '', parent_ID: '' })}
              disabled={loading}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another
            </Button>
            <Button type="submit" className="bg-[#4A36EC] hover:bg-[#5B4AEE] text-white" disabled={loading}>
              {loading ? 'Saving...' : 'Save Categories'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NewCategories;
