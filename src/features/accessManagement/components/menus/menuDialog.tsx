import { zodResolver } from '@hookform/resolvers/zod';
import { FolderTree, Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { MenuGroup, MenuItem } from '.';
import { IconPicker } from './iconPicker';

const menuGroupSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  order: z.number().optional(),
  isActive: z.boolean().default(true)
});

const menuItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  icon: z.string().optional(),
  path: z.string().min(1, 'Path is required'),
  permissions: z.string().optional(),
  parentId: z.string().nullable(),
  order: z.number().optional(),
  isActive: z.boolean().default(true)
});

const formSchema = z.object({
  groups: z.array(menuGroupSchema),
  items: z.array(menuItemSchema)
});

interface MenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { groups: MenuGroup[]; items: MenuItem[] }) => void;
  existingGroups: MenuGroup[];
}

export function MenuDialog({ open, onOpenChange, onSubmit, existingGroups }: MenuDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groups: [],
      items: []
    }
  });

  const {
    fields: groupFields,
    append: appendGroup,
    remove: removeGroup
  } = useFieldArray({
    control: form.control,
    name: 'groups'
  });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem
  } = useFieldArray({
    control: form.control,
    name: 'items'
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Menu Configuration</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Menu Groups Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Menu Groups</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendGroup({
                      title: '',
                      description: '',
                      isActive: true
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Group
                </Button>
              </div>

              {groupFields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`groups.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Group Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`groups.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`groups.${index}.isActive`}
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Active</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="button" variant="outline" className="w-full" onClick={() => removeGroup(index)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Group
                  </Button>
                </div>
              ))}
            </div>

            {/* Menu Items Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Menu Items</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendItem({
                      name: '',
                      path: '',
                      isActive: true,
                      parentId: null
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>

              {itemFields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                  <FormField
                    control={form.control}
                    name={`items.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.path`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Path</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.parentId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Group</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select parent group" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {existingGroups.map((group) => (
                              <SelectItem key={group.id} value={group.id}>
                                {group.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.permissions`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Permissions</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., admin:read" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.isActive`}
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Active</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="button" variant="outline" className="w-full" onClick={() => removeItem(index)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Item
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#4A36EC] text-white">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
