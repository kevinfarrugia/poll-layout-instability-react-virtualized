import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import {
  AutoSizer,
  List as VirtualList,
  WindowScroller,
} from "react-virtualized";

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

  const rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    // isScrolling, // The List is currently being scrolled
    // isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => (
    <ListItem
      key={key}
      style={style}
      img={list[index].img}
      text={list[index].text}
    />
  );

  return (
    <section>
      <ul id="list" className="mx-auto max-w-sm p-4">
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <VirtualList
                  autoHeight
                  height={height}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  rowCount={list.length}
                  rowHeight={308}
                  rowRenderer={rowRenderer}
                  scrollTop={scrollTop}
                  width={width}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </ul>
    </section>
  );
};

export default List;
