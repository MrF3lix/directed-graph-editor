import React from 'react';
import { GraphView } from 'react-digraph';

export const getNextIndex = (graph) => {
  if (graph.nodes.length === 0) {
    return 1;
  }

  return graph.nodes[graph.nodes.length - 1].id + 1;
};

const GraphConfig = {
  NodeTypes: {
    start: {
      typeText: 'Start',
      shapeId: '#start',
      shape: (
        <symbol viewBox="0 0 100 100" id="start" key="0">
          <circle cx="50" cy="50" r="45"></circle>
        </symbol>
      )
    },
    end: {
      typeText: 'End',
      shapeId: '#end',
      shape: (
        <symbol viewBox="0 0 100 100" id="end" key="0">
          <circle cx="50" cy="50" r="45"></circle>
          <circle cx="50" cy="50" r="40"></circle>
        </symbol>
      )
    },
    empty: {
      typeText: 'None',
      shapeId: '#empty',
      shape: (
        <symbol viewBox="0 0 100 100" id="empty" key="0">
          <circle cx="50" cy="50" r="45"></circle>
        </symbol>
      )
    }
  },
  NodeSubtypes: {},
  EdgeTypes: {
    default: {
      typeText: 'Edge',
      shapeId: '#default',
      shape: (
        <symbol viewBox="0 0 50 50" id="default" key="0">
          <circle cx="25" cy="25" r="20" fill="currentColor"></circle>
        </symbol>
      )
    }
  }
};

const NODE_KEY = 'id';

export const Graph = ({ graph, setGraph, selected, setSelected }) => {
  const nodes = graph?.nodes;
  const edges = graph?.edges;

  const NodeTypes = GraphConfig.NodeTypes;
  const NodeSubtypes = GraphConfig.NodeSubtypes;
  const EdgeTypes = GraphConfig.EdgeTypes;

  const onUpdateNode = node => {
    setGraph({
      ...graph,
      nodes: [
        ...graph.nodes.filter(n => n.id !== node.id),
        node
      ]
    });
  };

  const onDeleteNode = node => {
    setGraph({
      ...graph,
      nodes: graph.nodes.filter(n => n.id !== node.id)
    });
  };

  const onDeleteEdge = edge => {
    setGraph({
      ...graph,
      edges: graph.edges.filter(e => (e.source !== edge.source || e.target !== edge.target))
    });
  };

  const onCreateNode = (x, y) => {
    const newNode = {
      id: getNextIndex(graph),
      x,
      y,
      title: 'New Node',
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

  const onCreateEdge = (sourceNode, targetNode) => {
    const newEdge = {
      source: sourceNode.id,
      target: targetNode.id,
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

  const onSwapEdge = (sourceNode, targetNode, edge) => {
    console.log(sourceNode, targetNode, edge);

    const newEdge = {
      source: sourceNode.id,
      target: targetNode.id,
      ...edge
    };

    setGraph({
      ...graph,
      edges: [
        ...graph.edges.filter(e => (e.source !== edge.source || e.target !== edge.target)),
        newEdge
      ]
    });
  };

  const canDeleteNode = () => true;
  const canDeleteEdge = () => true;

  return (
    <div id="graph">
      <GraphView
        nodeKey={NODE_KEY}
        nodes={nodes}
        edges={edges}
        selected={selected}
        nodeTypes={NodeTypes}
        nodeSubtypes={NodeSubtypes}
        edgeTypes={EdgeTypes}
        canDeleteNode={canDeleteNode}
        canDeleteEdge={canDeleteEdge}
        onDeleteNode={onDeleteNode}
        onDeleteEdge={onDeleteEdge}
        onSelectNode={setSelected}
        onSelectEdge={setSelected}
        onSwapEdge={onSwapEdge}
        onUpdateNode={onUpdateNode}
        onCreateEdge={onCreateEdge}
        onCreateNode={onCreateNode}
      />
    </div>
  );
};