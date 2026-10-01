import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\BillingController::checkout
* @see app/Http/Controllers/BillingController.php:16
* @route '/{current_team}/billing/checkout'
*/
export const checkout = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(args, options),
    method: 'get',
})

checkout.definition = {
    methods: ["get","head"],
    url: '/{current_team}/billing/checkout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BillingController::checkout
* @see app/Http/Controllers/BillingController.php:16
* @route '/{current_team}/billing/checkout'
*/
checkout.url = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return checkout.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BillingController::checkout
* @see app/Http/Controllers/BillingController.php:16
* @route '/{current_team}/billing/checkout'
*/
checkout.get = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BillingController::checkout
* @see app/Http/Controllers/BillingController.php:16
* @route '/{current_team}/billing/checkout'
*/
checkout.head = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkout.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BillingController::checkout
* @see app/Http/Controllers/BillingController.php:16
* @route '/{current_team}/billing/checkout'
*/
const checkoutForm = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkout.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BillingController::checkout
* @see app/Http/Controllers/BillingController.php:16
* @route '/{current_team}/billing/checkout'
*/
checkoutForm.get = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkout.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BillingController::checkout
* @see app/Http/Controllers/BillingController.php:16
* @route '/{current_team}/billing/checkout'
*/
checkoutForm.head = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: checkout.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

checkout.form = checkoutForm

/**
* @see \App\Http\Controllers\BillingController::portal
* @see app/Http/Controllers/BillingController.php:38
* @route '/{current_team}/billing/portal'
*/
export const portal = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: portal.url(args, options),
    method: 'get',
})

portal.definition = {
    methods: ["get","head"],
    url: '/{current_team}/billing/portal',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BillingController::portal
* @see app/Http/Controllers/BillingController.php:38
* @route '/{current_team}/billing/portal'
*/
portal.url = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions) => {
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

    return portal.definition.url
            .replace('{current_team}', parsedArgs.current_team.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BillingController::portal
* @see app/Http/Controllers/BillingController.php:38
* @route '/{current_team}/billing/portal'
*/
portal.get = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: portal.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BillingController::portal
* @see app/Http/Controllers/BillingController.php:38
* @route '/{current_team}/billing/portal'
*/
portal.head = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: portal.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BillingController::portal
* @see app/Http/Controllers/BillingController.php:38
* @route '/{current_team}/billing/portal'
*/
const portalForm = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: portal.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BillingController::portal
* @see app/Http/Controllers/BillingController.php:38
* @route '/{current_team}/billing/portal'
*/
portalForm.get = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: portal.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BillingController::portal
* @see app/Http/Controllers/BillingController.php:38
* @route '/{current_team}/billing/portal'
*/
portalForm.head = (args: { current_team: string | { slug: string } } | [current_team: string | { slug: string } ] | string | { slug: string }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: portal.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

portal.form = portalForm

const billing = {
    checkout: Object.assign(checkout, checkout),
    portal: Object.assign(portal, portal),
}

export default billing