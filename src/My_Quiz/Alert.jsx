import React, { useEffect, useState } from "react";

const Alert = ({ ID, groupName, groupDescription, subGroups }) => {
  const [answers, setAnswers] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAnswers({ ...answers, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      ID: ID,
      groupName: groupName,
      groupDescription: groupDescription,
      subGroups: subGroups.map((subgroup, index) => ({
        question: subgroup.question,
        answer: answers[`answer${index}`],
      })),
    };
    //localStorage.setItem("playquiz", JSON.stringify(data));
    console.log("Form submitted:", data);
  };


  return (
    <>
      <div>
        <h2>{groupName}</h2>
        <p>{groupDescription}</p>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Sub Groups</legend>
            {subGroups.map((subgroup, index) => (
              <div key={index}>
                <h3>{subgroup.question}</h3>
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`answer${index}`}
                      value={subgroup.option1}
                      onChange={handleChange}
                    />
                    {subgroup.option1}
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`answer${index}`}
                      value={subgroup.option2}
                      onChange={handleChange}
                    />
                    {subgroup.option2}
                  </label>
                </div>
              </div>
            ))}
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </div>

    </>
  );
};

export default Alert;
