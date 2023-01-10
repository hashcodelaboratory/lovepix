import {Material} from "../../../common/enums/material";

export const dimensionsByWidth = [
    { width: 30, height: 20, id: "w1" },
    { width: 90, height: 60, id: "w2" },
    { width: 60, height: 40, id: "w3" },
    { width: 45, height: 30, id: "w4" },
    { width: 105, height: 70, id: "w5" },
    { width: 120, height: 80, id: "w6" },
];

export const dimensionsByHeight = [
    { width: 20, height: 30, id: "h1" },
    { width: 30, height: 45, id: "h2" },
    { width: 40, height: 60, id: "h3" },
    { width: 50, height: 75, id: "h4" },
    { width: 60, height: 90, id: "h5" },
    { width: 80, height: 120, id: "h6" },
    { width: 70, height: 105, id: "h7" },
];

export const dimensionsBySquare = [
    { width: 50, height: 50, id: "s1" },
    { width: 80, height: 80, id: "s2" },
    { width: 100, height: 100, id: "s3" },
];

export const materials = [
    {
        id: "m1",
        image:
            "https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/materials%2Fdibond?alt=media&token=f4447146-e623-4fbb-b4e5-97cb8082f9c5",
        name: Material.DIBOND,
    },
    {
        id: "m2",
        image:
            "https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/materials%2Fcanvas?alt=media&token=18852992-441d-44ce-89c6-5883ee2193da",
        name: Material.CANVAS,
    },
    {
        id: "m3",
        image:
            "https://firebasestorage.googleapis.com/v0/b/lovepix-78bf6.appspot.com/o/materials%2Facrylate?alt=media&token=25c03132-9fbe-421e-ab43-0a16b4c128f0",
        name: Material.AKRYL,
    },
];