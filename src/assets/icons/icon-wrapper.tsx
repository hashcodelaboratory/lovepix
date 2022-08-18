import React from "react";

const IconWrapper = ({width, height, viewBox, children}: React.SVGProps<SVGSVGElement>) => (
    <svg
        data-name="homepage\xA0Image"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox ?? "0 0 50.38 63.49"}
        width={width ?? 200}
        height={height ?? 60}
    >
        {children}
    </svg>
);

export default IconWrapper;