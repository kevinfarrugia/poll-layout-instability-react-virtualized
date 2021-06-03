import { nanoid } from "nanoid";
import React, { useEffect, useRef, useState } from "react";
import {
  AutoSizer,
  List as VirtualList,
  WindowScroller,
} from "react-virtualized";

import ListItem from "../ListItem";

const createItem = (text, isNew) => ({
  id: nanoid(),
  img: Math.ceil(Math.random() * 8),
  text,
  isNew,
});
const INTERVAL = 4000;
const INITIAL_DATA = Array(100)
  .fill()
  .map((_, i) => createItem(`index: ${i}`, false));

const List = () => {
  const [list, setList] = useState(INITIAL_DATA);
  const visibleStartIndex = useRef(0);
  const visibleStopIndex = useRef(0);

  // mimicks polling for data from an API
  useEffect(() => {
    setInterval(() => {
      const insertionIndex = 0;
      setList((oldList) => [
        createItem(
          "I am new!",
          !(
            insertionIndex >= visibleStartIndex.current &&
            insertionIndex <= visibleStopIndex.current
          )
        ),
        ...oldList,
      ]);
    }, INTERVAL);
  }, []);

  const listWithoutNewItems = list.filter((item) => !item.isNew);
  const newItemIndices = list.reduce((acc, curr, i) => {
    if (curr.isNew) {
      acc.push(i);
    }
    return acc;
  }, []);

  const onRowsRendered = ({ startIndex, stopIndex }) => {
    const visibleNewItems = newItemIndices.filter(
      (i) => i <= stopIndex && i >= startIndex
    );

    visibleStartIndex.current = startIndex;
    visibleStopIndex.current = stopIndex;

    if (visibleNewItems.length) {
      const newItems = list
        .filter((item, i) => !item.isNew || visibleNewItems.includes(i))
        .map((item) => ({
          ...item,
          isNew: false,
        }));
      setList(newItems);
    }
  };

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
      img={listWithoutNewItems[index].img}
      text={listWithoutNewItems[index].text}
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
                  rowCount={listWithoutNewItems.length}
                  rowHeight={308}
                  rowRenderer={rowRenderer}
                  scrollTop={scrollTop}
                  width={width}
                  onRowsRendered={onRowsRendered}
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
