/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/patients/route";
exports.ids = ["app/api/patients/route"];
exports.modules = {

/***/ "(rsc)/./app/api/patients/route.ts":
/*!***********************************!*\
  !*** ./app/api/patients/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\nasync function POST(req) {\n    try {\n        const patient = await req.json();\n        // Validation des données\n        if (!patient.name || !patient.age || !patient.diagnosis) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Nom, âge et diagnostic sont obligatoires'\n            }, {\n                status: 400\n            });\n        }\n        // Validation du sexe\n        const validSexes = [\n            'M',\n            'F',\n            'Autre',\n            null\n        ];\n        if (patient.sexe && !validSexes.includes(patient.sexe)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Le sexe doit être M, F, Autre ou null'\n            }, {\n                status: 400\n            });\n        }\n        // Création du patient\n        const newPatient = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].patient.create({\n            data: {\n                name: patient.name,\n                age: parseInt(patient.age),\n                sexe: patient.sexe || null,\n                diagnosis: patient.diagnosis,\n                poids: patient.poids ? parseFloat(patient.poids) : null,\n                taille: patient.taille ? parseFloat(patient.taille) : null,\n                traitement: patient.traitement || null,\n                numSecu: patient.numSecu || null,\n                medecin: patient.medecin || null,\n                ...patient.rendezvous && {\n                    rendezvous: new Date(patient.rendezvous)\n                },\n                groupeSanguin: patient.groupeSanguin || null,\n                allergies: patient.allergies || null,\n                notes: patient.notes || null\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(newPatient, {\n            status: 201\n        });\n    } catch (error) {\n        console.error('Erreur ajout patient:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Erreur lors de la création du patient'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function GET() {\n    try {\n        const patients = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__[\"default\"].patient.findMany({\n            orderBy: {\n                createdAt: 'desc'\n            },\n            select: {\n                id: true,\n                name: true,\n                age: true,\n                sexe: true,\n                diagnosis: true,\n                poids: true,\n                taille: true,\n                traitement: true,\n                numSecu: true,\n                medecin: true,\n                rendezvous: true,\n                groupeSanguin: true,\n                allergies: true,\n                notes: true,\n                createdAt: true\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(patients);\n    } catch (error) {\n        console.error('Erreur lors du chargement des patients:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Erreur lors de la récupération des patients'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LCJzb3VyY2VzIjpbIi9Vc2Vycy9tYWN1c2VyL0RvY3VtZW50cy9HaXRIdWIvSGFja2F0aG9uX0dMXzIwMjUvYXBwL2FwaS9wYXRpZW50cy9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgcHJpc21hIGZyb20gJ0AvbGliL3ByaXNtYSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHBhdGllbnQgPSBhd2FpdCByZXEuanNvbigpO1xuXG4gICAgLy8gVmFsaWRhdGlvbiBkZXMgZG9ubsOpZXNcbiAgICBpZiAoIXBhdGllbnQubmFtZSB8fCAhcGF0aWVudC5hZ2UgfHwgIXBhdGllbnQuZGlhZ25vc2lzKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6ICdOb20sIMOiZ2UgZXQgZGlhZ25vc3RpYyBzb250IG9ibGlnYXRvaXJlcycgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFZhbGlkYXRpb24gZHUgc2V4ZVxuICAgIGNvbnN0IHZhbGlkU2V4ZXMgPSBbJ00nLCAnRicsICdBdXRyZScsIG51bGxdO1xuICAgIGlmIChwYXRpZW50LnNleGUgJiYgIXZhbGlkU2V4ZXMuaW5jbHVkZXMocGF0aWVudC5zZXhlKSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnTGUgc2V4ZSBkb2l0IMOqdHJlIE0sIEYsIEF1dHJlIG91IG51bGwnIH0sXG4gICAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBDcsOpYXRpb24gZHUgcGF0aWVudFxuICAgIGNvbnN0IG5ld1BhdGllbnQgPSBhd2FpdCBwcmlzbWEucGF0aWVudC5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBuYW1lOiBwYXRpZW50Lm5hbWUsXG4gICAgICAgIGFnZTogcGFyc2VJbnQocGF0aWVudC5hZ2UpLFxuICAgICAgICBzZXhlOiBwYXRpZW50LnNleGUgfHwgbnVsbCwgLy8gUydhc3N1cmUgcXVlIGxlIHNleGUgZXN0IHNvaXQgTS9GL0F1dHJlIHNvaXQgbnVsbFxuICAgICAgICBkaWFnbm9zaXM6IHBhdGllbnQuZGlhZ25vc2lzLFxuICAgICAgICBwb2lkczogcGF0aWVudC5wb2lkcyA/IHBhcnNlRmxvYXQocGF0aWVudC5wb2lkcykgOiBudWxsLFxuICAgICAgICB0YWlsbGU6IHBhdGllbnQudGFpbGxlID8gcGFyc2VGbG9hdChwYXRpZW50LnRhaWxsZSkgOiBudWxsLFxuICAgICAgICB0cmFpdGVtZW50OiBwYXRpZW50LnRyYWl0ZW1lbnQgfHwgbnVsbCxcbiAgICAgICAgbnVtU2VjdTogcGF0aWVudC5udW1TZWN1IHx8IG51bGwsXG4gICAgICAgIG1lZGVjaW46IHBhdGllbnQubWVkZWNpbiB8fCBudWxsLFxuICAgICAgICAuLi4ocGF0aWVudC5yZW5kZXp2b3VzICYmIHsgcmVuZGV6dm91czogbmV3IERhdGUocGF0aWVudC5yZW5kZXp2b3VzKSB9KSxcbiAgICAgICAgZ3JvdXBlU2FuZ3VpbjogcGF0aWVudC5ncm91cGVTYW5ndWluIHx8IG51bGwsXG4gICAgICAgIGFsbGVyZ2llczogcGF0aWVudC5hbGxlcmdpZXMgfHwgbnVsbCxcbiAgICAgICAgbm90ZXM6IHBhdGllbnQubm90ZXMgfHwgbnVsbFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKG5ld1BhdGllbnQsIHsgc3RhdHVzOiAyMDEgfSk7XG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJldXIgYWpvdXQgcGF0aWVudDonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ0VycmV1ciBsb3JzIGRlIGxhIGNyw6lhdGlvbiBkdSBwYXRpZW50JyB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIGNvbnN0IHBhdGllbnRzID0gYXdhaXQgcHJpc21hLnBhdGllbnQuZmluZE1hbnkoe1xuICAgICAgb3JkZXJCeTogeyBjcmVhdGVkQXQ6ICdkZXNjJyB9LFxuICAgICAgc2VsZWN0OiB7XG4gICAgICAgIGlkOiB0cnVlLFxuICAgICAgICBuYW1lOiB0cnVlLFxuICAgICAgICBhZ2U6IHRydWUsXG4gICAgICAgIHNleGU6IHRydWUsIFxuICAgICAgICBkaWFnbm9zaXM6IHRydWUsXG4gICAgICAgIHBvaWRzOiB0cnVlLFxuICAgICAgICB0YWlsbGU6IHRydWUsXG4gICAgICAgIHRyYWl0ZW1lbnQ6IHRydWUsXG4gICAgICAgIG51bVNlY3U6IHRydWUsXG4gICAgICAgIG1lZGVjaW46IHRydWUsXG4gICAgICAgIHJlbmRlenZvdXM6IHRydWUsXG4gICAgICAgIGdyb3VwZVNhbmd1aW46IHRydWUsXG4gICAgICAgIGFsbGVyZ2llczogdHJ1ZSxcbiAgICAgICAgbm90ZXM6IHRydWUsXG4gICAgICAgIGNyZWF0ZWRBdDogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihwYXRpZW50cyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyZXVyIGxvcnMgZHUgY2hhcmdlbWVudCBkZXMgcGF0aWVudHM6JywgZXJyb3IpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgIHsgZXJyb3I6ICdFcnJldXIgbG9ycyBkZSBsYSByw6ljdXDDqXJhdGlvbiBkZXMgcGF0aWVudHMnIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInByaXNtYSIsIlBPU1QiLCJyZXEiLCJwYXRpZW50IiwianNvbiIsIm5hbWUiLCJhZ2UiLCJkaWFnbm9zaXMiLCJlcnJvciIsInN0YXR1cyIsInZhbGlkU2V4ZXMiLCJzZXhlIiwiaW5jbHVkZXMiLCJuZXdQYXRpZW50IiwiY3JlYXRlIiwiZGF0YSIsInBhcnNlSW50IiwicG9pZHMiLCJwYXJzZUZsb2F0IiwidGFpbGxlIiwidHJhaXRlbWVudCIsIm51bVNlY3UiLCJtZWRlY2luIiwicmVuZGV6dm91cyIsIkRhdGUiLCJncm91cGVTYW5ndWluIiwiYWxsZXJnaWVzIiwibm90ZXMiLCJjb25zb2xlIiwiR0VUIiwicGF0aWVudHMiLCJmaW5kTWFueSIsIm9yZGVyQnkiLCJjcmVhdGVkQXQiLCJzZWxlY3QiLCJpZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/patients/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* eslint-disable no-var */ // lib/prisma.ts\n\nconst prisma = global.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) global.prisma = prisma;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prisma);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlCQUF5QixHQUN6QixnQkFBZ0I7QUFDOEI7QUFNOUMsTUFBTUMsU0FBU0MsT0FBT0QsTUFBTSxJQUFJLElBQUlELHdEQUFZQTtBQUVoRCxJQUFJRyxJQUFxQyxFQUFFRCxPQUFPRCxNQUFNLEdBQUdBO0FBRTNELGlFQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyIvVXNlcnMvbWFjdXNlci9Eb2N1bWVudHMvR2l0SHViL0hhY2thdGhvbl9HTF8yMDI1L2xpYi9wcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdmFyICovXG4vLyBsaWIvcHJpc21hLnRzXG5pbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgdmFyIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkO1xufVxuXG5jb25zdCBwcmlzbWEgPSBnbG9iYWwucHJpc21hIHx8IG5ldyBQcmlzbWFDbGllbnQoKTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGdsb2JhbC5wcmlzbWEgPSBwcmlzbWE7XG5cbmV4cG9ydCBkZWZhdWx0IHByaXNtYTsiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiZ2xvYmFsIiwicHJvY2VzcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpatients%2Froute&page=%2Fapi%2Fpatients%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpatients%2Froute.ts&appDir=%2FUsers%2Fmacuser%2FDocuments%2FGitHub%2FHackathon_GL_2025%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacuser%2FDocuments%2FGitHub%2FHackathon_GL_2025&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpatients%2Froute&page=%2Fapi%2Fpatients%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpatients%2Froute.ts&appDir=%2FUsers%2Fmacuser%2FDocuments%2FGitHub%2FHackathon_GL_2025%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacuser%2FDocuments%2FGitHub%2FHackathon_GL_2025&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_macuser_Documents_GitHub_Hackathon_GL_2025_app_api_patients_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/patients/route.ts */ \"(rsc)/./app/api/patients/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/patients/route\",\n        pathname: \"/api/patients\",\n        filename: \"route\",\n        bundlePath: \"app/api/patients/route\"\n    },\n    resolvedPagePath: \"/Users/macuser/Documents/GitHub/Hackathon_GL_2025/app/api/patients/route.ts\",\n    nextConfigOutput,\n    userland: _Users_macuser_Documents_GitHub_Hackathon_GL_2025_app_api_patients_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwYXRpZW50cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcGF0aWVudHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZwYXRpZW50cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRm1hY3VzZXIlMkZEb2N1bWVudHMlMkZHaXRIdWIlMkZIYWNrYXRob25fR0xfMjAyNSUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZtYWN1c2VyJTJGRG9jdW1lbnRzJTJGR2l0SHViJTJGSGFja2F0aG9uX0dMXzIwMjUmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzJCO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvbWFjdXNlci9Eb2N1bWVudHMvR2l0SHViL0hhY2thdGhvbl9HTF8yMDI1L2FwcC9hcGkvcGF0aWVudHMvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3BhdGllbnRzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcGF0aWVudHNcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3BhdGllbnRzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL21hY3VzZXIvRG9jdW1lbnRzL0dpdEh1Yi9IYWNrYXRob25fR0xfMjAyNS9hcHAvYXBpL3BhdGllbnRzL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpatients%2Froute&page=%2Fapi%2Fpatients%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpatients%2Froute.ts&appDir=%2FUsers%2Fmacuser%2FDocuments%2FGitHub%2FHackathon_GL_2025%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacuser%2FDocuments%2FGitHub%2FHackathon_GL_2025&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fpatients%2Froute&page=%2Fapi%2Fpatients%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fpatients%2Froute.ts&appDir=%2FUsers%2Fmacuser%2FDocuments%2FGitHub%2FHackathon_GL_2025%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fmacuser%2FDocuments%2FGitHub%2FHackathon_GL_2025&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();