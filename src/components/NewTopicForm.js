import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { ALL_ICONS } from "../data/icons";
import { addTopic } from '../features/topics/topicsSlice';

export default function NewTopicForm() {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length === 0) {
      document.getElementById('nameError').removeAttribute("hidden");
      return;
    }
    if(icon === "" || icon === "default") {
      document.getElementById('iconError').removeAttribute("hidden");
      return;
    }

    dispatch(addTopic({ id: uuidv4(), name: name, icon: icon }));
    history.push(ROUTES.topicsRoute());
  };

  return (
      <section>
        <form onSubmit={handleSubmit}>
          <h1 className="center">Create a new topic</h1>
          <div className="form-section">
            <input
                id="topic-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.currentTarget.value);
                  if(e.currentTarget.value.trim() !== "" && !document.getElementById("nameError").getAttribute("hidden")) { //if the trimmed 'name' value does not equal an empty string AND the 'nameError' element does not have a 'hidden' attribute...
                    document.getElementById("nameError").setAttribute("hidden", "true"); //...set a 'hidden' attribute on the 'nameError' element
                  }
                }}
                placeholder="Topic Name"
            />
            <p id='nameError' hidden={true}>Please enter a topic name.</p>
            <select
                onChange={(e) => {
                  setIcon(e.currentTarget.value);
                  document.getElementById('iconError').setAttribute("hidden", "true"); //...set a 'hidden' attribute on the 'iconError' element
                }}
                required
                defaultValue="default"
                role="MENU"
            >
              <option value="default" disabled hidden>
                Choose an icon
              </option>
              {ALL_ICONS.map(({ name, url }) => (
                  <option key={url} value={url}>
                    {name}
                  </option>
              ))}
            </select>
            <p id='iconError' hidden={true}>Please select a topic icon.</p>
          </div>
          <button className="center">Add Topic</button>
        </form>
      </section>
  );
}
