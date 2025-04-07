(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_patients_page_tsx_ee90fba2._.js", {

"[project]/app/patients/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PatientsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function PatientsPage() {
    _s();
    const [patients, setPatients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filterKey, setFilterKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("name");
    const [sortAsc, setSortAsc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [notification, setNotification] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PatientsPage.useEffect": ()=>{
            const isLoggedIn = localStorage.getItem("isLoggedIn");
            if (!isLoggedIn) {
                router.push("/login");
            }
        }
    }["PatientsPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PatientsPage.useEffect": ()=>{
            fetch("/api/patients").then({
                "PatientsPage.useEffect": async (res)=>{
                    if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
                    const data = await res.json();
                    setPatients(data);
                    const alertes = data.filter({
                        "PatientsPage.useEffect.alertes": (p)=>p.diagnosis?.toLowerCase().includes("critique")
                    }["PatientsPage.useEffect.alertes"]);
                    const maintenant = new Date();
                    const dansTroisJours = new Date();
                    dansTroisJours.setDate(maintenant.getDate() + 3);
                    const rappels = data.filter({
                        "PatientsPage.useEffect.rappels": (p)=>{
                            const rdv = new Date(p.rendezvous);
                            return rdv >= maintenant && rdv <= dansTroisJours;
                        }
                    }["PatientsPage.useEffect.rappels"]);
                    if (alertes.length > 0) {
                        setNotification(`⚠️ ${alertes.length} patient(s) en état critique`);
                    } else if (rappels.length > 0) {
                        setNotification(`🔔 ${rappels.length} rendez-vous à venir dans 3 jours`);
                    }
                }
            }["PatientsPage.useEffect"]).catch({
                "PatientsPage.useEffect": (err)=>{
                    console.error("Erreur chargement patients:", err);
                    setPatients([]);
                }
            }["PatientsPage.useEffect"]);
        }
    }["PatientsPage.useEffect"], []);
    const filteredPatients = [
        ...patients
    ].filter((patient)=>{
        const value = patient[filterKey];
        if (filterKey === "id") {
            return String(value).includes(search);
        }
        return String(value).toLowerCase().includes(search.toLowerCase());
    }).sort((a, b)=>{
        if (a[filterKey] < b[filterKey]) return sortAsc ? -1 : 1;
        if (a[filterKey] > b[filterKey]) return sortAsc ? 1 : -1;
        return 0;
    });
    const handleDelete = async (id)=>{
        const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce patient ?");
        if (confirmDelete) {
            try {
                const res = await fetch(`/api/patients/${id}`, {
                    method: "DELETE"
                });
                if (!res.ok) throw new Error(`Erreur suppression patient: ${res.status}`);
                setPatients(patients.filter((p)=>p.id !== id));
            } catch (error) {
                console.error("Erreur suppression patient:", error);
                alert("Une erreur est survenue lors de la suppression.");
            }
        }
    };
    const highlightMatch = (text, search)=>{
        const regex = new RegExp(`(${search})`, "gi");
        return text.replace(regex, `<mark class="bg-yellow-300">$1</mark>`);
    };
    const getHighlighted = (key, value)=>{
        const text = String(value);
        if (filterKey === key && search) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                dangerouslySetInnerHTML: {
                    __html: highlightMatch(text, search)
                }
            }, void 0, false, {
                fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                lineNumber: 90,
=======
                lineNumber: 79,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                columnNumber: 9
            }, this);
        }
        return text;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gray-100 min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                    className: "text-4xl font-semibold mb-6 text-center text-indigo-700",
                    initial: {
                        opacity: 0,
                        y: -50
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    transition: {
                        duration: 1
                    },
                    children: "Liste des Patients"
                }, void 0, false, {
                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                    lineNumber: 103,
=======
                    lineNumber: 92,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 mb-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-5 gap-4 no-print",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: `Rechercher par ${filterKey}...`,
                            value: search,
                            onChange: (e)=>setSearch(e.target.value),
                            className: "w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-indigo-600 text-lg"
                        }, void 0, false, {
                            fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                            lineNumber: 113,
=======
                            lineNumber: 103,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: filterKey,
                            onChange: (e)=>setFilterKey(e.target.value),
                            className: "w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-indigo-600 text-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "id",
                                    children: "ID"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                    lineNumber: 126,
=======
                                    lineNumber: 116,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "name",
                                    children: "Nom"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                    lineNumber: 127,
=======
                                    lineNumber: 117,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "age",
                                    children: "Âge"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                    lineNumber: 128,
=======
                                    lineNumber: 118,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "diagnosis",
                                    children: "Diagnostic"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                    lineNumber: 129,
=======
                                    lineNumber: 119,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                            lineNumber: 121,
=======
                            lineNumber: 111,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setSortAsc(!sortAsc),
                            className: "w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition text-lg",
                            children: sortAsc ? "↑ Croissant" : "↓ Décroissant"
                        }, void 0, false, {
                            fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                            lineNumber: 132,
=======
                            lineNumber: 122,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push("/patients/ajouter"),
                            className: "w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition flex items-center justify-center space-x-2 text-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaPlus"], {}, void 0, false, {
                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden md:inline",
                                    children: "Ajouter"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/page.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/patients/page.tsx",
                            lineNumber: 139,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>window.print(),
                            className: "w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition flex items-center justify-center space-x-2 text-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaPrint"], {}, void 0, false, {
                                    fileName: "[project]/app/patients/page.tsx",
                                    lineNumber: 151,
=======
                                    lineNumber: 133,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden md:inline",
                                    children: "Ajouter"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/page.tsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/patients/page.tsx",
                            lineNumber: 147,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>window.print(),
                            className: "w-full bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition flex items-center justify-center space-x-2 text-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaPrint"], {}, void 0, false, {
                                    fileName: "[project]/app/patients/page.tsx",
                                    lineNumber: 141,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden md:inline",
                                    children: "Imprimer"
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/page.tsx",
                                    lineNumber: 142,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/patients/page.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                    lineNumber: 112,
=======
                    lineNumber: 102,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-4 md:overflow-x-auto md:bg-white md:shadow-lg md:rounded-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "hidden md:table w-full border-collapse border border-gray-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        className: "bg-indigo-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border p-4 text-left text-indigo-600",
                                                children: "ID"
                                            }, void 0, false, {
                                                fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                lineNumber: 160,
=======
                                                lineNumber: 151,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border p-4 text-left text-indigo-600",
                                                children: "Nom"
                                            }, void 0, false, {
                                                fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                lineNumber: 161,
=======
                                                lineNumber: 152,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border p-4 text-left text-indigo-600",
                                                children: "Âge"
                                            }, void 0, false, {
                                                fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                lineNumber: 162,
=======
                                                lineNumber: 153,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border p-4 text-left text-indigo-600",
                                                children: "Diagnostic"
                                            }, void 0, false, {
                                                fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                lineNumber: 163,
=======
                                                lineNumber: 154,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border p-4 text-left text-indigo-600 no-print",
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                lineNumber: 164,
=======
                                                lineNumber: 155,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                        lineNumber: 159,
=======
                                        lineNumber: 150,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                    lineNumber: 158,
=======
                                    lineNumber: 149,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: filteredPatients.map((patient)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "hover:bg-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "border p-4 text-black",
                                                    children: getHighlighted("id", patient.id)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                    lineNumber: 170,
=======
                                                    lineNumber: 161,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "border p-4 text-black",
                                                    children: getHighlighted("name", patient.name)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                    lineNumber: 173,
=======
                                                    lineNumber: 164,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "border p-4 text-black",
                                                    children: getHighlighted("age", patient.age)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                    lineNumber: 176,
=======
                                                    lineNumber: 167,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "border p-4 text-black",
                                                    children: getHighlighted("diagnosis", patient.diagnosis)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                    lineNumber: 179,
=======
                                                    lineNumber: 170,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "border p-4 flex space-x-2 justify-center text-indigo-600 no-print",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>router.push(`/patients/dossier/${patient.id}`),
                                                            className: "bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEye"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/patients/page.tsx",
                                                                lineNumber: 187,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/patients/page.tsx",
                                                            lineNumber: 183,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>router.push(`/patients/modifier/${patient.id}`),
                                                            className: "bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEdit"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                                lineNumber: 193,
=======
                                                                lineNumber: 178,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                            lineNumber: 189,
=======
                                                            lineNumber: 174,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleDelete(patient.id),
                                                            className: "bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaTrash"], {
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                                lineNumber: 199,
=======
                                                                lineNumber: 184,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                            lineNumber: 195,
=======
                                                            lineNumber: 180,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                    lineNumber: 182,
=======
                                                    lineNumber: 173,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, patient.id, true, {
                                            fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                            lineNumber: 169,
=======
                                            lineNumber: 160,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                    lineNumber: 167,
=======
                                    lineNumber: 158,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                            lineNumber: 157,
=======
                            lineNumber: 148,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:hidden grid gap-4",
                            children: filteredPatients.map((patient)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white shadow rounded-lg p-4 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-bold text-indigo-600 mb-2",
                                            children: [
                                                "ID : ",
                                                getHighlighted("id", patient.id)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                            lineNumber: 210,
=======
                                            lineNumber: 196,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Nom :"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                    lineNumber: 213,
                                                    columnNumber: 20
=======
                                                    lineNumber: 200,
                                                    columnNumber: 19
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                }, this),
                                                " ",
                                                getHighlighted("name", patient.name)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                            lineNumber: 213,
=======
                                            lineNumber: 199,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Âge :"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                    lineNumber: 214,
                                                    columnNumber: 20
=======
                                                    lineNumber: 204,
                                                    columnNumber: 19
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                }, this),
                                                " ",
                                                getHighlighted("age", patient.age)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                            lineNumber: 214,
=======
                                            lineNumber: 203,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Diagnostic :"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                    lineNumber: 215,
                                                    columnNumber: 20
=======
                                                    lineNumber: 208,
                                                    columnNumber: 19
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                }, this),
                                                " ",
                                                getHighlighted("diagnosis", patient.diagnosis)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                            lineNumber: 215,
=======
                                            lineNumber: 207,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-end space-x-3 mt-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>router.push(`/patients/dossier/${patient.id}`),
                                                    className: "bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEye"], {}, void 0, false, {
                                                        fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                        lineNumber: 221,
=======
                                                        lineNumber: 216,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                    lineNumber: 217,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>router.push(`/patients/modifier/${patient.id}`),
                                                    className: "bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaEdit"], {}, void 0, false, {
                                                        fileName: "[project]/app/patients/page.tsx",
                                                        lineNumber: 227,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/patients/page.tsx",
                                                    lineNumber: 223,
=======
                                                    lineNumber: 212,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleDelete(patient.id),
                                                    className: "bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaTrash"], {}, void 0, false, {
                                                        fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                        lineNumber: 233,
=======
                                                        lineNumber: 222,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                                    lineNumber: 229,
=======
                                                    lineNumber: 218,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                            lineNumber: 216,
=======
                                            lineNumber: 211,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, patient.id, true, {
                                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                                    lineNumber: 209,
=======
                                    lineNumber: 195,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                            lineNumber: 207,
=======
                            lineNumber: 193,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
                    lineNumber: 156,
=======
                    lineNumber: 146,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
                    columnNumber: 9
                }, this),
                notification && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Notification, {
                    message: notification,
                    onClose: ()=>setNotification("")
                }, void 0, false, {
                    fileName: "[project]/app/patients/page.tsx",
                    lineNumber: 242,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
            lineNumber: 102,
=======
            lineNumber: 91,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/patients/page.tsx",
<<<<<<< HEAD
        lineNumber: 101,
=======
        lineNumber: 90,
>>>>>>> 636f86c2b30ec9a8ea7b1da8b401e892e6f00843
        columnNumber: 5
    }, this);
}
_s(PatientsPage, "BU9z/eH28cV9d3AppQIoy92X0RU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PatientsPage;
var _c;
__turbopack_context__.k.register(_c, "PatientsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=app_patients_page_tsx_ee90fba2._.js.map