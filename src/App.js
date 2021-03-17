import React, { useState } from 'react';
import { GraphJsonEditor } from './GraphJsonEditor';
import { Graph } from './Graph';
import initial from './sample.json';
import { useLocalStorage } from 'react-use';

export const App = () => {
  const [graph, setGraph] = useLocalStorage('graphData', initial);
  const [selected, setSelected] = useState();


  const createNode = () => {
    let newNode = {
      id: Date.now(),
      title: 'New Node',
      x: 0,
      y: 0,
      type: 'empty'
    };

    setGraph({
      ...graph,
      nodes: [
        ...graph.nodes,
        newNode
      ]
    });
  };

  const createEdge = () => {
    let newEdge = {
      source: selected.id,
      target: 3,
      type: 'default',
      handleText: 'X'
    };

    setGraph({
      ...graph,
      edges: [
        ...graph.edges,
        newEdge
      ]
    });
  };

  const reset = () => {
    setGraph(initial);
  };

  return (
    <React.Fragment>
      <div className="control__container">
        <button onClick={createNode} className="button--primary">Add Node</button>
        <button onClick={createEdge} disabled={selected === null}>Add Edge</button>
        <button onClick={reset}>Reset</button>
      </div>
      <Graph graph={graph} setGraph={setGraph} selected={selected} setSelected={setSelected} />
      <GraphJsonEditor graph={graph} setGraph={setGraph} />
    </React.Fragment>
  );
};