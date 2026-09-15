export const appRoutes = {
    home: '/',
    login: '/login',
    register: '/register',
    profile: '/profile',
    favorites: '/favorites',
    createRoute: '/routes/create',

    routeDetails: '/routes/$routeId',
    editRoute: '/routes/$routeId/edit',
    editRouteStops: '/routes/$routeId/edit/stops',
} as const;