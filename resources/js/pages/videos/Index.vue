<script setup lang="ts">
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import InputError from '@/components/InputError.vue';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Video = {
    id: number;
    title: string;
    hook: string | null;
    hashtags: string | null;
    status: string;
    scheduled_for: string | null;
    views: number;
    likes: number;
};

const props = defineProps<{
    videos: Video[];
    statuses: string[];
    isPro: boolean;
    freeLimit: number;
    stats: { total: number; posted: number; views: number; engagement: number };
}>();

defineOptions({
    layout: {
        breadcrumbs: [{ title: 'TikTok videos', href: '#' }],
    },
});

const page = usePage();
const base = computed(() => `/${page.props.currentTeam?.slug}`);

const form = useForm({
    title: '',
    hook: '',
    hashtags: '#fyp ',
    status: 'idea',
    scheduled_for: '',
});

// Quick local hook ideas, no external API.
const hookTemplates = [
    'POV: you finally tried {t}',
    'Nobody talks about this {t} hack',
    '3 mistakes everyone makes with {t}',
    'I tested {t} for 7 days, here is what happened',
    'Stop scrolling if you care about {t}',
];

function suggestHook() {
    const topic = form.title.trim() || 'this';
    const template =
        hookTemplates[Math.floor(Math.random() * hookTemplates.length)];
    form.hook = template.replace('{t}', topic.toLowerCase());
}

function submit() {
    form.post(`${base.value}/videos`, {
        preserveScroll: true,
        onSuccess: () => form.reset(),
    });
}

function setStatus(video: Video, status: string) {
    router.put(
        `${base.value}/videos/${video.id}`,
        { ...video, status },
        { preserveScroll: true },
    );
}

function remove(video: Video) {
    router.delete(`${base.value}/videos/${video.id}`, {
        preserveScroll: true,
    });
}

const limitReached = computed(
    () => !props.isPro && props.stats.total >= props.freeLimit,
);
</script>

<template>
    <Head title="TikTok videos" />

    <div class="flex flex-1 flex-col gap-6 p-4">
        <div class="grid gap-4 md:grid-cols-4">
            <div
                v-for="card in [
                    { label: 'Planned videos', value: stats.total },
                    { label: 'Posted', value: stats.posted },
                    { label: 'Total views', value: stats.views.toLocaleString() },
                    { label: 'Like rate', value: `${stats.engagement}%` },
                ]"
                :key="card.label"
                class="rounded-xl border p-4"
            >
                <div class="text-sm text-muted-foreground">{{ card.label }}</div>
                <div class="mt-1 text-2xl font-semibold">{{ card.value }}</div>
            </div>
        </div>

        <div
            class="flex items-center justify-between rounded-xl border p-4"
        >
            <div>
                <div class="font-medium">
                    Plan: <Badge>{{ isPro ? 'Pro' : 'Free' }}</Badge>
                </div>
                <div class="text-sm text-muted-foreground">
                    {{
                        isPro
                            ? 'Unlimited videos.'
                            : `${stats.total}/${freeLimit} videos on the free plan.`
                    }}
                </div>
            </div>
            <Button as-child :variant="isPro ? 'outline' : 'default'">
                <a
                    :href="`${base}/billing/${isPro ? 'portal' : 'checkout'}`"
                    >{{ isPro ? 'Manage billing' : 'Upgrade to Pro' }}</a
                >
            </Button>
        </div>

        <form
            class="grid gap-3 rounded-xl border p-4 md:grid-cols-2"
            @submit.prevent="submit"
        >
            <div class="grid gap-1">
                <Label for="title">Video idea</Label>
                <Input id="title" v-model="form.title" placeholder="Morning routine" />
                <InputError :message="form.errors.title" />
            </div>
            <div class="grid gap-1">
                <Label for="hook">Hook (first 3 seconds)</Label>
                <div class="flex gap-2">
                    <Input id="hook" v-model="form.hook" />
                    <Button type="button" variant="outline" @click="suggestHook"
                        >Suggest</Button
                    >
                </div>
            </div>
            <div class="grid gap-1">
                <Label for="hashtags">Hashtags</Label>
                <Input id="hashtags" v-model="form.hashtags" />
            </div>
            <div class="grid gap-1">
                <Label for="scheduled_for">Publish on</Label>
                <Input id="scheduled_for" v-model="form.scheduled_for" type="date" />
            </div>
            <div class="md:col-span-2">
                <Button :disabled="form.processing || limitReached"
                    >Add to plan</Button
                >
            </div>
        </form>

        <div class="overflow-x-auto rounded-xl border">
            <table class="w-full text-sm">
                <thead class="text-left text-muted-foreground">
                    <tr class="border-b">
                        <th class="p-3">Video</th>
                        <th class="p-3">Publish on</th>
                        <th class="p-3">Status</th>
                        <th class="p-3">Views / likes</th>
                        <th class="p-3"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="videos.length === 0">
                        <td colspan="5" class="p-6 text-center text-muted-foreground">
                            No videos planned yet.
                        </td>
                    </tr>
                    <tr v-for="video in videos" :key="video.id" class="border-b last:border-0">
                        <td class="p-3">
                            <div class="font-medium">{{ video.title }}</div>
                            <div class="text-muted-foreground">{{ video.hook }}</div>
                            <div class="text-xs text-pink-600">{{ video.hashtags }}</div>
                        </td>
                        <td class="p-3 whitespace-nowrap">{{ video.scheduled_for ?? '—' }}</td>
                        <td class="p-3">
                            <select
                                class="rounded-md border bg-background px-2 py-1"
                                :value="video.status"
                                @change="setStatus(video, ($event.target as HTMLSelectElement).value)"
                            >
                                <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
                            </select>
                        </td>
                        <td class="p-3 whitespace-nowrap">
                            {{ video.views.toLocaleString() }} / {{ video.likes.toLocaleString() }}
                        </td>
                        <td class="p-3 text-right">
                            <Button variant="ghost" size="sm" @click="remove(video)">Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
