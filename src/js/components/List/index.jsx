import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
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
  const listRef = useRef(null);
  const heightRef = useRef(0);

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
          {({ height, isScrolling, onChildScroll, scrollTop }) => {
            let myScrollTop = scrollTop;
            if (listRef.current && !isScrolling) {
              // is there a better way to retrieve the clientHeight
              const newHeight =
                listRef.current?.Grid._scrollingContainer?.clientHeight;

              // if the user has scrolled down maintain the scroll position
              if (scrollTop > 0 && heightRef?.current > 0 && newHeight) {
                myScrollTop = scrollTop + newHeight - heightRef.current;
              }

              heightRef.current = newHeight;
            }

            return (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <VirtualList
                    ref={listRef}
                    autoHeight
                    height={height}
                    onScroll={onChildScroll}
                    isScrolling={isScrolling}
                    rowCount={list.length}
                    rowHeight={308}
                    rowRenderer={rowRenderer}
                    scrollTop={myScrollTop}
                    width={width}
                  />
                )}
              </AutoSizer>
            );
          }}
        </WindowScroller>
      </ul>
    </section>
  );
};

export default List;
