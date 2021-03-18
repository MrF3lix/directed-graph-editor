import React, { useEffect, useState } from 'react';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';


export const GraphJsonEditor = ({ graph, setGraph }) => {

  const [json, setJson] = useState();

  useEffect(() => {
    setJson({
      ...graph,
      nodes: graph.nodes.sort((a, b) => a.id - b.id)
    });
  }, [graph]);

  const onChange = data => {
    if (data.jsObject) {
      setGraph(data.jsObject);
    }
  };

  return (
    <React.Fragment>
      <JSONInput
        id='json__editor'
        locale={locale}
        height="100%"
        width="100%"
        placeholder={json}
        onChange={onChange}
      />
    </React.Fragment>
  );
};
