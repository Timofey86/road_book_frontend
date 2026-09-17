export const appRoutes = {
    home: '/',
    login: '/login',
    register: '/register',
    profile: '/profile',
    editProfile: '/profile/edit',
    favorites: '/favorites',
    myRoutes: '/my-routes',
    createRoute: '/routes/create',

    routeDetails: '/routes/$routeId',
    editRoute: '/routes/$routeId/edit',
    editRouteStops: '/routes/$routeId/edit/stops',

    publicProfile: '/users/$userId',
} as const;