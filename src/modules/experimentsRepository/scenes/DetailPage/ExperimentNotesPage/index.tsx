import React, { useCallback, useEffect, useState } from "react";
import { Dispatch, bindActionCreators } from "redux";
import { connect, useDispatch, useSelector } from "react-redux";
import { RouteComponentProps, useParams } from "react-router";

import { moduleNames as experimentsNames } from "../../../reducers/MainReducer";
import { AppState } from "reducers/GlobalReducer";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import {
  getNoteError,
  getNotesById,
} from "modules/experimentsRepository/selectors";
import { ExperimentNote } from "models/Experiment";
import { loadExperimentNotes } from "modules/experimentsRepository/actions";
import { hhmmss } from "utils/helpers";
import { ExperimentComponentProps } from "../..";
import SelectableTimeline from "components/SelectableTimeline";
import Message from "components/Message";

interface Props extends ExperimentComponentProps {
  notes: ExperimentNote[];
  loadNotes: Function;
}

interface RouteParams {
  experimentId: string;
}

const INITIAL_TIME = {
  minTime: 0,
  maxTime: 0,
};

const ExperimentNotesPage = (props: Props) => {
  const dispatch = useDispatch();
  const params = useParams<RouteParams>();
  const notes = useSelector((state: AppState) =>
    getNotesById(state, params.experimentId)
  );
  const error = useSelector((state: AppState) =>
    getNoteError(state, params.experimentId)
  );

  const [time, setTime] = useState(INITIAL_TIME);

  useEffect(() => {
    // TODO: Add data model (TS) for this response
    const notesLoaded = (data) => {
      const { byId, all } = data.value.data;
      if (all.length > 0) {
        const lastIndex = all[all.length - 1];
        setTime({
          maxTime: byId[lastIndex] ? byId[lastIndex].time : 0,
          ...time,
        });
      }
    };

    const loadNotes = async (id: number | string) => {
      const data = await dispatch(loadExperimentNotes(id));
      notesLoaded(data);
    };

    if (notes) {
      const length = notes.length;
      length > 0 &&
        setTime({
          maxTime: notes[length - 1] ? notes[length - 1].time : 0,
          ...time,
        });
    } else loadNotes(params.experimentId);
  }, []);

  useEffect(() => {
    setTime({
      ...time,
      maxTime:
        notes && notes[notes.length - 1] ? notes[notes.length - 1].time : 0,
    });
  }, [notes]);

  const handleRangeUpdate = useCallback(
    (ranges) => {
      setTime({ minTime: ranges[0].left, maxTime: ranges[0].right });
    },
    [setTime]
  );

  const { minTime, maxTime } = time;

  const last =
    notes && notes[notes.length - 1] ? notes[notes.length - 1].time : 0;
  return (
    <>
      <BreadcrumbsItem
        to={`/${experimentsNames.url}/detail/${params.experimentId}/notes`}
      >
        Notes
      </BreadcrumbsItem>
      <section className="section p-b-0">
        <div className="container">
          {error ? (
            <Message type="danger">{error.message}</Message>
          ) : (
              <>
                <div className="box">
                  <h4 className="title is-4 m-b-10">Timeline</h4>
                  <SelectableTimeline
                    lastTimeStamp={last}
                    onChange={handleRangeUpdate}
                  />
                </div>
                {notes &&
                  notes
                    .filter(
                      (item) => item.time >= minTime && item.time <= maxTime
                    )
                    .map((item, i) => (
                      <div className="box" key={`note-${i}`}>
                        <div>
                          {/*<strong>Time:</strong> {hhmmss(item.time)}*/}
                          <strong>Day: {item.time}</strong>
                        </div>
                        <p>{item.note}</p>
                        {item.imgLink && (
                          <img src={item.imgLink} alt={item.note} />
                        )}
                      </div>
                    ))}
              </>
            )}
        </div>
      </section>
    </>
  );
};
export default ExperimentNotesPage;
