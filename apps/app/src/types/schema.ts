/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Workout Tracker Index */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/seed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header: {
                    "x-api-key": string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Seeds the database */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message: string;
                        };
                    };
                };
                /** @description Not Found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/exercises": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: {
                    limit?: string;
                    offset?: string;
                };
                header: {
                    "x-api-key": string;
                    Cookie: string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description List of all exercises */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id: number;
                            name: string;
                            primaryMuscleGroups: string[];
                            secondaryMuscleGroups: string[];
                        }[];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/exercises/:id": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header: {
                    "x-api-key": string;
                    Cookie: string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Singular exercise */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id: number;
                            name: string;
                            primaryMuscleGroups: string[];
                            secondaryMuscleGroups: string[];
                        }[];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/muscle-groups": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header: {
                    "x-api-key": string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description List of all muscle groups */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id: number;
                            name: string;
                        }[];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/equipment": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header: {
                    "x-api-key": string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description List of all equipment */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id: number;
                            name: string;
                        }[];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/routines": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header: {
                    "x-api-key": string;
                    Cookie: string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description List of all routines by user */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id: number;
                            name: string;
                            description: string | null;
                            exercises: {
                                id: number;
                                name?: string;
                                sets?: {
                                    id: number;
                                    maxReps: number;
                                    minReps: number;
                                    setNumber: number;
                                    weight: number;
                                }[];
                            }[];
                        }[];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/routines/groups": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header: {
                    "x-api-key": string;
                    Cookie: string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description List of all routine groups by user */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id: number;
                            name: string;
                            routines: {
                                id: number;
                                name: string;
                                description: string | null;
                                exercises: {
                                    id: number;
                                    name?: string;
                                    sets?: {
                                        id: number;
                                        maxReps: number;
                                        minReps: number;
                                        setNumber: number;
                                        weight: number;
                                    }[];
                                }[];
                            }[];
                        }[];
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/routines/:id": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: {
            parameters: {
                query?: never;
                header: {
                    "x-api-key": string;
                    Cookie: string;
                };
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Singular routine */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id: number;
                            name: string;
                            description: string | null;
                            exercises: {
                                id: number;
                                name?: string;
                                sets?: {
                                    id: number;
                                    maxReps: number;
                                    minReps: number;
                                    setNumber: number;
                                    weight: number;
                                }[];
                            }[];
                        };
                    };
                };
                /** @description Routine not found */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message: string;
                        };
                    };
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/routines/create": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: {
            parameters: {
                query?: never;
                header: {
                    "x-api-key": string;
                    Cookie: string;
                };
                path?: never;
                cookie?: never;
            };
            /** @description The routine to create */
            requestBody: {
                content: {
                    "application/json": {
                        name: string;
                        description?: string | null;
                        exercises: {
                            exerciseId: number;
                            order: number;
                            sets: {
                                maxReps?: number;
                                minReps?: number;
                                setNumber?: number;
                                weight?: number;
                            }[];
                        }[];
                    };
                };
            };
            responses: {
                /** @description The created routine */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            id: number;
                            name: string;
                            description: string | null;
                            exercises: {
                                id: number;
                                name?: string;
                                sets?: {
                                    id: number;
                                    maxReps: number;
                                    minReps: number;
                                    setNumber: number;
                                    weight: number;
                                }[];
                            }[];
                        };
                    };
                };
                /** @description The validation error(s) */
                422: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            /** @example false */
                            success: boolean;
                            /** @example {
                             *       "issues": [
                             *         {
                             *           "code": "invalid_type",
                             *           "expected": "string",
                             *           "received": "undefined",
                             *           "path": [
                             *             "name"
                             *           ],
                             *           "message": "Required"
                             *         },
                             *         {
                             *           "code": "invalid_type",
                             *           "expected": "array",
                             *           "received": "undefined",
                             *           "path": [
                             *             "exercises"
                             *           ],
                             *           "message": "Required"
                             *         }
                             *       ],
                             *       "name": "ZodError"
                             *     } */
                            error: {
                                issues: {
                                    code: string;
                                    path: (string | number)[];
                                    message?: string;
                                }[];
                                name: string;
                            };
                        };
                    };
                };
                /** @description Unable to create new routine */
                501: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": {
                            message: string;
                        };
                    };
                };
            };
        };
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
