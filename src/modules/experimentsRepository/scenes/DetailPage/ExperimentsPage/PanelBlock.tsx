import React from 'react';
import { ExperimentPartial } from 'models/Experiment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Props {
  experiments: ExperimentPartial[];
  activeId?: number;
  itemClick?: (id: number) => void,
  search: (query: string) => void,
  searchQuery: string;
}

const PanelBlock = (props: Props) => {
  const { experiments, activeId, itemClick, search, searchQuery } = props;

  return (
    <nav className="panel is-primary">
      <p className="panel-heading">
        Experiments
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input 
            className="input" 
            type="text" 
            placeholder="Search" 
            onChange={(e) => search(e.currentTarget.value)}
            value={searchQuery}
          />
          <span className="icon is-left">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </p>
      </div>
      <div className="panel-items-block">
        {experiments && experiments.map((experiment: ExperimentPartial) =>
          <label 
            className={`panel-block${activeId === experiment.id ? " active" : ""}`} 
            key={`experiments-panel-${experiment.id}`}
            onClick={() => itemClick(experiment.id)}
          >
            {experiment.name}
          </label>
        )}
      </div>
      <div className="panel-block">
        <button 
          className="button is-primary is-outlined is-fullwidth" 
          onClick={() => search("")}
        >
          Reset search
        </button>
      </div>
    </nav>
  );
}

export default PanelBlock;