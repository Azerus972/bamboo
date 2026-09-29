<script setup lang="ts">
import { Head } from '@inertiajs/vue3';

defineProps<{
    stats: { users: number; teams: number; videos: number };
    users: { id: number; name: string; email: string; is_admin: boolean; created_at: string }[];
}>();

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Admin', href: '/admin' }],
    },
});
</script>

<template>
    <Head title="Admin" />

    <div class="flex flex-1 flex-col gap-6 p-4">
        <div class="grid gap-4 md:grid-cols-3">
            <div v-for="(value, label) in stats" :key="label" class="rounded-xl border p-4">
                <div class="text-sm capitalize text-muted-foreground">{{ label }}</div>
                <div class="mt-1 text-2xl font-semibold">{{ value }}</div>
            </div>
        </div>

        <div class="overflow-x-auto rounded-xl border">
            <table class="w-full text-sm">
                <thead class="text-left text-muted-foreground">
                    <tr class="border-b">
                        <th class="p-3">Name</th>
                        <th class="p-3">Email</th>
                        <th class="p-3">Role</th>
                        <th class="p-3">Joined</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id" class="border-b last:border-0">
                        <td class="p-3">{{ user.name }}</td>
                        <td class="p-3">{{ user.email }}</td>
                        <td class="p-3">{{ user.is_admin ? 'Admin' : 'User' }}</td>
                        <td class="p-3">{{ user.created_at.slice(0, 10) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
