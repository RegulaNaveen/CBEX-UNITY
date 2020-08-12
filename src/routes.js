
const APP = '/app';
export const LOGIN = `${APP}/login`;
export const PROPOSALS = `${APP}/proposals/:id?`;

// TODO: Delete optional param type when table with proposals id is working
export const PROPOSAL = `${APP}/proposals/`;
export const DASHBOARD = `${APP}/dashboard`;
export const ROUTE_NOT_FOUND = '/*';