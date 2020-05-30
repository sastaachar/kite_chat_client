import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 414 264"
      fill="none"
      {...props}
    >
      <g id="prefix__kite">
        <path
          id="prefix__tail"
          d="M322 107c-28.035 2.55-50.142 6.993-73.853 15.086-27.118 9.257 18.669 16.353 32.495 19.26 15.016 3.156 45.216 10.714 21.007 19.098-19.014 6.586-46.358 8.426-68.273 11.556-22.051 3.15-55.601 3.973-74.51 10.753-9.609 3.446 41.303 13.125 45.954 15.247 16.874 7.701-8.208 17.531-19.366 21.747-18.67 7.054-40.513 9.433-62.365 13.16-25.365 4.327-50.232 8.961-74.182 14.926C33.647 251.635 7.87 255.305 0 263"
          stroke="#22215B"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <mask
          id="prefix__mask0"
          maskUnits="userSpaceOnUse"
          x={332}
          y={14}
          width={57}
          height={87}
        >
          <g id="prefix__kiteBody" fill="#fff">
            <path
              id="prefix__Polygon_1"
              d="M359.23 49.912l-22.365-14.283 43.716-21.373-21.351 35.656z"
            />
            <path
              id="prefix__Polygon_3"
              d="M357.242 52.972l-24.99 47.395 4.094-63.061 20.896 15.666z"
            />
            <path
              id="prefix__Polygon_4"
              d="M361.421 56.105l-27.083 43.07 53.62-33.59-26.537-9.48z"
            />
            <path
              id="prefix__Polygon_2"
              d="M363.26 52.999l17.938-38.552 6.85 49.91L363.26 53z"
            />
          </g>
        </mask>
        <g mask="url(#prefix__mask0)">
          <path
            id="prefix__Rectangle_2"
            fill="#22215B"
            d="M332.46 12.503h56.368v89.921H332.46z"
          />
        </g>
      </g>
    </svg>
  );
}

export default SvgComponent;
