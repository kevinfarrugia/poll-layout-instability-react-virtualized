import * as React from "react";

const ListItem = ({ img, text, style }) => {
  return (
    <li style={style} className="mb-4">
      <figure
        className="bg-gray-200 rounded-xl p-4 shadow-md transition duration-1000"
        style={{ height: "292px" }}
      >
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src={`./img/${img}.jpg`}
          alt=""
          width="384"
          height="512"
        />
        <div className="pt-3 text-center space-y-2 w-full">
          <blockquote>
            <p className="text-md font-semibold">{text}</p>
          </blockquote>
          <figcaption className="font-medium">
            <div className="text-cyan-600">John Doe</div>
            <div className="text-gray-500">Sofware Engineer, Example.com</div>
          </figcaption>
        </div>
      </figure>
    </li>
  );
};

export default ListItem;
