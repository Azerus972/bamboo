import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:19
* @route '/{current_team}/videos'
*/
export const index = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/{current_team}/videos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:19
* @route '/{current_team}/videos'
*/
index.url = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { current_team: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { current_team: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            current_team: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        current_team: typeof args.current_team === 'object'
        ? args.current_team.slug
        : args.current_team,
    }

    return index.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:19
* @route '/{current_team}/videos'
*/
index.get = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:19
* @route '/{current_team}/videos'
*/
index.head = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:19
* @route '/{current_team}/videos'
*/
const indexForm = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:19
* @route '/{current_team}/videos'
*/
indexForm.get = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\VideoController::index
* @see app/Http/Controllers/VideoController.php:19
* @route '/{current_team}/videos'
*/
indexForm.head = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:39
* @route '/{current_team}/videos'
*/
export const store = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/{current_team}/videos',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:39
* @route '/{current_team}/videos'
*/
store.url = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { current_team: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'slug' in args) {
        args = { current_team: args.slug }
    }

    if (Array.isArray(args)) {
        args = {
            current_team: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        current_team: typeof args.current_team === 'object'
        ? args.current_team.slug
        : args.current_team,
    }

    return store.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:39
* @route '/{current_team}/videos'
*/
store.post = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:39
* @route '/{current_team}/videos'
*/
const storeForm = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VideoController::store
* @see app/Http/Controllers/VideoController.php:39
* @route '/{current_team}/videos'
*/
storeForm.post = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\VideoController::update
* @see app/Http/Controllers/VideoController.php:50
* @route '/{current_team}/videos/{video}'
*/
export const update = (args: { current_team: string | { slug: string }, video: string | number } | [current_team: string | { slug: string }, video: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/{current_team}/videos/{video}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\VideoController::update
* @see app/Http/Controllers/VideoController.php:50
* @route '/{current_team}/videos/{video}'
*/
update.url = (args: { current_team: string | { slug: string }, video: string | number } | [current_team: string | { slug: string }, video: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            current_team: args[0],
            video: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        current_team: typeof args.current_team === 'object'
        ? args.current_team.slug
        : args.current_team,
        video: args.video,
    }

    return update.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::update
* @see app/Http/Controllers/VideoController.php:50
* @route '/{current_team}/videos/{video}'
*/
update.put = (args: { current_team: string | { slug: string }, video: string | number } | [current_team: string | { slug: string }, video: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\VideoController::update
* @see app/Http/Controllers/VideoController.php:50
* @route '/{current_team}/videos/{video}'
*/
const updateForm = (args: { current_team: string | { slug: string }, video: string | number } | [current_team: string | { slug: string }, video: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VideoController::update
* @see app/Http/Controllers/VideoController.php:50
* @route '/{current_team}/videos/{video}'
*/
updateForm.put = (args: { current_team: string | { slug: string }, video: string | number } | [current_team: string | { slug: string }, video: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:57
* @route '/{current_team}/videos/{video}'
*/
export const destroy = (args: { current_team: string | { slug: string }, video: string | number } | [current_team: string | { slug: string }, video: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/{current_team}/videos/{video}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:57
* @route '/{current_team}/videos/{video}'
*/
destroy.url = (args: { current_team: string | { slug: string }, video: string | number } | [current_team: string | { slug: string }, video: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            current_team: args[0],
            video: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        current_team: typeof args.current_team === 'object'
        ? args.current_team.slug
        : args.current_team,
        video: args.video,
    }

    return destroy.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace('{video}', parsedArgs.video.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:57
* @route '/{current_team}/videos/{video}'
*/
destroy.delete = (args: { current_team: string | { slug: string }, video: string | number } | [current_team: string | { slug: string }, video: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:57
* @route '/{current_team}/videos/{video}'
*/
const destroyForm = (args: { current_team: string | { slug: string }, video: string | number } | [current_team: string | { slug: string }, video: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\VideoController::destroy
* @see app/Http/Controllers/VideoController.php:57
* @route '/{current_team}/videos/{video}'
*/
destroyForm.delete = (args: { current_team: string | { slug: string }, video: string | number } | [current_team: string | { slug: string }, video: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const videos = {
    index: Object.assign(index, index),
    store: Object.assign(store, store),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default videos