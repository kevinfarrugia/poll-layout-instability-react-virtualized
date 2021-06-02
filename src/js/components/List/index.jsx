import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Virtuoso } from "react-virtuoso";

import ListItem from "../ListItem";

const INTERVAL = 4000;
const LOREM_IPSUM =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi deserunt, molestiae quidem a.";

const List = () => {
  const [list, setList] = useState([
    {
      id: nanoid(),
      img: 0,
      text: LOREM_IPSUM,
    },
  ]);

  // mimicks polling for data from an API
  useEffect(() => {
    setTimeout(() => {
      setList([
        {
          id: nanoid(),
          img: Math.ceil(Math.random() * 8),
          text: LOREM_IPSUM.slice(Math.ceil(Math.random() * 100)),
        },
        ...list,
      ]);
    }, INTERVAL);
  }, [list]);

  return (
    <section>
      <ul id="list" className="mx-auto max-w-sm p-4">
        <Virtuoso
          style={{ height: "100vh" }}
          totalCount={list.length}
          itemContent={(index) => (
            <ListItem img={list[index].img} text={list[index].text} />
          )}
        />
      </ul>
    </section>
  );
};

export default List;
